// infrastructure/repositories/LocalStorageReviewRepository.ts
import { Review } from "../../core/entities/Review";
import type { IRepository } from "../../core/interfaces/IRepository";

const REVIEWS_KEY = "reviews";

export class LocalStorageReviewRepository implements IRepository<Review> {
    async getAll(): Promise<Review[]> {
        const data = localStorage.getItem(REVIEWS_KEY);
        const raw: any[] = data ? JSON.parse(data) : [];
        return raw.map(r => new Review({
            id: r.id,
            reviewerId: r.reviewerId,
            reviewedUserId: r.reviewedUserId,
            rating: r.rating,
            comment: r.comment,
            date: r.date ? new Date(r.date) : new Date(),
        }));
    }

    async getById(id: string): Promise<Review | null> {
        const reviews = await this.getAll();
        return reviews.find(r => r.id === id) || null;
    }

    async create(entity: Review): Promise<void> {
        const reviews = await this.getAll();
        reviews.push(entity);
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    }

    async update(entity: Review): Promise<void> {
        const reviews = await this.getAll();
        const index = reviews.findIndex(r => r.id === entity.id);
        if (index !== -1) {
            reviews[index] = entity;
            localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
        }
    }

    async delete(id: string): Promise<void> {
        const reviews = await this.getAll();
        const filtered = reviews.filter(r => r.id !== id);
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(filtered));
    }
}
