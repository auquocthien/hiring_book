import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class AddressStatus {
    @IsNotEmpty()
    address_status: string;
}

export class UpdataAddressStatus extends PartialType(AddressStatus) {}
