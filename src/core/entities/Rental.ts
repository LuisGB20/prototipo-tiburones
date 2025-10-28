import { DateRange } from "../valueObjects/DateRange";

export class Rental {
    id: string;
    spaceId: string;
    renterId: string;
    ownerId: string; // ← agregado
    dateRange: DateRange;
    totalCost: number;

    constructor({
        id,
        spaceId,
        renterId,
        ownerId,
        dateRange,
        totalCost,
    }: {
        id: string;
        spaceId: string;
        renterId: string;
        ownerId: string;
        dateRange: DateRange;
        totalCost: number;
    }) {
        this.id = id;
        this.spaceId = spaceId;
        this.renterId = renterId;
        this.ownerId = ownerId;
        this.dateRange = dateRange;
        this.totalCost = totalCost;
    }
}
