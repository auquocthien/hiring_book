import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Address } from 'src/address/schemas/address.schema';
import { Shipping } from 'src/order/schemas/shipping_method.schema';
import { Customer } from './customer.schema';

export type CustomerOrderDocument = HydratedDocument<CustomerOrder>;
@Schema()
export class CustomerOrder {
    @Prop()
    order: number;

    @Prop()
    order_date: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
    customer: Customer;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shipping' })
    shipping_method: Shipping;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
    dest_address: Address;
}
export const CustomerOrderSchema = SchemaFactory.createForClass(CustomerOrder);
