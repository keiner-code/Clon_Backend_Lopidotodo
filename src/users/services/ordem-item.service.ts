import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class OrdemItemService {
  constructor(
    @InjectRepository(Order) private orderInject: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemInject: Repository<OrderItem>,
    @InjectRepository(Product) private productInject: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this.orderInject.findOne({
      where: { id: data.orderId },
    });
    const product = await this.productInject.findOne({
      where: { id: data.productId },
    });
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this.orderItemInject.save(item);
  }
}
