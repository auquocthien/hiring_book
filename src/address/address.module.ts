import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schemas/address.schema';
import {
    AddressStatus,
    AddressStatusSchema,
} from './schemas/address_status.schema';
import { Country, CountrySchema } from './schemas/country.schema';
import { Connection } from 'mongoose';
import { AddressStatusService } from './services/address_status.service';
import { AddressStatusController } from './controllers/address_status.controller';
// import * as AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrementFactory = require('mongoose-sequence');

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            // { name: Address.name, schema: AddressSchema },
            // { name: AddressStatus.name, schema: AddressStatusSchema },
            // { name: Country.name, schema: CountrySchema },
            {
                name: Address.name,
                useFactory: async (connection: Connection) => {
                    const schema = AddressSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    const schemaName = Address.name.toLowerCase();
                    schema.plugin(AutoIncrement, {
                        inc_field: `${schemaName}_id`,
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
            {
                name: AddressStatus.name,
                useFactory: async (connection: Connection) => {
                    const schema = AddressStatusSchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    const schemaName = AddressStatus.name.toLowerCase();
                    schema.plugin(AutoIncrement, {
                        inc_field: `${schemaName}_id`,
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
            {
                name: Country.name,
                useFactory: async (connection: Connection) => {
                    const schema = CountrySchema;
                    const AutoIncrement = AutoIncrementFactory(
                        connection as any,
                    );
                    const schemaName = Country.name.toLowerCase();
                    schema.plugin(AutoIncrement, {
                        inc_field: `${schemaName}_id`,
                    });
                    return schema;
                },
                inject: [getConnectionToken()],
            },
        ]),
    ],
    controllers: [AddressController],
    providers: [AddressService, AddressStatusService],
    exports: [MongooseModule, AddressService],
})
export class AddressModule {}
