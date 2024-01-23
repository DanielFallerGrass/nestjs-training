import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      request.user = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      ); // 👈 Aqui eu pego o token do header e removo o Bearer e invoco o método checkToken do AuthService
      return true;
    } catch (e) {
      return false;
    }
  }
}
