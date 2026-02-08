import { Module } from '@nestjs/common';
import { RecordsModule } from './records/records.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    RecordsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('db.uri'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
