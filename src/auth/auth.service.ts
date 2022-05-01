import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private usersEntity: UserEntity) {}
}
