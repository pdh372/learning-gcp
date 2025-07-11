/* eslint-disable @typescript-eslint/no-misused-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = parseInt(process.env.PORT || '8080', 10);

  const db = app.get(DatabaseService);

  process.on('SIGINT', async () => await db.onModuleDestroy());
  process.on('SIGTERM', async () => await db.onModuleDestroy());

  console.log('✅ App is listening on port', port);
  await app.listen(port);
}
bootstrap().catch((err) => {
  console.error('❌ Bootstrap error:', err);
});
