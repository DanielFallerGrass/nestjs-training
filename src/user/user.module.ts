import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserIdCheckMiddleware } from '../middlewares/user-id-check-middleware';

@Module({
  imports: [PrismaModule], // os imports são os módulos que o NestJS deve importar para que o UserController funcione
  controllers: [UserController], //os controllers aqui no modulo são os controllers que o NestJS deve conhecer e injetar em outros lugares
  providers: [UserService], // os providers são os serviços que o NestJS deve injetar em outros lugares, como por exemplo, no UserController
  exports: [],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.ALL });
  }
}
