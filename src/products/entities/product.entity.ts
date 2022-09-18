import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';
//un producto puede estar en una categorias OneToOne
//un producto tiene una marca y es la entidad debil por que solo puede tener una marca
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  name: string;

  @Column({ type: 'int' })
  likes: number;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'varchar', length: 200 })
  reference: string;

  @Column({ type: 'int' })
  priceAfter: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  discount: number;

  @Column({ type: 'int' })
  unit: number;

  @Column({ type: 'text' })
  imgs: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
