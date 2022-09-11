import { CreateProductDto } from '../../src/products/dto/create-product.dto'

export class ProductsServicePage {
  static createProductDto(name: string, sku: string, amount: number, price: number, userId: number = 0) {
    const createProductDto = new CreateProductDto()
    createProductDto.sku = sku
    createProductDto.name = name
    createProductDto.amount = amount
    createProductDto.price = price
    createProductDto.user_id = userId

    return createProductDto
  }
}
