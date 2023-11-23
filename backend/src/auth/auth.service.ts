// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async checkUser(username: string, email: string) {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }
    return user;
  }

  async generateNewToken(user: User) {
    return this.jwtService.sign({
      email: user.email,
    });
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET});
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

}