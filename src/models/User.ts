export interface IUser {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  joinedYear: number;
}

export class User implements IUser {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  joinedYear: number;

  constructor(
    fullName: string,
    email: string,
    password: string,
    phone: string = "",
    location: string = "",
    joinedYear: number = new Date().getFullYear()
  ) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.location = location;
    this.joinedYear = joinedYear;
  }

  getInitials(): string {
    return this.fullName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join("");
  }

  getMembershipLabel(): string {
    return `Joined ${this.joinedYear}`;
  }

  static fromPlain(data: IUser): User {
    return new User(
      data.fullName,
      data.email,
      data.password,
      data.phone,
      data.location,
      data.joinedYear
    );
  }
}