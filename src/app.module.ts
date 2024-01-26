import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        // 'smtps://kylee7@ethereal.email:nj1BMNKcazbf2p9s7w@smtp.ethereal.email', //PODE ser feito dessa forma ou passar um objeto conforme abaixo. Acho que para AWS devemos seguir essa linha aqui
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'kylee7@ethereal.email',
          pass: 'nj1BMNKcazbf2p9s7w',
        },
      },
      defaults: {
        from: '"nest-modules curso" <kylee7@ethereal.email>',
        cc: 'daniel-faller-grass@hotmail.com',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
