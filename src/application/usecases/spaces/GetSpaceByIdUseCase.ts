import type { IUseCase } from "../../../core/interfaces/IUseCase";
import type { IRepository } from "../../../core/interfaces/IRepository";
import type { Space } from "../../../core/entities/Space";

export class GetSpaceByIdUseCase implements IUseCase<string, Space | null> {
    constructor(private spaceRepository: IRepository<Space>) { }

    async execute(id: string): Promise<Space | null> {
        return await this.spaceRepository.getById(id);
    }
}
