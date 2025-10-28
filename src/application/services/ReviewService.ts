import { LocalStorageReviewRepository } from "../../infrastructure/repositories/LocalStorageReviewRepository";
import { Review } from "../../core/entities/Review";

export class ReviewService {
    private repo = new LocalStorageReviewRepository();

    async getReviewsForUser(userId: string): Promise<Review[]> {
        const all = await this.repo.getAll();
        return all.filter(r => r.reviewedUserId === userId);
    }

    async createReview(reviewData: Omit<Review, "id" | "date"> & { comment?: string }): Promise<Review> {
        const review = new Review({
            id: crypto.randomUUID(),
            reviewerId: reviewData.reviewerId,
            reviewedUserId: reviewData.reviewedUserId,
            rating: reviewData.rating,
            comment: reviewData.comment || "",
        });
        await this.repo.create(review);
        return review;
    }

    async getAverageRating(userId: string): Promise<number> {
        const reviews = await this.getReviewsForUser(userId);
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((sum, r) => sum + r.rating, 0);
        return total / reviews.length;
    }
}
