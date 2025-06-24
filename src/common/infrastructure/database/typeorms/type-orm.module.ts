import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserOrmEntity } from './entities/user.orm';
import { UsersSeeder } from './seeders/user.seed';
import { UserSeederService } from './seeders/seeder.service';
import { TransactionModule } from '../../transaction/transaction.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TransactionModule, // ນຳໃຊ້ TransactionModule ສໍາລັບ TransactionManager
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: any) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        entities: [UserOrmEntity],
        subscribers: [],
        synchronize: configService.getOrThrow('DB_SYNCHRONIZE') === 'true',
        logging: configService.getOrThrow('DB_LOGGING') === 'true',
        migrationsTableName: 'migrations',
      }),
    }),
    TypeOrmModule.forFeature([UserOrmEntity]), // ຖ້າບໍ່ໃຊ້ອັນນີ້ຈະບໍ່ສາມາດເອີ້ນໃຊ້ Repository<User>
  ],
  exports: [TypeOrmModule],
  providers: [UsersSeeder, UserSeederService],
})
export class TypeOrmRepositoryModule {}
