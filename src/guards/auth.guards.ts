import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      request.user = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      ); // 👈 Aqui eu pego o token do header e removo o Bearer e invoco o método checkToken do AuthService

      request.user = await this.userService.findOne(request.user.id);
    } catch (e) {
      return false;
    }
  }
}
