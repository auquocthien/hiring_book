import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookLanguage } from '../schemas/book_language.schema';
import { Model } from 'mongoose';
import { LanguageDto } from '../dto/book.dto';

@Injectable()
export class LanguageService {
    constructor(
        @InjectModel(BookLanguage.name)
        private languageModel: Model<BookLanguage>,
    ) {}

    async create(languageDto: LanguageDto) {
        try {
            let language = await this.languageModel.findOne({
                language_name: languageDto.language_name,
            });

            if (!language) {
                language = new this.languageModel({
                    ...languageDto,
                });
                await language.save();
            }

            return language;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
