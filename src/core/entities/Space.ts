import { SpaceLocation } from "../valueObjects/Location";
import { Price } from "../valueObjects/Price";

export enum SpaceType {
    WALL = "Pared",
    GARAGE = "Cochera",
    ROOM = "Habitación",
    HALL = "Salón",
    STUDIO = "Estudio",
    OFFICE = "Oficina",
    WAREHOUSE = "Bodega",
    TERRACE = "Terraza",
    ROOFTOP = "Azotea",
    GARDEN = "Jardín",
    PARKING_SPOT = "Espacio de estacionamiento",
    SHOP = "Local comercial",
    EVENT_SPACE = "Espacio para eventos",
    ADVERTISEMENT_SPOT = "Espacio publicitario",
    OTHER = "Otro",
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
