import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    HttpException,
    HttpStatus,
    ParseIntPipe,
    Res,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto, LoginPayload, SignInPayload } from './dto/customer.dto';
import { CustomerOrderService } from './services/customer_order.service';
import { CustomerOrderDto, OrderBaseDto } from './dto/customer_order.dto';
import { Response } from 'express';

@Controller('customer')
@UsePipes(new ValidationPipe())
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly customerOrderService: CustomerOrderService,
    ) {}

    @Post()
    async create(@Body() createCustomerDto: CustomerDto) {
        try {
            const newCustomer =
                await this.customerService.create(createCustomerDto);
            return newCustomer;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Post('login')
    async login(@Body() loginPayload: LoginPayload, @Res() res: Response) {
        try {
            const customer = await this.customerService.login(loginPayload);
            return res.status(HttpStatus.OK).json(customer);
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('signup')
    async signup(@Body() signinPayload: SignInPayload) {
        console.log(signinPayload);
        try {
            const customer = await this.customerService.signup(signinPayload);
            return customer;
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('customer_order')
    async createCustomerOrder(@Body() customerOrder: CustomerOrderDto) {
        try {
            const newOrder =
                await this.customerOrderService.create(customerOrder);
            return newOrder;
        } catch (error) {
            throw new HttpException(
                `${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.customerService.findOne(id);
    }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateCustomerDto: UpdateCustomerDto,
    // ) {
    //     return this.customerService.update(+id, updateCustomerDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.customerService.remove(+id);
    // }
}
