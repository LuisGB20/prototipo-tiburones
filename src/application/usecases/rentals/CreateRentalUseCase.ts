import type { IUseCase } from "../../../core/interfaces/IUseCase";
import type { IRepository } from "../../../core/interfaces/IRepository";
import { Rental } from "../../../core/entities/Rental";
import type { CreateRentalDTO } from "../../dtos/CreateRentalDto";
import { DateRange } from "../../../core/valueObjects/DateRange";
import { v4 as uuidv4 } from "uuid";

export class CreateRentalUseCase
    implements IUseCase<CreateRentalDTO, Rental> {
    constructor(private rentalRepository: IRepository<Rental>) { }

    async execute(request: CreateRentalDTO): Promise<Rental> {
        const range = new DateRange(request.startDate, request.endDate);
        const days = range.getDurationDays();

        const totalCost = days * 100; // placeholder, luego se tomará del espacio

        const newRental = new Rental({
            id: uuidv4(),
            spaceId: request.spaceId,
            renterId: request.renterId,
            ownerId: request.ownerId,
            dateRange: range,
            totalCost,
        });

        await this.rentalRepository.create(newRental);
        return newRental;
    }
}
