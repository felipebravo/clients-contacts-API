import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;
  fullName: string;
  email: string;
  phone: string;
  readonly createdAt: Date;

  constructor() {
    this.id = randomUUID();
  }
}
