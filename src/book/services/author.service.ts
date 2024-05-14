import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from '../schemas/author.schema';
import { Model } from 'mongoose';
import { AuthorDto } from '../dto/book.dto';

@Injectable()
export class AuthorService {
    constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

    async create(authorDto: AuthorDto) {
        try {
            let author;
            author = await this.authorModel.findOne({
                author_name: authorDto.author_name,
            });

            if (!author) {
                author = new this.authorModel({ ...authorDto });
                await author.save();
            }

            return author;
        } catch (error) {}
    }
}
