import { appConfig, databaseConfig, jwtConfig } from '@config';
import { CheckAuthGuard, CheckRoleGuard } from '@guards';
import { ModelCtor } from 'sequelize-typescript';
import {
  Brand,
  BrandModule,
  Address,
  AddressModule,
  Cart,
  CartItem,
  CartItemModule,
  CartModule,
  Category,
  CategoryModule,
  Comment,
  CommentModule,
  FileModule,
  Like,
  LikeModule,
  Order,
  OrderItems,
  OrderItemsModule,
  OrderModule,
  Product,
  ProductConfiguration,
  ProductConfigurationModule,
  ProductItem,
  ProductItemModule,
  ProductModule,
  Region,
  User,
  UserModule,
  Variation,
  VariationModule,
  VariationOption,
  VariationOptionModule,
  Color,
  ColorModule,
  Contact,
  ContactModule,
  TelegramModule,
  Banner,
  BannerModule,
} from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './modules/auth/auth.module';
import { SeedsModule } from '@seeds';
import { RegionModule } from './modules/region/region.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: './uploads',
    }),
    JwtModule.register({
      secret: 'ashyosite',
      global: true,
      signOptions: {
        expiresIn: 60 * 15,
      },
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get<string>('databaseConfig.host'),
            port: config.get<number>('databaseConfig.port'),
            username: config.get<string>('databaseConfig.user'),
            password: config.get<string>('databaseConfig.password'),
            database: config.get<string>('databaseConfig.dbname'),
            models: [
              User,
              Like,
              Comment,
              CartItem,
              Order,
              OrderItems,
              ProductConfiguration,
              ProductItem,
              Variation,
              VariationOption,
              Region,
              Product,
              Category,
              Brand,
              Contact,
              Banner,
              Address,
              Color
            ] as ModelCtor[],
            sync: { force: true },
            synchronize: true,
            logging: console.log,
            autoLoadModels: true,
          };
        } catch (error) {
          console.error(
            'Error occurred while connecting to the database',
            error,
          );
          throw error;
        }
      }
    }),
    UserModule,
    RegionModule,
    AuthModule,
    FileModule,
    LikeModule,
    CommentModule,
    CartItemModule,
    OrderModule,
    OrderItemsModule,
    ProductConfigurationModule,
    ProductItemModule,
    VariationModule,
    VariationOptionModule,
    CategoryModule,
    ProductModule,
    BrandModule,
    SeedsModule,
    AddressModule,
    BannerModule,
    ColorModule,
    ContactModule,
    TelegramModule,
  ],
  controllers: [],
   providers: [
    //  {
    //    useClass: CheckAuthGuard,
    //    provide: APP_GUARD,
    //  },
    //  {
    //    useClass: CheckRoleGuard,
    //    provide: APP_GUARD,
    //  },
   ],
})
export class AppModule { }
