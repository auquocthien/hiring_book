import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressStatusDocument = HydratedDocument<AddressStatus>;
@Schema()
export class AddressStatus {
    @Prop()
    status_id: number;

    @Prop()
    status_name: string;
}

export const AddressStatusSchema = SchemaFactory.createForClass(AddressStatus);
