import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class OrderStatusDto {
    @IsNotEmpty()
    status_name: string;
}

export class UpdateOrderStatusDto extends PartialType(OrderStatusDto) {}
