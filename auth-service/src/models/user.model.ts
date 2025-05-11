export interface User {
  id: string;
  email: string;
  passwordHash: string;
  baseRole: string;
  createdAt: Date;
  updatedAt: Date;
}
