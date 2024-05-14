import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;
@Schema()
export class Author {
    @Prop()
    author_id: number;

    @Prop()
    author_name: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
