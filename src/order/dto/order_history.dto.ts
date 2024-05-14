import { IsNotEmpty } from 'class-validator';
import { CustomerOrderDto } from 'src/customer/dto/customer_order.dto';
import { OrderStatusDto } from './order_status.dto';
import { PartialType } from '@nestjs/mapped-types';

export class OrderHistoryDto {
    @IsNotEmpty()
    order: CustomerOrderDto;

    @IsNotEmpty()
    status: OrderStatusDto;

    @IsNotEmpty()
    status_date: string;
}

export class UpdateOrderHistoryDto extends PartialType(OrderHistoryDto) {}
