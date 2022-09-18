import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly likes: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly reference: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly priceAfter: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly discount: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly unit: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly imgs: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly categoryId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @ApiProperty()
  @IsPositive()
  limit: number;

  @IsOptional()
  @ApiProperty()
  @Min(0)
  offset: number;
}
