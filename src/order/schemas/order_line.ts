import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Book } from 'src/book/schemas/book.schema';
import { CustomerOrder } from 'src/customer/schemas/customer_order.schema';

export type OrderLineDocument = HydratedDocument<OrderLine>;

@Schema()
export class OrderLine {
    @Prop()
    line_id: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomerOrder' })
    order: CustomerOrder;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
    book: Book;

    @Prop()
    price: number;
}

export const OrderLineSchema = SchemaFactory.createForClass(OrderLine);
