import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dtos/product.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { BrandService } from './brand.service';
import { CategoryService } from './category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private injectProduct: Repository<Product>,
    private brandService: BrandService,
    private categoryService: CategoryService,
  ) {}

  findAll(params?: FilterProductDto): Promise<Product[]> {
    if (params) {
      const { limit, offset } = params;
      return this.injectProduct.find({
        relations: ['brand', 'category'],
        take: limit,
        skip: offset,
      });
    }
    return this.injectProduct.find({
      relations: ['brand', 'category'],
    });
  }

  findOne(id: number): Promise<Product> {
    return this.injectProduct.findOne({
      where: { id },
    });
  }

  async create(data: CreateProductDto): Promise<Product> {
    const newProduct = this.injectProduct.create(data);

    if (data.brandId) {
      const brand = await this.brandService.findOne(data.brandId);
      newProduct.brand = brand;
    }
    if (data.categoryId) {
      const category = await this.categoryService.findOne(data.categoryId);
      newProduct.category = category;
    }
    return this.injectProduct.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto): Promise<Product> {
    const product = await this.injectProduct.findOne({ where: { id } });
    if (changes.brandId) {
      const brand = await this.brandService.findOne(changes.brandId);
      product.brand = brand;
    }
    if (changes.categoryId) {
      const category = await this.categoryService.findOne(changes.categoryId);
      product.category = category;
    }
    this.injectProduct.merge(product, changes);
    return this.injectProduct.save(product);
  }
  async remove(id: number): Promise<any> {
    return await this.injectProduct.delete(id);
  }
}
