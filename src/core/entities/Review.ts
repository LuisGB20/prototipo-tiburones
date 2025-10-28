export class Review {
    id: string;
    reviewerId: string;
    reviewedUserId: string;
    rating: number;
    comment: string;
    date: Date;

    constructor({
        id,
        reviewerId,
        reviewedUserId,
        rating,
        comment,
        date = new Date(),
    }: {
        id: string;
        reviewerId: string;
        reviewedUserId: string;
        rating: number;
        comment: string;
        date?: Date;
    }) {
        this.id = id;
        this.reviewerId = reviewerId;
        this.reviewedUserId = reviewedUserId;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
    }
}
