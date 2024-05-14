import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderLineService } from './services/order_line.service';
import { OrderBaseDto } from 'src/customer/dto/customer_order.dto';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly orderLineService: OrderLineService,
    ) {}

    @Post()
    async create(@Body() createOrderDto: OrderBaseDto) {
        try {
            const newOrdeLine =
                await this.orderLineService.create(createOrderDto);
            return newOrdeLine;
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(+id);
    }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateOrderDto: UpdateOrderLineDto,
    // ) {
    //     return this.orderService.update(+id, updateOrderDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(+id);
    }
}
