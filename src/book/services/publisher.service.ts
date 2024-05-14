import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publisher } from '../schemas/publisher';
import { Model } from 'mongoose';
import { PublisherDto, UpdatePublisher } from '../dto/book.dto';

@Injectable({ scope: Scope.REQUEST })
export class PublisherService {
    constructor(
        @InjectModel(Publisher.name) private publisherModel: Model<Publisher>,
    ) {}

    async create(publisherDto: PublisherDto) {
        try {
            let publisher;
            publisher = await this.publisherModel.findOne({
                publisher_name: publisherDto.publisher_name,
            });

            if (!publisher) {
                publisher = new this.publisherModel({
                    ...publisherDto,
                });
                await publisher.save();
            }

            return publisher;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async findOne(id: number) {
        try {
            const publisher = await this.publisherModel.findOne({
                publisher_id: id,
            });

            if (!publisher) {
                throw new HttpException(
                    `cannot find publisher for ${publisher}`,
                    HttpStatus.BAD_REQUEST,
                );
            }
            return publisher;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async findAll() {
        try {
            const publishers = this.publisherModel.find();
            if (!publishers) {
                throw new HttpException(
                    'cannot get all publisher',
                    HttpStatus.BAD_REQUEST,
                );
            }
            return publishers;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async delete(id: number) {
        try {
            await this.publisherModel.deleteOne({ publisher_id: id });
            return `delete publisher ${id} succsessfuly`;
        } catch (error) {
            throw new HttpException(
                `${error || error.messgae}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async update(id: number, updatePublisherDto: UpdatePublisher) {
        try {
            const publisher = await this.publisherModel.findOneAndUpdate(
                {
                    publisher_id: id,
                },
                updatePublisherDto,
            );
            return publisher;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
