import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devEnv from './config/dev.env';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Admin,
  adminSchema,
  Seller,
  sellerSchema,
  User,
  userSchema,
} from './models';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [devEnv] }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('db').url,
      }),
    }),

    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
