import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './services/brand.service';
import { CategoryController } from './controllers/category.controller';
import { Category } from './entities/category.entity';
import { Brand } from './entities/brand.entity';
import { CategoryService } from './services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
  controllers: [ProductController, BrandController, CategoryController],
  providers: [ProductService, BrandService, CategoryService],
  exports: [ProductService, TypeOrmModule],
})
export class ProductsModule {}
