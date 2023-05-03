import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ContactRepository } from './repositories/contact.repository';
import { PartialContactDto } from './dto/partial-contact.dto';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private contactRepository: ContactRepository) {}

  async createContact(contactToCreate: PartialContactDto, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub.toString();
    const userEmail = decoded['userEmail'];

    const contactFound = await this.contactRepository.findContactByEmail(
      contactToCreate.email,
    );

    if (contactFound) {
      throw new ConflictException('contact email is already in use');
    }

    if (userEmail === contactToCreate.email) {
      throw new ConflictException(
        'contact cannot have the same email as the owner',
      );
    }

    return await this.contactRepository.createContact({
      ...contactToCreate,
      userId: userId,
    });
  }

  async listContact(id: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub;

    const contactFound = await this.contactRepository.listContact(id);

    if (userId !== contactFound.userId) {
      throw new UnauthorizedException('access denied');
    }

    if (!contactFound) {
      throw new NotFoundException('contact not found');
    }

    return await this.contactRepository.listContact(id);
  }

  async updateContact(
    contactNewInfo: UpdateContactDto,
    id: string,
    req: Request,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub;
    const userEmail = decoded['userEmail'];

    const contactFound = await this.contactRepository.listContact(id);

    if (userId !== contactFound.userId) {
      throw new UnauthorizedException('access denied');
    }

    if (!contactFound) {
      throw new NotFoundException('contact not found');
    }

    if (userEmail === contactNewInfo.email) {
      throw new ConflictException(
        'contact cannot have the same email as the owner',
      );
    }

    return await this.contactRepository.updateContact(contactNewInfo, id);
  }

  async deleteContact(id: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub;

    const contactFound = await this.contactRepository.listContact(id);

    if (userId !== contactFound.userId) {
      throw new UnauthorizedException('access denied');
    }

    if (!contactFound) {
      throw new NotFoundException('contact not found');
    }

    return this.contactRepository.deleteContact(id);
  }

  async listAllContacts(req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub.toString();

    return this.contactRepository.listAllContacts(userId);
  }

  async findContactByEmail(contactEmail: string) {
    const contactFound = await this.contactRepository.findContactByEmail(
      contactEmail,
    );

    return contactFound;
  }
}
