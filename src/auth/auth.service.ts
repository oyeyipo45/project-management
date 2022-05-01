import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelper } from './auth-helper';
import { CreateUserDto } from './dtos/create-user-dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authHelpers: AuthHelper,
    @InjectRepository(User) private usersRepo: User,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    return this.authHelpers.createUser(userDto);
  }
}
