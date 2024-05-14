import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressDto, UpdateAddressDto } from './dto/address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './schemas/address.schema';
import { Country } from './schemas/country.schema';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Address.name) private addressModel: Model<Address>,
        @InjectModel(Country.name) private countryModel: Model<Country>,
    ) {}

    async create(createAddressDto: AddressDto) {
        try {
            let country;
            country = await this.countryModel.findOne({
                country_name: createAddressDto.country,
            });
            if (!country) {
                country = new this.countryModel({
                    country_name: createAddressDto.country,
                });
                await country.save();
            }

            const { street_number, street_name, city } = createAddressDto;
            const newAddress = new this.addressModel({
                street_number,
                street_name,
                city,
            });
            newAddress.country_id = country;
            return await newAddress.save();
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    findAll() {
        return `This action returns all address`;
    }

    findOne(id: number) {
        try {
            const address = this.addressModel.findOne({ address_id: id });
            if (!address) {
                throw new HttpException(
                    `cannot find address with ID ${id}`,
                    HttpStatus.NOT_FOUND,
                );
            }

            return address;
        } catch (error) {
            throw new HttpException(
                `Internal server error: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    update(id: number, updateAddressDto: UpdateAddressDto) {
        return `This action updates a #${id} address`;
    }

    remove(id: number) {
        return `This action removes a #${id} address`;
    }
}
