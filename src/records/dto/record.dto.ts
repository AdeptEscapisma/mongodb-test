import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RecordDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
