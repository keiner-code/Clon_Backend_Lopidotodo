import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('brands')
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  getAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.findOne(id);
  }

  @Post()
  postCreate(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Put(':id')
  putUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(id, payload);
  }
  @Delete(':id')
  deleteRemove(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.remove(id);
  }
}
