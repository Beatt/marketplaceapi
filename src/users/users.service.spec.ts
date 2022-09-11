import { UserService } from './users.service'
import { Test } from '@nestjs/testing'
import { AppModule } from '../app.module'
import { DataSource } from 'typeorm'
import { UsersServicePage } from '../../test/objectpages/usersServicePage'
import { User } from './entities/user.entity'

describe('UsersService', function () {
  let usersService: UserService
  let dataSource: DataSource

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    usersService = moduleRef.get<UserService>(UserService)
    dataSource = moduleRef.get<DataSource>(DataSource)
  })

  afterEach(async () => {
    await dataSource.query('TRUNCATE TABLE "user" CASCADE;')
  })

  it('create user', async () => {
    const createUserDto = UsersServicePage.createUserDto('geovanni@gmail.com', '12345')

    const user = await usersService.createUser(createUserDto)

    const userFound = await dataSource.getRepository(User).findOne({ where: { id: user.id } })

    expect(user).toEqual(userFound)
  })

  it('show message error when user exist', async () => {
    const createUserDto = UsersServicePage.createUserDto('geovanni@gmail.com', '12345')
    await usersService.createUser(createUserDto)

    const anotherCreateUserDto = UsersServicePage.createUserDto('geovanni@gmail.com', 'hola mundo')

    await expect(usersService.createUser(anotherCreateUserDto)).rejects.toEqual({ message: 'El usuario ya existe' })
  })
})
