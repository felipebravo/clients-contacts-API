import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiProperty({ required: false })
  fullName: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  phone: string;
}
