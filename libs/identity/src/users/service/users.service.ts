import { dataDuplicationException, genderDataEnum } from '@app/core/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Role } from '../../role/entity/role.entity';
import { RoleService } from '../../role/role.service';
import { CreateUserDto, LoginUserDto, UpdateUserInfoDto, UpdateUserPwd } from '../dto';
import { User, Userinfo } from '../entity';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
        @InjectRepository(Userinfo)
        private readonly UserInfoRepository: Repository<Userinfo>,
        private readonly roleService: RoleService,
        private readonly configService: ConfigService
    ) {
    }

    //註冊
    async register(body: CreateUserDto): Promise<User> {
        const { account, password, name, gender, birthday, address, email } = body;
        const check = await this.UserRepository.findOne({ account });
        if (check) {
            throw new dataDuplicationException();
        }
        var userRole = await this.roleService.getRole("user");
        var roleArray: Role[] = [];
        roleArray.push(userRole);
        const userinfo = await this.UserInfoRepository.save({
            name, gender, birthday, address, email, role: roleArray
        });
        return await this.UserRepository.save({ account, password, userinfo });
    }

    //帳號密碼驗證
    async checkUser(body: LoginUserDto): Promise<User> {
        return await this.UserRepository.findOne(body, { relations: ['userinfo'] });
    }

    //使用者資料
    async get(uuid: string): Promise<User> {
        return this.UserRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.userinfo', 'userinfo')
            .where("user.id=:id", { id: uuid }).select([
                'user.id',
                'user.account',
                'userinfo.address',
                'userinfo.birthday',
                'userinfo.email',
                'userinfo.gender',
                'userinfo.name',
            ]).getOne();
    }

    //取得角色
    async getRole(userinfoId): Promise<string[]> {
        const result = await this.UserInfoRepository.findOne({ relations: ['role'], where: { id: userinfoId } });
        return result.role.map(x => x.name);
    }



    //更新使用者資料
    async update(uuid: string, body: UpdateUserInfoDto): Promise<UpdateResult> {
        var user = await this.getUserById(uuid);
        return await this.UserInfoRepository.update({ id: user.userinfo.id }, body);
    }


    //更新密碼
    async updatePwd(uuid: string, body: UpdateUserPwd): Promise<UpdateResult> {
        return await this.UserRepository.update({ id: uuid }, { password: body.Newpassword });
    }

    async getUserById(uuid: string) {
        return await this.UserRepository.findOne({ where: { id: uuid }, relations: ['userinfo'] });
    }


    async userPwdcheck(uuid, body: UpdateUserPwd): Promise<boolean> {
        var user = await this.UserRepository.findOne({ id: uuid, password: body.password });
        if (user) return await true;
        else return await false;
    }

    //admin取得所有會員資料
    async getAllUser() {
       return this.UserRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.userinfo', 'userinfo')
            .select([
                'user.id',
                'user.account',
                'userinfo.address',
                'userinfo.birthday',
                'userinfo.email',
                'userinfo.gender',
                'userinfo.name',
            ]).getMany();
    }


    //check user
    async findUser(payload: object): Promise<boolean> {
        let queryCondition = payload['id'];
        const user = await this.UserRepository.findOne({ id: queryCondition });
        if (user) return true;
        else return false;
    }

    async delete(userinfoId: number) {
        let userinfo = await this.UserInfoRepository.findOne({ id: userinfoId }, { relations: ["user"] });
        var user = await this.UserRepository.findOne({ id:userinfo.user.id });
        await this.UserRepository.delete(user);
        await this.UserInfoRepository.delete(userinfoId)
        return true;
    }

    //seed
    async seed() {
        var check = await this.UserRepository.find({account:"admin"});
        if (check.length == 0) {
            var roles: Role[] = await this.roleService.getAll();

            var userinfoData = {
                name: "admin",
                gender: genderDataEnum.男性,
                birthday: '1996-11-29',
                address: "台中市",
                email: "nutc@gmail.com",
                role: roles
            }

            var userinfo = await this.UserInfoRepository.save(userinfoData);


            var user = new User();
            user.account = "admin";
            user.password = "admin";
            user.userinfo = userinfo;

            this.UserRepository.save(user);
        }
    }
}
