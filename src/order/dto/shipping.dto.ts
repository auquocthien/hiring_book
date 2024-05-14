import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class ShippingDto {
    @IsNotEmpty()
    method_name: string;

    @IsNotEmpty()
    cost: number;
}

export class UpdateShippingDto extends PartialType(ShippingDto) {}
