import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { UsersRepository } from '../users/users.repository'
import { ProductsRepository } from './products.repository'
import { User } from '../users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Product]), TypeOrmModule.forFeature([User])],
  controllers: [ProductsController],
  providers: [UsersRepository, ProductsService, ProductsRepository],
})
export class ProductsModule {}
