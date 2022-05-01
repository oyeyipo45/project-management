import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

export class AuthHelper {
  constructor(
    @InjectRepository(UserEntity)
    private taskRepo: Repository<UserEntity>,
  ) {}

  async createUser() {}
}
