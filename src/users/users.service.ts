import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { UsersRepository } from './users.repository'
import { CreateUserDto } from './dto/create-user.dto'
import { UserPasswordEncoder } from '../security/userPasswordEncoder'
import { AuthUserDto } from "./dto/auth-user.dto";

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

  async getUserById(id: number) {
    return await this.usersRepository.findUserById(id)
  }

  async authUser(authUserDto: AuthUserDto) {
    const user = await this.usersRepository.findUserByEmail(authUserDto.email)
    if (user === null) {
      return Promise.reject({ message: 'El usuario no existe' })
    }

    const isUserValid = await this.userPasswordEncoder.isPasswordValid(authUserDto.password, user.password)

    return isUserValid ? user : Promise.reject({ message: 'Contraseña incorrecta' })
  }
}
