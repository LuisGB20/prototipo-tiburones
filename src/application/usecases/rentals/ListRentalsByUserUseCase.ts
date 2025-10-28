import type { IUseCase } from "../../../core/interfaces/IUseCase";
import type { IRepository } from "../../../core/interfaces/IRepository";
import { Rental } from "../../../core/entities/Rental";

export class ListRentalsByUserUseCase
    implements IUseCase<string, Rental[]> {
    constructor(private rentalRepository: IRepository<Rental>) { }

    async execute(userId: string): Promise<Rental[]> {
        const allRentals = await this.rentalRepository.getAll();
        return allRentals.filter(
            (r) => r.renterId === userId || r.spaceId === userId
        );
    }
}
