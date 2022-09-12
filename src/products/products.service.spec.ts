import { Test } from '@nestjs/testing'
import { ProductsService } from './products.service'
import { AppModule } from '../app.module'
import { DataSource } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UserService } from '../users/users.service'
import { Product } from './entities/product.entity'
import { ProductsServicePage } from '../../test/objectpages/productsServicePage'
import { productFactory } from '../../test/factories/product'
import { User } from '../users/entities/user.entity'
import { FilterProducts } from './dto/filter-products'
import { userFactory } from '../../test/factories/user'

describe('ProductsService', () => {
  let productsService: ProductsService
  let usersService: UserService
  let dataSource: DataSource
  let createProductDto: CreateProductDto

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    productsService = moduleRef.get<ProductsService>(ProductsService)
    usersService = moduleRef.get<UserService>(UserService)
    dataSource = moduleRef.get<DataSource>(DataSource)

    createProductDto = ProductsServicePage.createProductDto('Product A', '0001', 1, 100)
  })

  afterEach(async () => {
    await dataSource.query('TRUNCATE TABLE "user" CASCADE;')
    await dataSource.query('TRUNCATE TABLE product CASCADE;')
  })

  describe('when create a product', function () {
    it('successfully', async () => {
      const createUserDto = userFactory.build()
      const user = await usersService.createUser(createUserDto)

      createProductDto.user_id = user.id

      const product = await productsService.create(createProductDto)

      const productFound = await dataSource.getRepository(Product).findOneBy({ id: product.id })

      expect(product).toEqual(productFound)
    })

    it('show message error when user not exist', async () => {
      createProductDto.user_id = 0

      await expect(productsService.create(createProductDto)).rejects.toEqual({ message: 'El usuario no existe' })
    })
  })

  describe('when get products', function () {
    let user: User

    beforeEach(async () => {
      const createUserDto = userFactory.build()
      user = await usersService.createUser(createUserDto)

      createProductDto.user_id = user.id
    })

    it('without filters', async () => {
      const createProductsDto = productFactory.buildList(3)
      for (const product of createProductsDto) {
        product.user_id = user.id
        await productsService.create(product)
      }

      const products = await dataSource.getRepository(Product).find()
      expect(products).toHaveLength(3)
    })

    describe('with filters', function () {
      let filterProducts
      beforeEach(async () => {
        await productsService.create(createProductDto)

        filterProducts = new FilterProducts()
        filterProducts.search = 'Product A'
        filterProducts.upper_price = 101
        filterProducts.lower_price = 0
      })

      it('return products when match with the filters', async () => {
        const products = await productsService.findAll(filterProducts)

        expect(products).toHaveLength(1)
      })

      it('return zero products when match with the filters', async () => {
        filterProducts.search = 'Product B'
        const products = await productsService.findAll(filterProducts)

        expect(products).toHaveLength(0)
      })
    })
  })
})
