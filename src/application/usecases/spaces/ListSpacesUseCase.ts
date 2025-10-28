import type { IUseCase } from "../../../core/interfaces/IUseCase";
import type { IRepository } from "../../../core/interfaces/IRepository";
import { Space } from "../../../core/entities/Space";

export class ListSpacesUseCase implements IUseCase<void, Space[]> {
    constructor(private spaceRepository: IRepository<Space>) { }

    async execute(): Promise<Space[]> {
        return await this.spaceRepository.getAll();
    }
}
