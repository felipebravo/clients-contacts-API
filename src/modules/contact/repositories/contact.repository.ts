import { User } from 'src/modules/user/entities/user.entity';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactRepository {
  abstract createContact(
    contactToCreate: CreateContactDto,
  ): Promise<Contact> | Contact;
  abstract listContact(id: string): Promise<Contact | undefined> | Contact;
  abstract updateContact(
    contactNewInfo: UpdateContactDto,
    id: string,
  ): Promise<Contact> | Contact;
  abstract deleteContact(id: string): Promise<void> | void;
  abstract listAllContacts(ownerId: string): Promise<User> | User;
  abstract findContactByEmail(
    contactEmail: string,
  ): Promise<Contact | undefined> | Contact;
}
