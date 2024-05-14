import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import { CustomerModule } from './customer/customer.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
        BookModule,
        CustomerModule,
        AddressModule,
        OrderModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
