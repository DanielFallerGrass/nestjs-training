import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDto) {
    return { body };
  }

  @Get()
  async index() {
    return { users: [] };
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, params: any, @Body() body: UpdatePutUserDto) {
    return {
      method: 'update',
      id,
      body,
    };
  }

  @Patch(':id')
  async updatePatch(
    @Param('id', ParseIntPipe) id: number,
    @Body() { name, email, password }: UpdatePatchUserDto,
  ) {
    return {
      method: 'updatePatch',
      id,
      name,
      email,
      password,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { method: 'delete', id };
  }
}
