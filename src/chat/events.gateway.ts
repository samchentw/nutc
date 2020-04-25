import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from './service/chat.service';
// import * as socketioJwt from 'socketio-jwt';
import { MessageDto } from '../shared';
import { Cron,SchedulerRegistry } from '@nestjs/schedule';
@WebSocketGateway()
export class EventsGateway implements OnModuleInit,OnGatewayConnection,OnGatewayDisconnect{
  
  constructor(    
    private chatService:ChatService
  ) {
  }

  @WebSocketServer() server;
  wsClients=[];
  onModuleInit() {
    // this.server.set('authorization', socketioJwt.authorize({
    //   secret: this.configService.get<string>('donttalk'),
    //   handshake: true
    // }));
  }

  handleConnection(client: any) {
    // console.log(client);
    var output:MessageDto=new MessageDto();
    output.name="System";
    output.message=`ID：${client.id} connect`;
    this.broadcast(output);        
    this.wsClients.push(client);
  }

  handleDisconnect(client) {
    var id:string="";    
    var output:MessageDto=new MessageDto();
        
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        id=this.wsClients[i].id;
        this.wsClients.splice(i, 1);
        break;
      }
    }
    output.name="System";
    output.message=`ID:${id}  disconnect`;    
    this.broadcast(output);
  }


  @SubscribeMessage('message')
  message(client, data:MessageDto) {       
    var output:MessageDto=new MessageDto();
    output.name=data.name;
    output.message=data.message    
    this.chatService.transcode(output);
    this.broadcast(output);
    //const event = 'message';       
    // return { event, data };    
  }


  public broadcast(message:MessageDto) {    
    for (let c of this.wsClients) {
      c.send(message);
    }
  }



  @Cron('0 30 * * * *',{
    name: 'test',
  })
  handleCron() {        
    var output:MessageDto=new MessageDto();
    output.name="System";
    output.message="系統廣播測試";
    this.broadcast(output);
  }

}
