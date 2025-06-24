import { NestFactory } from '@nestjs/core';
import { TypeOrmRepositoryModule } from './typeorms/type-orm.module';
import { UserSeederService } from './typeorms/seeders/seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(
    TypeOrmRepositoryModule,
  );
  const seeder = app.get(UserSeederService);

  try {
    await seeder.seed();
  } catch (error) {
    console.log('error for notification seeder', error);
  }
  await app.close();
}

bootstrap().catch((error) => console.log('rrror seeding database: ', error));
