import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {ConfigService as NestJsConfigService} from '@nestjs/config'
import {ExceptionCodeName} from '../../enum/exception-codes.enum'
@Injectable()
export class ConfigService {
    constructor(private configService: NestJsConfigService) {}

    get<T>(key:string): T {
        const value = this.configService.get(key);
        if(!value){
            throw new InternalServerErrorException(
                ExceptionCodeName.INVALID_ENVIRONMENT_VARIABLE
            )
        }
        return value;
    }
}