import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressStatus } from '../schemas/address_status.schema';

@Injectable()
export class AddressStatusService {
    constructor(
        @InjectModel(AddressStatus.name)
        private addressStatusModel: Model<AddressStatus>,
    ) {}

    async create(status: string) {
        try {
            const newStatus = new this.addressStatusModel({
                status_name: status,
            });

            if (!newStatus) {
                throw new HttpException(
                    'Cannot create new address status',
                    HttpStatus.BAD_REQUEST,
                );
            }

            return await newStatus.save();
        } catch (error) {
            throw new HttpException(
                `${error.message || error}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async delete(id: number) {
        const addressStatus = await this.addressStatusModel.findOne({
            status_id: id,
        });

        if (!addressStatus) {
            throw new HttpException(
                'Cannot find status',
                HttpStatus.BAD_REQUEST,
            );
        }
        try {
            await this.addressStatusModel.deleteOne({ status_name: status });
            return `delete ${status} successfully`;
        } catch (error) {
            throw new HttpException(
                `Cannot delete ${status}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async update(id: number, status: string) {
        try {
            const statusDoc = await this.addressStatusModel.findOneAndUpdate(
                { status_id: id },
                { status_name: status },
            );

            if (!statusDoc) {
                throw new HttpException(
                    'Cannot find status',
                    HttpStatus.BAD_REQUEST,
                );
            }

            return statusDoc;
        } catch (error) {
            throw new HttpException(
                `${error.message || error}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async retrieve(id: number) {
        try {
            const status = this.addressStatusModel.findOne({ status_id: id });

            if (!status) {
                throw new HttpException(
                    'Cannot find status',
                    HttpStatus.BAD_REQUEST,
                );
            }

            return status;
        } catch (error) {
            throw new HttpException(
                `${error.message || error}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
