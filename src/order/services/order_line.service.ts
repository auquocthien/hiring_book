import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderBaseDto } from 'src/customer/dto/customer_order.dto';
import { CustomerOrderService } from 'src/customer/services/customer_order.service';
import { OrderLine } from '../schemas/order_line';
import { Model } from 'mongoose';

@Injectable()
export class OrderLineService {
    constructor(
        private readonly customerOrderService: CustomerOrderService,
        @InjectModel(OrderLine.name)
        private readonly orderLineModel: Model<OrderLine>,
    ) {}

    async create(orderBaseDto: OrderBaseDto) {
        try {
            const { customerOrder, orderLine } = orderBaseDto;

            const order = await this.customerOrderService.create(customerOrder);

            const newOrderLine = new this.orderLineModel({
                ...orderLine,
                order,
            });

            if (!newOrderLine) {
                throw new HttpException(
                    'cannot create order line',
                    HttpStatus.BAD_REQUEST,
                );
            }
        } catch (error) {
            throw new HttpException(
                `${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
