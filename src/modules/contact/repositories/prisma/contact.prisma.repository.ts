import { Injectable } from '@nestjs/common';
import { ContactRepository } from '../contact.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { plainToInstance } from 'class-transformer';
import { PartialContactDto } from '../../dto/partial-contact.dto';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class PrismaContactRepository implements ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createContact(contactToCreate: CreateContactDto): Promise<Contact> {
    const createdContact = await this.prisma.contact.create({
      data: {
        fullName: contactToCreate.fullName,
        email: contactToCreate.email,
        phone: contactToCreate.phone,
        userId: contactToCreate.userId,
      },
    });

    return plainToInstance(Contact, createdContact);
  }

  async listContact(id: string): Promise<Contact> {
    const contactFound = await this.prisma.contact.findUnique({
      where: { id },
    });

    return plainToInstance(Contact, contactFound);
  }

  async updateContact(
    contactNewInfo: PartialContactDto,
    id: string,
  ): Promise<Contact> {
    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: {
        fullName: contactNewInfo.fullName ?? undefined,
        email: contactNewInfo.email ?? undefined,
        phone: contactNewInfo.phone ?? undefined,
      },
    });

    return plainToInstance(Contact, updatedContact);
  }

  async deleteContact(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id },
    });
  }

  async listAllContacts(ownerId: string): Promise<User> {
    const userWithContacts = await this.prisma.user.findUnique({
      where: { id: ownerId },
      include: { contacts: true },
    });

    return plainToInstance(User, userWithContacts);
  }

  async findContactByEmail(contactEmail: string): Promise<Contact> {
    const contactFound = await this.prisma.contact.findUnique({
      where: { email: contactEmail },
    });

    return contactFound;
  }
}
