import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessResponseInterceptor } from './common/interceptor/success-response.interceptor';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import envConfig from './config';

const { SERVICE_CONFIG, SWAGGER_CONFIG } = envConfig();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  // 静态文件路径
  app.useStaticAssets(join(__dirname, '..', SERVICE_CONFIG.uploadStaticSrc), {
    prefix: `/${SERVICE_CONFIG.uploadStaticSrc}`,
  });

  if (SWAGGER_CONFIG.enableSwagger) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('博客后端')
      .setDescription('API文档')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api', app, swaggerDocument);
  }

  await app.listen(SERVICE_CONFIG.port);
}
bootstrap();
