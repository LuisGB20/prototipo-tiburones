import { User, UserRole } from "../../core/entities/User";
import { LocalStorageUserRepository } from "../../infrastructure/repositories/LocalStorageUserRepository";

export class UserService {
    private repo = new LocalStorageUserRepository();

    async register(userData: {
        name: string;
        email: string;
        password: string;
        role: UserRole;
    }): Promise<User> {
        const existing = await this.repo.getByEmail(userData.email);
        if (existing) throw new Error("El correo ya está registrado");

        const newUser = new User({
            id: crypto.randomUUID(),
            ...userData,
        });
        await this.repo.create(newUser);
        return newUser;
    }

    async login(email: string, password: string): Promise<User> {
        const user = await this.repo.getByEmail(email);
        console.log(user);
        if (!user) throw new Error("Usuario no encontrado");
        console.log(user.password == password);
        if (user.password !== password) throw new Error("Contraseña incorrecta");
        return user;
    }
}
