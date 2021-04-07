import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from 'seed/seed.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigService } from './modules/config/config.service';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { UserModule } from './modules/user/user.module';
import { PlantModule } from './modules/plant/plant.module';

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
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migration/*{.ts,.js}'],
        migrationsRun: configService.get('TYPEORM_MIGRATIONS_RUN') === 'true',
        synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
        logging: configService.get('TYPEORM_LOGGING') === 'true',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    EncryptionModule,
    UserRoleModule,
    SeedModule,
    PlantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
