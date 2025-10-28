import type { IUseCase } from "../../../core/interfaces/IUseCase";
import type { IRepository } from "../../../core/interfaces/IRepository";
import { Space } from "../../../core/entities/Space";
import { Price } from "../../../core/valueObjects/Price";
import { SpaceLocation } from "../../../core/valueObjects/Location";
import type { CreateSpaceDTO } from "../../dtos/CreateSpaceDto";
import { v4 as uuidv4 } from "uuid";

export class CreateSpaceUseCase
    implements IUseCase<CreateSpaceDTO, Space> {
    constructor(private spaceRepository: IRepository<Space>) { }

    async execute(request: CreateSpaceDTO): Promise<Space> {
        const newSpace = new Space({
            id: uuidv4(),
            ownerId: request.ownerId,
            title: request.title,
            description: request.description,
            type: request.type,
            location: new SpaceLocation(request.city, request.address),
            price: new Price(request.price),
            images: request.images || [],
        });

        await this.spaceRepository.create(newSpace);
        return newSpace;
    }
}
