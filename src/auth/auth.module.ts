import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth-controller';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth.service';
@Module({
  imports: [
    JwtModule.register({
      secret: `+g+Gh9q7SygptpPWLT$=^;Z?nrG/p]2)`,
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}