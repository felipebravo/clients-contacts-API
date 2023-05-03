import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { PartialContactDto } from './dto/partial-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('contacts')
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  signUpContact(
    @Body() contactToCreate: PartialContactDto,
    @Req() req: Request,
  ) {
    return this.contactService.createContact(contactToCreate, req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  listContact(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.contactService.listContact(id, req);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateContact(
    @Body() contactNewInfo: UpdateContactDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    return this.contactService.updateContact(contactNewInfo, id, req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteContact(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.contactService.deleteContact(id, req);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  listAllContacts(@Req() req: Request) {
    return this.contactService.listAllContacts(req);
  }
}
