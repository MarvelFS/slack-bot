/* eslint-disable max-lines-per-function */
/* eslint-disable import/no-extraneous-dependencies */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.module';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { NODE_ENV, PORT } from '@/environments';
import { setupSwagger } from '@/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createEventAdapter } from '@slack/events-api';

const slackSigningSecret = '96ffc09562accb9ad095afb6918cfc02';
const slackEvents: any = createEventAdapter(slackSigningSecret);

async function bootstrap() {
  try {
    const logger = new Logger('bootstrap');

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: true,
    });

    app.use('/', slackEvents.requestListener());
    slackEvents.on('message', (event) => {
      console.log(
        `Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`,
      );
    });

    // body parsers
    app.use(bodyParser.json({ limit: '2mb' }));
    app.use(bodyParser.urlencoded({}));

    // Security

    if (NODE_ENV === 'development') {
      app.enableCors();
    } else {
      app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true,
      });
      logger.log(`Accepting request from origin http`);
    }

    setupSwagger(app);

    await app.listen(PORT);
    logger.log(`Application listening on port ${PORT}`);
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
    throw new InternalServerErrorException(error);
  }
}
bootstrap().catch((e) => {
  throw e;
});
