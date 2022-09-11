import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { CreateUserDto } from './create-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findUserByEmail(createUserDto.email)

    if (user !== null) {
      return Promise.reject({ message: 'El usuario ya existe' })
    }

    return await this.usersRepository.insert(createUserDto)
  }
}
