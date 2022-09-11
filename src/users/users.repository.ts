import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

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

  async findUserById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id })
  }
}
