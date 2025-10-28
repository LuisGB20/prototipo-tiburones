export class SpaceLocation {
    city: string;
    address: string;

    constructor(city: string, address: string) {
        this.city = city;
        this.address = address;
    }

    toString(): string {
        return `${this.address}, ${this.city}`;
    }
}
