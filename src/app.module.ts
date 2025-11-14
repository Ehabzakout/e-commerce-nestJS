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
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
