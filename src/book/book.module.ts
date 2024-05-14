import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book, BookSchema } from './schemas/book.schema';
import { Author, AuthorSchema } from './schemas/author.schema';
import { BookAuthor, BookAuthorSchema } from './schemas/book_author.schema';
import {
    BookLanguage,
    BookLanguageSchema,
} from './schemas/book_language.schema';
import { Connection } from 'mongoose';
import { Publisher, PublisherSchema } from './schemas/publisher';
import { AuthorService } from './services/author.service';
import { LanguageService } from './services/language.service';
import { PublisherService } from './services/publisher.service';

const AutoIncrementFactory = require('mongoose-sequence');
@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Book.name,
                useFactory: (connection: Connection) => {
                    const schema = BookSchema;
                    const AutoIncrement = AutoIncrementFactory(connection);
                    schema.plugin(AutoIncrement, { inc_field: 'book_id' });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
            {
                name: Author.name,
                useFactory: (connection: Connection) => {
                    const schema = AuthorSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    schema.plugin(AutoIncrement, { inc_field: 'author_id' });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
            {
                name: BookAuthor.name,
                useFactory: (connection: Connection) => {
                    const schema = BookAuthorSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    schema.plugin(AutoIncrement, {
                        inc_field: 'book_author_id',
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
            {
                name: BookLanguage.name,
                useFactory: (connection: Connection) => {
                    const schema = BookLanguageSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    schema.plugin(AutoIncrement, {
                        inc_field: 'book_language_id',
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
            {
                name: Publisher.name,
                useFactory: (connection: Connection) => {
                    const schema = PublisherSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    schema.plugin(AutoIncrement, { inc_field: 'publisher_id' });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
        ]),
    ],
    controllers: [BookController],
    providers: [BookService, AuthorService, LanguageService, PublisherService],
    exports: [MongooseModule],
})
export class BookModule {}
