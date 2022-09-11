import { CreateProductDto } from './dto/create-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'
import { FilterProducts } from './dto/filter-products'

export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async insert(createProductDto: CreateProductDto) {
    createProductDto.createdAt = new Date()
    createProductDto.updatedAt = new Date()

    const product = this.productsRepository.create(createProductDto)
    await this.productsRepository.save(product)
    return product
  }

  async findProductsByFilter(filterProductDto: FilterProducts): Promise<Product[]> {
    let queryBuilder = this.productsRepository
      .createQueryBuilder()
      .select('id, name, sku, amount, price, created_at, updated_at, user_id')

    if (filterProductDto.user_id) {
      queryBuilder.andWhere('user_id = :userId', { userId: filterProductDto.user_id })
    }

    if (filterProductDto.search) {
      queryBuilder.andWhere('name LIKE :name', { name: filterProductDto.search })
        .orWhere('sku LIKE :sku', { sku: filterProductDto.search })
    }

    if (filterProductDto.lower_price && filterProductDto.upper_price) {
      queryBuilder.andWhere('price BETWEEN :lowerPrice AND :upperPrice', {
        lowerPrice: filterProductDto.lower_price,
        upperPrice: filterProductDto.upper_price,
      })
    }

    return await queryBuilder.execute()
  }
}
