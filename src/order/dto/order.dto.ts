import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderLineDto {
    @IsNotEmpty()
    book: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}

export class UpdateOrderLineDto extends PartialType(OrderLineDto) {}
