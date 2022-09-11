import { Body, Controller, Post, UnprocessableEntityException } from '@nestjs/common'
import { UserService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { User } from './entities/user.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async post(@Body() createUserDto: CreateUserDto): Promise<User | HttpException> {
    try {
      return await this.userService.createUser(createUserDto)
    } catch ({ message }) {
      const errors: any = []
      errors.push(message)
      throw new UnprocessableEntityException({
        message: 'Error on create user',
        errors,
      })
    }
  }
}
