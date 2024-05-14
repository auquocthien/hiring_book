import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    HttpStatus,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto, UpdateAddressDto } from './dto/address.dto';
import { AddressStatusService } from './services/address_status.service';

@UsePipes(new ValidationPipe())
@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService: AddressService,
        private readonly addressStatusService: AddressStatusService,
    ) {}

    @Post()
    async create(@Body() createAddressDto: AddressDto) {
        try {
            const newAddress =
                await this.addressService.create(createAddressDto);
            return newAddress;
        } catch (error) {
            throw new HttpException(
                `${error || error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get()
    findAll() {
        return this.addressService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.addressService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAddressDto: UpdateAddressDto,
    ) {
        return this.addressService.update(+id, updateAddressDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.addressService.remove(+id);
    }
}
