import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: any = context.switchToHttp().getRequest();
    const res: any = context.switchToHttp().getResponse();

    if (!req.cookies.token) {
      res.redirect(process.env.frontendUrl + 'login');
      return;
    }
    try {
      const decode = await this.authService.verifyToken(req.cookies.token);
      const user = await this.userService.findOne(decode.email);
      if (!user) {
        res.redirect(process.env.frontendUrl + 'login');
        return;
      }
      req.user = user;
    } catch {
      throw new UnauthorizedException('Invalid Token');
    }
    return true;
  }
}
