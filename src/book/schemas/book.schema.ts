import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BookLanguage } from './book_language.schema';
import { Publisher } from './publisher';

export type BookDocument = HydratedDocument<Book>;
@Schema()
export class Book {
    @Prop()
    book_id: number;

    @Prop()
    title: string;

    @Prop()
    isbn3: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BookLanguage' })
    language: BookLanguage;

    @Prop()
    num_pages: number;

    @Prop()
    publication_date: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' })
    publisher: Publisher;
}

export const BookSchema = SchemaFactory.createForClass(Book);
