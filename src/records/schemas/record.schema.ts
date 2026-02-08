import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecordDocument = HydratedDocument<Record>;

@Schema()
export class Record {
  @Prop({ required: true, index: true })
  name: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
