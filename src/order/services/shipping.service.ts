import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shipping } from '../schemas/shipping_method.schema';
import { Model } from 'mongoose';
import { ShippingDto } from '../dto/shipping.dto';

@Injectable()
export class ShippingService {
    constructor(
        @InjectModel(Shipping.name)
        private readonly shippingModel: Model<Shipping>,
    ) {}

    async create(method: ShippingDto) {
        try {
            const shippingMethod = new this.shippingModel({ ...method });
            await shippingMethod.save();
            return shippingMethod;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async findOne(id: number) {
        try {
            const shipping = await this.shippingModel.findOne({
                shipping_id: id,
            });

            if (!shipping) {
                throw new HttpException(
                    `cannot find method for ${id}`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            return shipping;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
