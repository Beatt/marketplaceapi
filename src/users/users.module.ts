import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users.entity'
import { UserService } from './users.service'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UserPasswordEncoder } from '../security/Encoder'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UsersRepository, UserPasswordEncoder],
  controllers: [UsersController],
})
export class UsersModule {}
