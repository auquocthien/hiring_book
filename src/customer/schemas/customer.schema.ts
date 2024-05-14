import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;
@Schema()
export class Customer {
    @Prop()
    customer_id: number;

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ length: 8 })
    password: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
