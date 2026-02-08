import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from './schemas/record.schema';
import { RecordsController } from './records.controller';
import { RecordsGeneratorService } from './records-generator.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
  ],
  controllers: [RecordsController],
  providers: [RecordsService, RecordsGeneratorService],
  exports: [RecordsGeneratorService],
})
export class RecordsModule {}
