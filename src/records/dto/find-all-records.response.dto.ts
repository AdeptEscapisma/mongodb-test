import { Exclude, Expose, Type } from 'class-transformer';
import { RecordDTO } from './record.dto';

@Exclude()
export class FindAllRecordsResponseDTO {
  @Type(() => RecordDTO)
  @Expose()
  data: RecordDTO[];

  @Expose()
  total: number;
}
