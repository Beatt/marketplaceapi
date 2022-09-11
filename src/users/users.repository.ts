import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './create-user.dto'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async insert(createUserDto: CreateUserDto) {
    createUserDto.createdAt = new Date()
    createUserDto.updatedAt = new Date()

    const user = this.usersRepository.create(createUserDto)
    await this.usersRepository.save(user)
    return user
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email })
  }
}
