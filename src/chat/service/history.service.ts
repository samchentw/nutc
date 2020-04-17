import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MessageDto } from '../../shared';
import * as _ from 'lodash';
import { ChatService } from './chat.service';
@Processor('history')
export class HistoryService {
  chatList:MessageDto[]=[];
  constructor(
    private chatService:ChatService
  ) {
    
  }
  // private readonly logger = new Logger(AudioProcessor.name);
  // constructor(){this.handleTranscode}
  @Process('AddList')
  async handleTranscode(job: Job) {      
    if(this.chatService.chatList.length>=100){
      this.chatService.chatList.shift()
    }  
    this.chatService.chatList.push(job.data);   
  }   
}