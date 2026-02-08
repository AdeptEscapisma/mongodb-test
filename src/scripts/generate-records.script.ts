import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { RecordsGeneratorService } from '../records/records-generator.service';
import { RecordsModule } from '../records/records.module';

async function bootstrap(count: number | undefined) {
  const app = await NestFactory.create(AppModule);
  await app
    .select(RecordsModule)
    .get(RecordsGeneratorService)
    .generateRecords(count);
  await app.close();
}
const arg = process.argv[2];
const count = arg === undefined ? undefined : Number(arg);

if (arg && !Number.isInteger(count)) {
  console.error('Count must be an integer');
  process.exit(1);
} else {
  bootstrap(count);
}
