import { Body, Controller, Get, Param, Post, UnprocessableEntityException } from "@nestjs/common";
import { UserService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { User } from './entities/user.entity'
import { AuthUserDto } from "./dto/auth-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User | HttpException> {
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
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User|null> {
    return await this.userService.getUserById(id)
  }

  @Post("/auth")
  async authUser(@Body() authUserDto: AuthUserDto) {
    try {
      return await this.userService.authUser(authUserDto)
    } catch({ message }) {
      const errors: any = []
      errors.push(message)
      throw new UnprocessableEntityException({
        message: 'Error on auth user',
        errors,
      })
    }
  }
}
