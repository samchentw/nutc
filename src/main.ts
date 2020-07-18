import { HttpExceptionFilter } from '@app/core/shared';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(staticAssetsRoot("public"), { prefix: "/" });
  app.useStaticAssets(staticAssetsRoot("nutc_web"), { prefix: "/nutc/" });
  app.useStaticAssets(staticAssetsRoot("nutc_app"), { prefix: "/admin/" });
  app.setGlobalPrefix('api');

  // const reflector = new Reflector();
  const options = new DocumentBuilder()
    .setTitle('NUTC Api')
    .setDescription('The NUTC API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document);


  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 500 requests per windowMs
    }),
  );

  app.use(compression());
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalGuards(new RolesGuard(reflector))
  await app.listen(3000);
}
bootstrap();


function staticAssetsRoot(folderName: string) {
  return join(process.cwd(), 'client/' + folderName);
}