import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsRepository } from './products.repository'
import { UsersRepository } from '../users/users.repository'
import { FilterProducts } from './dto/filter-products'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const user = await this.usersRepository.findUserById(createProductDto.userId)
    if (user === null) {
      return Promise.reject({ message: 'El usuario no existe' })
    }

    return await this.productsRepository.insert(createProductDto)
  }

  findAll(filterProductDto: FilterProducts) {
    return this.productsRepository.findProductsByFilter(filterProductDto)
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
