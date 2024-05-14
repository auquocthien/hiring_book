import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookLanguageDocument = HydratedDocument<BookLanguage>;
@Schema()
export class BookLanguage {
    @Prop()
    language_id: number;

    @Prop()
    language_code: string;

    @Prop()
    language_name: string;
}

export const BookLanguageSchema = SchemaFactory.createForClass(BookLanguage);
