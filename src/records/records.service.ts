import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Record } from './schemas/record.schema';
import { Model } from 'mongoose';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name)
    private recordModel: Model<Record>,
  ) {}

  async findAll(
    name: string,
    limit = 100,
    offset = 0,
    indexed = true,
  ): Promise<{ data: Record[]; total: number }> {
    let query = this.recordModel.find({ name }).skip(offset).limit(limit);

    if (!indexed) {
      query = query.hint({ $natural: 1 });
    }

    const [data, total] = await Promise.all([
      query.exec(),
      this.recordModel.countDocuments({ name }).exec(),
    ]);

    return { data, total };
  }
}
