import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CustomerDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class UpdateCustomerDto extends PartialType(CustomerDto) {}
export class LoginPayload extends PickType(CustomerDto, [
    'email',
    'password',
]) {}

export class SignInPayload extends LoginPayload {}
