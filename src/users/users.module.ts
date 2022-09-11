import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './users.service'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UserPasswordEncoder } from '../security/userPasswordEncoder'
import { User } from './entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UsersRepository, UserPasswordEncoder],
  controllers: [UsersController],
})
export class UsersModule {}
