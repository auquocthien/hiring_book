import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class AddressDto {
    @IsNotEmpty()
    street_number: string;

    @IsNotEmpty()
    street_name: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    country: string;
}

export class UpdateAddressDto extends PartialType(AddressDto) {}
