import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FindAllRecordsQueryDTO {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number;

  @Transform(({ value }) => {
    if (['1', 'true'].includes(value)) {
      return true;
    } else if (['0', 'false'].includes(value)) {
      return false;
    } else {
      return value as unknown;
    }
  })
  @IsBoolean()
  @IsOptional()
  indexed: boolean;
}
