import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Record } from './schemas/record.schema';
import { Model } from 'mongoose';
import { DEFAULT_SEED_COUNT } from './constants';

@Injectable()
export class RecordsGeneratorService {
  constructor(
    @InjectModel(Record.name)
    private recordModel: Model<Record>,
  ) {}

  private generateRandomString(
    length = 4,
    charset = 'abcdefghijklmnopqrstuvwxyz',
  ) {
    let res = '';
    while (length--) {
      res += charset[Math.floor(Math.random() * charset.length)];
    }

    return res;
  }

  private generateRecord() {
    return {
      name: this.generateRandomString(),
    };
  }

  private generateBatch(batchSize = 10000) {
    const batch: Array<{ name: string }> = [];

    for (let i = 0; i < batchSize; i++) {
      batch.push(this.generateRecord());
    }

    return batch;
  }

  async generateRecords(totalRecords = DEFAULT_SEED_COUNT): Promise<void> {
    let inserted = 0;
    const batchSize = 50_000;

    for (let i = 0; i < totalRecords; i += batchSize) {
      const batch = this.generateBatch(batchSize);
      await this.recordModel.insertMany(batch, { ordered: false });
      inserted += batchSize;

      const percentage = ((inserted / totalRecords) * 100).toFixed(2);
      console.log(`Progress ${inserted}/${totalRecords} (${percentage}%)`);
    }

    console.log('Done!');
  }
}
