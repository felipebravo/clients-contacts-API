import { randomUUID } from 'node:crypto';

export class Contact {
  readonly id: string;
  fullName: string;
  email: string;
  phone: string;
  readonly createdAt: Date;
  readonly userId: string;

  constructor() {
    this.id = randomUUID();
  }
}
