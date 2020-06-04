import { Module } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
// import { typeOrmConfig } from '@/database/typeorm.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from '@/shared/http-error.filter';
import { AppController } from './app.controller';
import { TasksModule } from './tasks/tasks.module';
// import here

@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
