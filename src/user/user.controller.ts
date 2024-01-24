import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { RoleGuard } from '../guards/role.guards';
import { AuthGuard } from '../guards/auth.guards';

// @UseInterceptors(LogInterceptor) //Usando o interceptor localmente em todos os métodos
@Roles(Role.ADMIN) //Usando o decorator de role localmente em todos os métodos
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(LogInterceptor) //Usando o interceptor localmente em um método específico
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async index() {
    return this.userService.findAll();
  }
  @Get(':id')
  async show(@ParamId() id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @ParamId() id: number,
    params: any,
    @Body() data: UpdatePutUserDTO,
  ) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePatch(@ParamId() id: number, @Body() data: UpdatePatchUserDTO) {
    return this.userService.updatePatch(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
