import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private injectCategory: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.injectCategory.find();
  }

  findOne(id: number): Promise<Category> {
    return this.injectCategory.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  create(data: CreateCategoryDto): Promise<Category> {
    const newCategory = this.injectCategory.create(data);
    return this.injectCategory.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto): Promise<Category> {
    const category = await this.injectCategory.findOne({ where: { id } });
    this.injectCategory.merge(category, changes);
    return this.injectCategory.save(category);
  }
  async remove(id: number): Promise<any> {
    return await this.injectCategory.delete(id);
  }
}
