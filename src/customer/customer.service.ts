import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerDto, LoginPayload, SignInPayload } from './dto/customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model } from 'mongoose';
import { CustomerAddress } from './schemas/customer_address.schema';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
        @InjectModel(CustomerAddress.name)
        private customerAddressModel: Model<CustomerAddress>,
        @Inject(AddressService) private readonly addressService: AddressService,
    ) {}

    async create(createCustomerDto: CustomerDto) {
        try {
            const newCustomer = new this.customerModel(createCustomerDto);
            await newCustomer.save();
            return newCustomer;
        } catch (error) {
            throw new HttpException(
                `email exits ${createCustomerDto.email}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async findOne(filter: any) {
        const customer = await this.customerModel.findOne({
            $or: [
                { customer_id: filter },
                { email: filter as unknown as string },
            ],
        });
        if (!customer) {
            throw new HttpException(
                'Cannot find customer',
                HttpStatus.BAD_REQUEST,
            );
        }
        return customer;
    }

    async login(loginPayload: LoginPayload) {
        try {
            const customer = await this.customerModel.findOne({
                email: loginPayload.email,
                password: loginPayload.password,
            });

            if (!customer) {
                throw new HttpException(
                    'email or password incorrect',
                    HttpStatus.NOT_FOUND,
                );
            }

            return customer;
        } catch (error) {
            throw new HttpException(
                `cannot login: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async signup(signinPaylaod: SignInPayload) {
        try {
            let customer;
            customer = await this.customerModel.findOne({
                email: signinPaylaod.email,
            });

            if (!customer) {
                customer = new this.customerModel({ ...signinPaylaod });
                await customer.save();
                return customer;
            } else {
                return 'email already exits';
            }
        } catch (error) {}
    }
}
