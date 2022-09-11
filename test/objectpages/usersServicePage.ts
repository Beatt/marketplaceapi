import { CreateUserDto } from '../../src/users/dto/create-user.dto'

export class UsersServicePage {
  static createUserDto(name: string, password: string) {
    const createUserDto = new CreateUserDto()
    createUserDto.email = name
    createUserDto.password = password

    return createUserDto
  }
}
