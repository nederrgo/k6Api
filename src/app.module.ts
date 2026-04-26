import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadK6Config } from './config/k6-config.loader';
import { K6Module } from './k6/k6.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [loadK6Config] }),
    MongooseModule.forRoot('mongodb://localhost:27017/k6-db'), // Use env var for this in OpenShift
    K6Module,
  ],
})
export class AppModule {}