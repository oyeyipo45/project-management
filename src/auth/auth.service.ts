import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelper } from './auth-helper';
import { CreateUserDto } from './dtos/create-user-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { timeStamp } from 'console';
import { JwtPayload } from './dtos/jwt-payload-interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authHelpers: AuthHelper,
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    return this.authHelpers.createUser(userDto);
  }

  async signIn(userDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { username, password } = userDto;
    const user = await this.userRepo.findOne({
      where: {
        username,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
