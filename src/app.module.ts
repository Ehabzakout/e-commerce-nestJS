import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devEnv from './config/dev.env';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@modules/user/user.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [devEnv] }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('db').url,
        onConnectionCreate: () => {
          console.log('Your DB connected successfully');
        },
      }),
    }),

    AuthModule,
    UserModule,
    BrandModule,
    CategoryModule,
    ProductModule,
    CouponModule,
    CartModule,
    OrderModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
