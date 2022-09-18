import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Put,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { Public } from '../../auth/decorators/public.decorator';
import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dtos/product.dto';
import { JwtGuardGuard } from '../../auth/guards/jwt-guard.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/role.decorator';
import { Role } from 'src/auth/models/roles.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@UseGuards(JwtGuardGuard, RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get()
  getAll(@Query() params: FilterProductDto) {
    return this.productService.findAll(params);
  }
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  postCreate(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  putUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }
  @Delete(':id')
  deleteRemove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
