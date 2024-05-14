import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author } from './author.schema';
import { Book } from './book.schema';

export type BookAuthorDocumnet = HydratedDocument<BookAuthor>;
@Schema()
export class BookAuthor {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
    book_id: Book;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
    author_id: Author;
}

export const BookAuthorSchema = SchemaFactory.createForClass(BookAuthor);
