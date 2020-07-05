import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import * as _ from 'lodash';
import { BaseService } from '@app/core/shared';
import { Contact } from '../entity/contact.entity';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';

@Injectable()
export class ContactService extends BaseService<Contact, CreateContactDto, UpdateContactDto> {
    constructor(
        @InjectRepository(Contact)
        public repository: Repository<Contact>,
    ) {
        super(repository)
    }
}
