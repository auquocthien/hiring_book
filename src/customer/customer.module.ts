import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import {
    CustomerAddress,
    CustomerAddressSchema,
} from './schemas/customer_address.schema';
import {
    CustomerOrder,
    CustomerOrderSchema,
} from './schemas/customer_order.schema';
import { Connection } from 'mongoose';
import { AddressModule } from 'src/address/address.module';
import { CustomerOrderService } from './services/customer_order.service';
import { OrderModule } from 'src/order/order.module';
const AutoIncrementFactory = require('mongoose-sequence');

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            // { name: Customer.name, schema: CustomerSchema },
            // { name: CustomerAddress.name, schema: CustomerAddressSchema },
            // { name: CustomerOrder.name, schema: CustomerOrderSchema },
            {
                name: CustomerAddress.name,
                useFactory: async (connection: Connection) => {
                    const schema = CustomerAddressSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    const schemaName = CustomerAddress.name.toLowerCase();
                    schema.plugin(AutoIncrement, {
                        inc_field: `${schemaName}_id`,
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
            {
                name: CustomerOrder.name,
                useFactory: async (connection: Connection) => {
                    const schema = CustomerOrderSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    const schemaName = CustomerOrder.name.toLowerCase();
                    schema.plugin(AutoIncrement, {
                        inc_field: `${schemaName}_id`,
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
            {
                name: Customer.name,
                useFactory: async (connection: Connection) => {
                    const schema = CustomerSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    const schemaName = Customer.name.toLowerCase();
                    schema.plugin(AutoIncrement, {
                        inc_field: `${schemaName}_id`,
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
        ]),
        AddressModule,
        OrderModule,
    ],
    controllers: [CustomerController],
    providers: [CustomerService, CustomerOrderService],
    exports: [MongooseModule, CustomerOrderService],
})
export class CustomerModule {}
