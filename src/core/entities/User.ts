export enum UserRole {
  OWNER = "owner",
  RENTER = "renter",
}

export class User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  rating: number;

  constructor({
    id,
    name,
    email,
    password,
    role,
    rating = 0,
  }: {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    rating?: number;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.rating = rating;
  }

  updateRating(newRating: number) {
    this.rating = (this.rating + newRating) / 2;
  }
}
