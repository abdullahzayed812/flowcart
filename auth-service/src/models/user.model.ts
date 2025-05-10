export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  constructor(
    public id: string,
    public email: string,
    public passwordHash: string,
    public role: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
