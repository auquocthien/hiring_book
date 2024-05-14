import { IsNotEmpty } from 'class-validator';
import { CustomerDto } from './customer.dto';
import { AddressDto } from 'src/address/dto/address.dto';
import { AddressStatus } from 'src/address/dto/address_status.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CustomerAddressDto {
    @IsNotEmpty()
    customer: CustomerDto;

    @IsNotEmpty()
    address: AddressDto;

    @IsNotEmpty()
    status: AddressStatus;
}

export class UpdateCustomerAddressDto extends PartialType(CustomerAddressDto) {}
