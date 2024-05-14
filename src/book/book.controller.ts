import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';

@Controller('book')
@UsePipes(new ValidationPipe())
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    async createPublisher(@Body() createBookDto: BookDto) {
        return await this.bookService.create(createBookDto);
    }
}
