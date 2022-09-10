import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  findAll(): string {
    return 'findAll';
  }
}
