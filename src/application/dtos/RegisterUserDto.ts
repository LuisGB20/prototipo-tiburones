import type { UserRole } from "../../core/entities/User";

export interface RegisterUserDTO {
    name: string;
    email: string;
    role: UserRole;
}
