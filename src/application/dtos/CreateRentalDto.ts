export interface CreateRentalDTO {
    spaceId: string;
    renterId: string;
    ownerId: string;
    startDate: Date;
    endDate: Date;
}
