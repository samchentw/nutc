import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { MessageDto } from '../../shared';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  chatList:MessageDto[]=[];
  constructor(
    @InjectQueue('history') private readonly historyQueue: Queue
  ){
  }

  async transcode(data:MessageDto) {
    await this.historyQueue.add('AddList', data);    
  }

  getList(){
      return this.chatList;
  }
}