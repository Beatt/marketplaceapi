import * as bcrypt from 'bcrypt'

const saltOrRounds = 10

export class UserPasswordEncoder {
  async encodePassword(password: string) {
    return await bcrypt.hash(password, saltOrRounds)
  }
}
