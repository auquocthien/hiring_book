import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthorService } from './services/author.service';
import { LanguageService } from './services/language.service';
import { PublisherService } from './services/publisher.service';
import { BookDto } from './dto/book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { BookAuthor } from './schemas/book_author.schema';

@Injectable()
export class BookService {
    constructor(
        private readonly authorService: AuthorService,
        private readonly languageService: LanguageService,
        private readonly pulisherService: PublisherService,
        @InjectModel(Book.name) private readonly bookModel: Model<Book>,
        @InjectModel(BookAuthor.name)
        private readonly bookAuthorModel: Model<BookAuthor>,
    ) {}

    async create(createBookDto: BookDto) {
        try {
            const author = await this.authorService.create(
                createBookDto.author,
            );

            const language = await this.languageService.create(
                createBookDto.language,
            );

            const publisher = await this.pulisherService.create(
                createBookDto.publisher,
            );

            const newBook = new this.bookModel({
                ...createBookDto,
                author,
                language,
                publisher,
            });

            const newBookAuthor = new this.bookAuthorModel({
                book_id: newBook,
                author_id: author,
            });
            await newBook.save();
            await newBookAuthor.save();

            return newBook;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
