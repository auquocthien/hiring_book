import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { AddressStatusService } from '../services/address_status.service';

@Controller('address_status')
export class AddressStatusController {
    constructor(
        @Inject() private readonly addressStatusService: AddressStatusService,
    ) {}

    @Post('status')
    async create(@Body() status: string) {
        try {
            const newStatus = await this.addressStatusService.create(status);
            return newStatus;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get(':id')
    async retrieve(@Param('id', ParseIntPipe) id: number) {
        try {
            const status = await this.addressStatusService.retrieve(id);
            return status;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
