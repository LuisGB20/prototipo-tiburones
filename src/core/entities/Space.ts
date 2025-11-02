import { SpaceLocation } from "../valueObjects/Location";
import { Price } from "../valueObjects/Price";

export enum SpaceType {
    WALL = "WALL",
    GARAGE = "GARAGE",
    ROOM = "ROOM",
    HALL = "HALL",
    STUDIO = "STUDIO",
    OFFICE = "OFFICE",
    WAREHOUSE = "WAREHOUSE",
    TERRACE = "TERRACE",
    ROOFTOP = "ROOFTOP",
    GARDEN = "GARDEN",
    PARKING_SPOT = "PARKING_SPOT",
    SHOP = "SHOP",
    EVENT_SPACE = "EVENT_SPACE",
    ADVERTISEMENT_SPOT = "ADVERTISEMENT_SPOT",
    OTHER = "OTHER"
}



export class Space {
    id: string;
    ownerId: string;
    title: string;
    description: string;
    type: SpaceType;
    location: SpaceLocation;
    price: Price;
    available: boolean;
    images: string[];

    constructor({
        id,
        ownerId,
        title,
        description,
        type,
        location,
        price,
        available = true,
        images = [],
    }: {
        id: string;
        ownerId: string;
        title: string;
        description: string;
        type: SpaceType;
        location: SpaceLocation;
        price: Price;
        available?: boolean;
        images?: string[];
    }) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.type = type;
        this.location = location;
        this.price = price;
        this.available = available;
        this.images = images;
    }
}
