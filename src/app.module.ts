import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { RefreshTokenController } from './refresh-token/refresh-token.controller';
import { BrandsModule } from './brands/brands.module';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { WishListService } from './wish-list/wish-list.service';
import { WishListModule } from './wish-list/wish-list.module';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { ShippingMethodService } from './shipping-method/shipping-method.service';
import { ShippingMethodController } from './shipping-method/shipping-method.controller';
import { ShippingMethodModule } from './shipping-method/shipping-method.module';
import { StoresController } from './stores/stores.controller';
import { StoresService } from './stores/stores.service';
import { StoresModule } from './stores/stores.module';
import { ShippingInfoModule } from './shipping-info/shipping-info.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User],
            autoLoadModels: true,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }),
        UsersModule,
        AuthModule,
        RefreshTokenModule,
        BrandsModule,
        CategoriesModule,
        ProductsModule,
        WishListModule,
        OrdersModule,
        ShippingMethodModule,
        StoresModule,
        ShippingInfoModule,
        AddressesModule
    ],
    controllers: [RefreshTokenController, ProductsController, OrdersController, ShippingMethodController, StoresController],
})
export class AppModule {};