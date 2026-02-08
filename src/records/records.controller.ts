import { Controller, Get, Query } from '@nestjs/common';
import { RecordsService } from './records.service';
import { FindAllRecordsQueryDTO } from './dto/find-all-records.request.dto';
import { plainToInstance } from 'class-transformer';
import { FindAllRecordsResponseDTO } from './dto/find-all-records.response.dto';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordService: RecordsService) {}

  @Get()
  async findAll(@Query() query: FindAllRecordsQueryDTO) {
    const { name, limit, offset, indexed } = query;

    const result = await this.recordService.findAll(
      name,
      limit,
      offset,
      indexed,
    );

    const res = plainToInstance(FindAllRecordsResponseDTO, result);

    return res;
  }
}
