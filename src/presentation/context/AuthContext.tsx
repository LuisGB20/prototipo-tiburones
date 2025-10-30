import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { User, UserRole } from "../../core/entities/User";
import { LocalStorageUserRepository } from "../../infrastructure/repositories/LocalStorageUserRepository";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<User>;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "auth_user";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userRepo = new LocalStorageUserRepository();
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          // Verificar que el usuario aún existe en el repositorio
          const existingUser = await userRepo.getById(userData.id);
          if (existingUser) {
            setUser(existingUser);
          } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<User> => {
    try {
      const userRepo = new LocalStorageUserRepository();
      const users = await userRepo.getAll();
      const foundUser = users.find(
        (u: User) => u.email === email && u.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(foundUser));
        return foundUser;
      }

      throw new Error("Credenciales incorrectas");
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error al iniciar sesión");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }): Promise<User> => {
    try {
      const userRepo = new LocalStorageUserRepository();
      // Verificar si el email ya existe
      const users = await userRepo.getAll();
      const existingUser = users.find((u: User) => u.email === userData.email);

      if (existingUser) {
        throw new Error("El email ya está registrado");
      }

      // Crear nuevo usuario
      const newUser = new User({
        id: crypto.randomUUID(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        rating: 0,
      });

      await userRepo.create(newUser);

      // Auto-login después del registro
      setUser(newUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));

      return newUser;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error al registrar usuario");
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
