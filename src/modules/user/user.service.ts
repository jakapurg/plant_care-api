import { ConflictException, Injectable } from '@nestjs/common';
import { ExceptionCodeName } from 'src/enum/exception-codes.enum';
import { getRepository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateUserDto } from './dto/create-user.dto';
import { GetOneByKey } from './enum/get-one-by-key.enum';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor() {}

    @Transactional()
    async create(createUserDto: CreateUserDto):Promise<User> {
        const {email,password} = createUserDto;
        const existingUser = await this.getOneBy([{getOneByKey:GetOneByKey.EMAIL,value:email}]);
        if(existingUser){
            throw new ConflictException(ExceptionCodeName.EMAIL_CONFLICT);
        }
        const user = new User();
        user.email = email;
        user.password = password;
        return await getRepository(User).save(user);
    }

    @Transactional()
    async getOneBy(
        filter:{
            getOneByKey : GetOneByKey,
            value:number | string
        }[]
    ): Promise<User | undefined> {
        const user = await getRepository(User)
            .createQueryBuilder('user')
            .where(
                filter.map(el => {
                    return {[el.getOneByKey]:el.value}
                })
            )
            .getOne();
        return user;
    }
}
