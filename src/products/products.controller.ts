import { Controller, Get, Post, Body, UnprocessableEntityException, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import * as yup from 'yup'
import { FilterProducts } from './dto/filter-products'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      sku: yup.string().required(),
      amount: yup.number().required(),
      price: yup.number().required(),
      user_id: yup.number().required(),
    })

    try {
      await schema.validate(createProductDto, { abortEarly: false })
    } catch (err) {
      throw new UnprocessableEntityException({
        message: 'invalidate attributes',
        errors: err.errors,
      })
    }

    try {
      return await this.productsService.create(createProductDto)
    } catch ({ message }) {
      const errors: any = []
      errors.push(message)
      throw new UnprocessableEntityException({
        message: 'Error on create product',
        errors,
      })
    }
  }

  @Get()
  async findAll(@Query() query: FilterProducts) {
    return await this.productsService.findAll(query)
  }
}
