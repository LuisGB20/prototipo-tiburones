import type { IRepository } from "../../core/interfaces/IRepository";
import { Space } from "../../core/entities/Space";
import { Price } from "../../core/valueObjects/Price";
import { SpaceLocation } from "../../core/valueObjects/Location";

const SPACES_KEY = "spaces";

export class LocalStorageSpaceRepository implements IRepository<Space> {
    async getAll(): Promise<Space[]> {
        const data = localStorage.getItem(SPACES_KEY);
        const raw: any[] = data ? JSON.parse(data) : [];

        return raw.map(r => new Space({
            id: r.id,
            ownerId: r.ownerId,
            title: r.title || "",
            description: r.description || "",
            type: r.type || "otro",
            location: r.location && r.location.city && r.location.address
                ? new SpaceLocation(r.location.city, r.location.address)
                : new SpaceLocation("", ""),
            price: r.price && typeof r.price.amount === "number"
                ? new Price(r.price.amount, r.price.currency || "MXN")
                : new Price(0, "MXN"),
            available: r.available ?? true,
            images: Array.isArray(r.images) ? r.images : []
        }));
    }

    async getById(id: string): Promise<Space | null> {
        const spaces = await this.getAll();
        return spaces.find(s => s.id === id) || null;
    }

    async create(entity: Space): Promise<void> {
        const spaces = await this.getAll();
        spaces.push(entity);
        localStorage.setItem(SPACES_KEY, JSON.stringify(spaces));
    }

    async update(entity: Space): Promise<void> {
        const spaces = await this.getAll();
        const index = spaces.findIndex(s => s.id === entity.id);
        if (index !== -1) {
            spaces[index] = entity;
            localStorage.setItem(SPACES_KEY, JSON.stringify(spaces));
        }
    }

    async delete(id: string): Promise<void> {
        const spaces = await this.getAll();
        const filtered = spaces.filter(s => s.id !== id);
        localStorage.setItem(SPACES_KEY, JSON.stringify(filtered));
    }
}
