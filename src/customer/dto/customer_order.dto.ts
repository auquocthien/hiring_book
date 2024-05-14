import { IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { OrderLineDto } from 'src/order/dto/order.dto';

export class CustomerOrderDto {
    @IsNotEmpty()
    order_date: string;

    @IsNotEmpty()
    customer: number;

    @IsNotEmpty()
    @IsNumber()
    shipping_method: number;

    @IsNotEmpty()
    @IsNumber()
    dest_address: number;
}

export class OrderBaseDto {
    @IsNotEmpty()
    customerOrder: CustomerOrderDto;

    @IsNotEmpty()
    orderLine: OrderLineDto;
}

export class UpdateOrderBaseDto extends PartialType(OrderBaseDto) {}
