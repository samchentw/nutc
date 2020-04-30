import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as cpx from 'cpx';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { MyLogger } from '@app/core/shared';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //app.useStaticAssets(staticAssetsRoot("front"), { prefix: "/0.5/" });
  app.useStaticAssets(staticAssetsRoot("demo"), { prefix: "/" });
  app.useStaticAssets(staticAssetsRoot("nutc_web"), { prefix: "/nutc/" });
  app.useStaticAssets(staticAssetsRoot("nutc_app"), { prefix: "/admin/" });

  app.setGlobalPrefix('api');

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
      max: 500, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(compression());
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();


function staticAssetsRoot(folderName: string) {
  return join(process.cwd(), 'client/' + folderName);
}