import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Country } from './country.schema';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
    @Prop()
    address_id: number;

    @Prop()
    street_number: string;

    @Prop()
    street_name: string;

    @Prop()
    city: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
    country_id: Country;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
