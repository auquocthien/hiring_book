import { OrderStatus } from './order_status.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CustomerOrder } from 'src/customer/schemas/customer_order.schema';

export type OrderHistoryDocument = HydratedDocument<OrderHistory>;
@Schema()
export class OrderHistory {
    @Prop()
    history_id: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomerOrder' })
    order_id: CustomerOrder;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus' })
    status_id: OrderStatus;

    @Prop()
    status_date: string;
}
export const OrderHistorySchema = SchemaFactory.createForClass(OrderHistory);
