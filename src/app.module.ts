import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { ProductsModule } from './products/products.module'
import { Product } from './products/entities/product.entity'
import { User } from './users/entities/user.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: `${process.env.APP_NAME}_${process.env.APP_ENV}`,
      entities: [User, Product],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
