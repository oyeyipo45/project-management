import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthHelper } from './auth-helper';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthHelper],
  controllers: [AuthController],
})
export class AuthModule {}
