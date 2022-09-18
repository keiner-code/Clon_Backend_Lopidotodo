import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userId: number;
}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
