import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShippingDocument = HydratedDocument<Shipping>;
@Schema()
export class Shipping {
    @Prop()
    method_id: number;

    @Prop()
    method_name: string;

    @Prop()
    cost: number;
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
