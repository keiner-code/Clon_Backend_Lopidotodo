import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CustomerService } from './services/customer.service';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdemItemService } from './services/ordem-item.service';
import { OrdemItemController } from './controllers/ordem-item.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, OrderItem]), ProductsModule],
  controllers: [UserController, OrderController, OrdemItemController],
  providers: [CustomerService, UserService, OrderService, OrdemItemService],
  exports: [UserService],
})
export class UsersModule {}
