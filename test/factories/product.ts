import { Factory } from 'fishery'
import { CreateProductDto } from '../../src/products/dto/create-product.dto'
import { faker } from '@faker-js/faker'

export const productFactory = Factory.define<CreateProductDto>(({ params }: any) => {
  params.name = faker.lorem.word()
  params.sku = faker.lorem.word()
  params.price = faker.datatype.number()
  params.amount = faker.datatype.number()
  params.userId = faker.datatype.number()

  return params
})
