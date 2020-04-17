import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';
export class MyLogger implements LoggerService {
  log(message: string) {    
    // this.writeFile("log",message);
  }
  error(message: string, trace: string,context?: string) {    
    this.writeFile("error",message);
  }
  warn(message: string) {
    this.writeFile("warn",message);
  }
  debug(message: string) {
    this.writeFile("debug",message);
  }
  verbose(message: string) {
    this.writeFile("verbose",message);
  }

  writeFile(type:string,text:string){
    var message=`[${type}]->[${new Date().toLocaleString()}]：`+text+"\r\n";
    fs.appendFile("log.txt", message, ()=>{});
  }
}