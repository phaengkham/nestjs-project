import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UserOrmEntity } from './typeorms/entities/user.orm';

config(); // ໂຫຼດຈາກ .env
export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'nestjs_project',
  synchronize: Boolean(process.env.DB_SYNCHRONIZE) || false,
  logging: Boolean(process.env.DB_LOGGING || false),
  entities: [UserOrmEntity],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations', // ຊື່ table ສຳຫຼັບເກັບ migrations
});
