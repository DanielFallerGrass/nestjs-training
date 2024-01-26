import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile, // Esse é o decorator que usamos para fazer upload de um arquivo apenas
  //UploadedFiles,  // Esse é o decorator que usamos para fazer upload de vários arquivos de uma vez
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guards';
import { User } from '../decorators/user.decorator';
import { users } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from '../file/file.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forgot')
  async forgot(@Body() { email }: AuthForgetDTO) {
    // 👈 Destructuring observe que nesse caso eu fiz o destructuring do objeto body pegando apenas o email e não o objeto inteiro
    return this.authService.forgot(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: AuthResetDTO) {
    return this.authService.resetPassword(body.password, body.token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User('id') user: users) {
    return { data: user };
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(
    @User() user: users,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }), //pdf seria o application/pdf
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
        ],
      }),
    )
    photo: Express.Multer.File,
  ) {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'photos',
      `photo-${user.id}.jpg`,
    );

    try {
      await this.fileService.upload(photo, path);
    } catch (e) {
      throw e;
    }

    return { data: { photo: `photo-${user.id}.jpg`, details: photo } };
  }
}
