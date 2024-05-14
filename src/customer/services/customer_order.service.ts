import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerOrder } from '../schemas/customer_order.schema';
import { Model } from 'mongoose';
import { AddressService } from 'src/address/address.service';
import { ShippingService } from 'src/order/services/shipping.service';
import { CustomerService } from '../customer.service';
import { CustomerOrderDto } from '../dto/customer_order.dto';

@Injectable()
export class CustomerOrderService {
    constructor(
        @InjectModel(CustomerOrder.name)
        private readonly customerOrderModel: Model<CustomerOrder>,
        private readonly addressService: AddressService,
        @Inject(ShippingService)
        private readonly shippingService: ShippingService,
        private readonly customerService: CustomerService,
    ) {}

    async create(customerOrder: CustomerOrderDto) {
        try {
            const dest_address = await this.addressService.findOne(
                customerOrder.dest_address,
            );

            if (!dest_address) {
                throw new HttpException(
                    `cannot find address for ${customerOrder.dest_address}`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const shipping_method = await this.shippingService.findOne(
                customerOrder.shipping_method,
            );

            if (!shipping_method) {
                throw new HttpException(
                    `cannot find address with ${customerOrder.shipping_method}`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const customer = await this.customerService.findOne(
                customerOrder.customer,
            );

            if (!customer) {
                throw new HttpException(
                    `cannot find customer with ID ${customerOrder.customer}`,
                    HttpStatus.NOT_FOUND,
                );
            }
            const newOrder = new this.customerOrderModel({
                ...customerOrder,
                dest_address,
                shipping_method,
                customer,
            });

            await newOrder.save();
            return newOrder;
        } catch (error) {
            throw new HttpException(
                `${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
