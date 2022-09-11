import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { CreateUserDto } from './create-user.dto'
import { UserPasswordEncoder } from '../security/Encoder'

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userPasswordEncoder: UserPasswordEncoder,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findUserByEmail(createUserDto.email)

    if (user !== null) {
      return Promise.reject({ message: 'El usuario ya existe' })
    }

    createUserDto.password = await this.userPasswordEncoder.encodePassword(createUserDto.password)

    return await this.usersRepository.insert(createUserDto)
  }
}
