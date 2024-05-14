import { IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class AuthorDto {
    @IsNotEmpty()
    author_name: string;
}

export class UpdateAuthor extends PartialType(AuthorDto) {}

export class LanguageDto {
    @IsNotEmpty()
    language_code: string;
    language_name: string;
}

export class UpdateLanguage extends PartialType(LanguageDto) {}

export class PublisherDto {
    @IsNotEmpty()
    publisher_name: string;
}

export class UpdatePublisher extends PartialType(PublisherDto) {}

export class BookDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    language: LanguageDto;

    @IsNumber()
    num_pages: number;

    @IsNotEmpty()
    publication_date: string;

    @IsNotEmpty()
    publisher: PublisherDto;

    @IsNotEmpty()
    author: AuthorDto;
}

export class UpdateBookDto extends PartialType(BookDto) {}
