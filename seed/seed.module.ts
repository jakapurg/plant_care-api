import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ConfigService } from 'src/modules/config/config.service';
import { EncryptionModule } from 'src/modules/encryption/encryption.module';
import { PlantModule } from 'src/modules/plant/plant.module';
import { UserRoleModule } from 'src/modules/user-role/user-role.module';
import { UserModule } from 'src/modules/user/user.module';
import { SeedService } from './seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        port: +configService.get<number>('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../src/database/migration/*{.ts,.js}'],
        migrationsRun: configService.get('TYPEORM_MIGRATIONS_RUN') === 'true',
        synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
        logging: configService.get('TYPEORM_LOGGING') === 'true',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PlantModule,
    EncryptionModule,
    UserRoleModule,
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
