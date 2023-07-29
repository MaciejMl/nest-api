import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';
// import { PrismaService } from './shared/services/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.setGlobalPrefix('api');

  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);
  app.enableShutdownHooks();

  await app.listen(8000);
}
bootstrap();
