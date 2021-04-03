import { NestFactory } from '@nestjs/core';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  await app.get(SeedService).seed();
  await app.close();
  process.exit(0);
}
initializeTransactionalContext();
patchTypeORMRepositoryWithBaseRepository();
bootstrap();
