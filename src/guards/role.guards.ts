import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]); //Pegando o decorator e o handler que está sendo chamado

    if (!requiredRoles) {
      return true;
    }

    console.log({ requiredRoles });

    const user = context.switchToHttp().getRequest();
    console.log({ user });

    return true;

  }
}
