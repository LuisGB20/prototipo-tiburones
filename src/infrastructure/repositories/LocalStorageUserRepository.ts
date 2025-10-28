import type { IRepository } from "../../core/interfaces/IRepository";
import { User } from "../../core/entities/User";

const USERS_KEY = "users";

export class LocalStorageUserRepository implements IRepository<User> {
    async getAll(): Promise<User[]> {
        const data = localStorage.getItem(USERS_KEY);
        const raw: any[] = data ? JSON.parse(data) : [];
        return raw.map(u => new User({
            id: u.id,
            name: u.name,
            email: u.email,
            password: u.password,
            role: u.role,
            rating: u.rating
        }));
    }

    async getByEmail(email: string): Promise<User | null> {
        const users = await this.getAll();
        return users.find(u => u.email === email) || null;
    }


    async getById(id: string): Promise<User | null> {
        const users = await this.getAll();
        return users.find(u => u.id === id) || null;
    }

    async create(entity: User): Promise<void> {
        const users = await this.getAll();
        users.push(entity);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    async update(entity: User): Promise<void> {
        const users = await this.getAll();
        const index = users.findIndex(u => u.id === entity.id);
        if (index !== -1) {
            users[index] = entity;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
    }

    async delete(id: string): Promise<void> {
        const users = await this.getAll();
        const filtered = users.filter(u => u.id !== id);
        localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
    }
}
