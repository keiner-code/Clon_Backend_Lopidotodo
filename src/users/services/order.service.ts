import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private injecOrder: Repository<Order>,
    @InjectRepository(User) private injectUser: Repository<User>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.injecOrder.find();
  }

  findOne(id: number): Promise<Order> {
    const order = this.injecOrder.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException('Order Not Found');
    }
    return order;
  }

  async create(data: CreateOrderDto): Promise<Order> {
    const order = new Order();
    if (data.userId) {
      const user = await this.injectUser.findOne({
        where: { id: data.userId },
      });
      order.user = user;
    }
    return this.injecOrder.save(order);
  }

  async update(id: number, changes: UpdateOrderDto): Promise<Order> {
    const order = await this.injecOrder.findOne({ where: { id } });
    if (changes.userId) {
      const user = await this.injectUser.findOne({
        where: { id: changes.userId },
      });
      order.user = user;
    }
    return this.injecOrder.save(order);
  }
  async remove(id: number): Promise<any> {
    return await this.injecOrder.delete(id);
  }
}
