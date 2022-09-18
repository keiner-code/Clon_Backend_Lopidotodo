import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @IsPositive()
  readonly orderId: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  readonly productId: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  readonly quantity: number;
}
export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
