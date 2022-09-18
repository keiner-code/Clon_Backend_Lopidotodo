import { Controller, Post, Body } from '@nestjs/common';
import { OrdemItemService } from '../services/ordem-item.service';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order-item')
@Controller('ordem-item')
export class OrdemItemController {
  constructor(private orderItemService: OrdemItemService) {}

  @Post()
  postCreate(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }
}
