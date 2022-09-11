import { Factory } from 'fishery'
import { faker } from '@faker-js/faker'
import { CreateUserDto } from '../../src/users/dto/create-user.dto'

export const userFactory = Factory.define<CreateUserDto>(({ params }: any) => {
  params.email = faker.internet.email()
  params.password = faker.internet.password()

  return params
})
