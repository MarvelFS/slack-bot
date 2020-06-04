import { Module } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
// import { typeOrmConfig } from '@/database/typeorm.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from '@/shared/http-error.filter';
import { AppController } from './app.controller';
import { TasksModule } from './tasks/tasks.module';
import { CatsModule } from './cats/cats.module';
import { typeOrmConfig } from '../database/typeorm.config';
// import here

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule, CatsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
