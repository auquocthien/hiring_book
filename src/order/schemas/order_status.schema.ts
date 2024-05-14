import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderStatusDocument = HydratedDocument<OrderStatus>;
@Schema()
export class OrderStatus {
    @Prop()
    status_id: number;

    @Prop()
    status_name: string;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);
