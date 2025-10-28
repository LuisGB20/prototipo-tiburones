import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const [user, setUser] = useState<{ name: string; role?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-primary text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold hover:text-secondary transition">
        SpaceShare
      </Link>

      {/* Navegación */}
      <nav className="mt-2 md:mt-0 space-x-6 flex flex-col md:flex-row items-center">
        <Link to="/" className="hover:text-secondary transition font-medium">Inicio</Link>
        <Link to="/spaces" className="hover:text-secondary transition font-medium">Espacios disponibles</Link>

        {user && user.role === "owner" && (
          <Link to="/my-spaces" className="hover:text-secondary transition font-medium">Mis espacios</Link>
        )}

        {user && user.role === "renter" && (
          <Link to="/my-reservations" className="hover:text-secondary transition font-medium">Mis reservas</Link>
        )}

        {/* Login/Registro o usuario */}
        {user ? (
          <>
            <span className="ml-4 font-medium">Hola, {user.name}</span>
            <button
              onClick={handleLogout}
              className="ml-2 bg-secondary hover:bg-accent text-white px-3 py-1 rounded transition"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="ml-4 bg-secondary hover:bg-accent text-white px-3 py-1 rounded transition"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="ml-2 bg-accent hover:bg-secondary text-white px-3 py-1 rounded transition"
            >
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
