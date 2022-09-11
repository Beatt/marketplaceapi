import * as bcrypt from 'bcrypt'

const saltOrRounds = 10

export class UserPasswordEncoder {
  async encodePassword(password: string) {
    return await bcrypt.hash(password, saltOrRounds)
  }

  async isPasswordValid(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
