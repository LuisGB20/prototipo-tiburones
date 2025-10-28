import type { IRepository } from "../../core/interfaces/IRepository";
import { Rental } from "../../core/entities/Rental";
import { DateRange } from "../../core/valueObjects/DateRange";

const RENTALS_KEY = "rentals";

export class LocalStorageRentalRepository implements IRepository<Rental> {
    async getAll(): Promise<Rental[]> {
        const data = localStorage.getItem(RENTALS_KEY);
        const raw: any[] = data ? JSON.parse(data) : [];
        return raw.map(r => {
            try {
                const start = r.dateRange?.start ? new Date(r.dateRange.start) : new Date();
                const end = r.dateRange?.end ? new Date(r.dateRange.end) : new Date();

                return new Rental({
                    id: r.id,
                    spaceId: r.spaceId,
                    renterId: r.renterId,
                    ownerId: r.ownerId,
                    dateRange: new DateRange(start, end),
                    totalCost: r.totalCost
                });
            } catch (error) {
                console.error("Error al parsear rental:", r, error);
                return null;
            }
        }).filter(Boolean) as Rental[];

    }

    async getById(id: string): Promise<Rental | null> {
        const rentals = await this.getAll();
        return rentals.find(r => r.id === id) || null;
    }

    async create(entity: Rental): Promise<void> {
        console.log("Creating rental:", entity);
        const rentals = await this.getAll();
        rentals.push(entity);
        localStorage.setItem(RENTALS_KEY, JSON.stringify(rentals));
    }

    async update(entity: Rental): Promise<void> {
        const rentals = await this.getAll();
        const index = rentals.findIndex(r => r.id === entity.id);
        if (index !== -1) {
            rentals[index] = entity;
            localStorage.setItem(RENTALS_KEY, JSON.stringify(rentals));
        }
    }

    async delete(id: string): Promise<void> {
        const rentals = await this.getAll();
        const filtered = rentals.filter(r => r.id !== id);
        localStorage.setItem(RENTALS_KEY, JSON.stringify(filtered));
    }
}
