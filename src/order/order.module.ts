import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { OrderHistory, OrderHistorySchema } from './schemas/order_history';
import { OrderLine, OrderLineSchema } from './schemas/order_line';
import { OrderStatus, OrderStatusSchema } from './schemas/order_status.schema';
import { Shipping, ShippingSchema } from './schemas/shipping_method.schema';
import { Connection } from 'mongoose';
import { ShippingService } from './services/shipping.service';
import { ShippingController } from './controllers/shipping.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { OrderLineService } from './services/order_line.service';
const AutoIncrementFactory = require('mongoose-sequence');

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            // { name: OrderHistory.name, schema: OrderHistorySchema },
            // { name: OrderLine.name, schema: OrderLineSchema },
            // { name: OrderStatus.name, schema: OrderStatusSchema },
            // { name: Shipping.name, schema: ShippingSchema },
            {
                name: OrderHistory.name,
                useFactory: async (connection: Connection) => {
                    const schema = OrderHistorySchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    const schemaName = OrderHistory.name.toLowerCase();
                    schema.plugin(AutoIncrement, {
                        inc_field: `${schemaName}_id`,
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
            {
                name: OrderLine.name,
                useFactory: async (connection: Connection) => {
                    const schema = OrderLineSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    const schemaName = OrderLine.name.toLowerCase();
                    schema.plugin(AutoIncrement, {
                        inc_field: `${schemaName}_id`,
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
            {
                name: OrderStatus.name,
                useFactory: async (connection: Connection) => {
                    const schema = OrderStatusSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    const schemaName = OrderStatus.name.toLowerCase();
                    schema.plugin(AutoIncrement, {
                        inc_field: `${schemaName}_id`,
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
            {
                name: Shipping.name,
                useFactory: async (connection: Connection) => {
                    const schema = ShippingSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    const schemaName = Shipping.name.toLowerCase();
                    schema.plugin(AutoIncrement, {
                        inc_field: `${schemaName}_id`,
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
        ]),
        forwardRef(() => CustomerModule),
    ],
    controllers: [OrderController, ShippingController],
    providers: [OrderService, ShippingService, OrderLineService],
    exports: [MongooseModule, ShippingService],
})
export class OrderModule {}
