import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { User } from './users/users.entity'
import { ConfigModule } from '@nestjs/config'
import { Product } from './products/product.entity'

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
  ],
})
export class AppModule {}
