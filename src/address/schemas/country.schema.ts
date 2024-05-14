import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CountryDocument = HydratedDocument<Country>;
@Schema()
export class Country {
    @Prop()
    country_id: number;

    @Prop()
    country_name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
