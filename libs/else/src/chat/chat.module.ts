import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { BullModule } from '@nestjs/bull';
import { HistoryService } from './service/history.service';
import { ChatService } from './service/chat.service';
import { ChatController } from './chat.controller';
@Module({
    controllers:[ ChatController ],
    imports:[
        BullModule.registerQueue({
            name: 'history',
            // redis: {
            //   host: 'localhost',
            //   port: 80,
            // },
          }),
    ],
    providers:[
        EventsGateway,HistoryService,ChatService
    ]
})
export class ChatModule {}
