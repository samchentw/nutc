import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from './dto';
import { BaseService } from '../shared';
@Injectable()
export class RoleService extends BaseService<Role ,RoleDto ,RoleDto>{
    constructor(
        @InjectRepository(Role)
        private readonly RoleRepository:Repository<Role>
    ){
        super(RoleRepository)
    }
  

    async checkRoleName(roleName:string):Promise<Boolean>{
        var check=await this.RoleRepository.findOne({name:roleName});
        if(check) return false
        else return true;
    }

    async getRole(roleName:string){
        return await  this.RoleRepository.findOne({name:roleName});
    }
    
}
