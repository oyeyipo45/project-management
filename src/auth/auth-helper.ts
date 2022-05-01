import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user-dto';
import { User } from './user.entity';

export class AuthHelper {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const { username, password } = userDto;
    const user = this.userRepo.create({ username, password });

    const createduser = await this.userRepo.save(user);
    return createduser;
  }
}
