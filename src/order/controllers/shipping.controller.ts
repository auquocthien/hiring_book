import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ShippingService } from '../services/shipping.service';
import { ShippingDto } from '../dto/shipping.dto';

@UsePipes(new ValidationPipe())
@Controller('shipping')
export class ShippingController {
    constructor(private readonly shippingService: ShippingService) {}

    @Post()
    async create(@Body() shippingDto: ShippingDto) {
        return await this.shippingService.create(shippingDto);
    }
}
