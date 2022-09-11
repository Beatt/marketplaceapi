import { Body, Controller, Post, UnprocessableEntityException } from '@nestjs/common'
import { UserService } from './users.service'
import { User } from './users.entity'
import { CreateUserDto } from './create-user.dto'
import * as yup from 'yup'
import { HttpException } from '@nestjs/common/exceptions/http.exception'

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async post(@Body() createUserDto: CreateUserDto): Promise<User | HttpException> {
    let schema = yup.object().shape({
      email: yup.string().email(),
      password: yup.string().required(),
    })

    try {
      await schema.validate(createUserDto, { abortEarly: false })
    } catch (err) {
      throw new UnprocessableEntityException({
        message: '¡Campos invalidaos al crear el usuario!',
        errors: err.errors,
      })
    }

    try {
      return await this.userService.createUser(createUserDto)
    } catch ({ message }) {
      const errors: any = []
      errors.push(message)
      throw new UnprocessableEntityException({
        message: '¡Ha ocurrido un error al crear el usuario!',
        errors,
      })
    }
  }
}
