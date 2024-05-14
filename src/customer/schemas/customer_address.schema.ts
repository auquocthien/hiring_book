import { AddressStatus } from './../../address/schemas/address_status.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Customer } from './customer.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Address } from 'src/address/schemas/address.schema';

export type CustomerAddressDocument = HydratedDocument<CustomerAddress>;

@Schema()
export class CustomerAddress {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
    customer_id: Customer;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
    address_id: Address;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AddressStatus' })
    status: AddressStatus;
}

export const CustomerAddressSchema =
    SchemaFactory.createForClass(CustomerAddress);
