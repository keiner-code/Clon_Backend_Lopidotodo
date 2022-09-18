import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private injectBrand: Repository<Brand>,
  ) {}

  findAll(): Promise<Brand[]> {
    return this.injectBrand.find();
  }

  findOne(id: number): Promise<Brand> {
    const product = this.injectBrand.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!product) {
      throw new NotFoundException(`Brand ${id} Not Found`);
    }
    return product;
  }

  create(data: CreateBrandDto): Promise<Brand> {
    const newBrand = this.injectBrand.create(data);
    return this.injectBrand.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto): Promise<Brand> {
    const brand = await this.injectBrand.findOne({ where: { id } });
    this.injectBrand.merge(brand, changes);
    return this.injectBrand.save(brand);
  }
  async remove(id: number): Promise<any> {
    return await this.injectBrand.delete(id);
  }
}
