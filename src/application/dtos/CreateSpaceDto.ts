import type { SpaceType } from "../../core/entities/Space";

export interface CreateSpaceDTO {
    ownerId: string;
    title: string;
    description: string;
    type: SpaceType;
    city: string;
    address: string;
    price: number;
    images?: string[];
}
