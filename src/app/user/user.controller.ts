import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { IndexUserSwagger } from './swagger/index-user.swagger';
// import { GetUserSwagger } from './swagger/get-todo.swagger';
// import { UpdateUserSwagger } from './swagger/update-user.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';

@Controller('api/v1/users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuário' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Lista de usuários retornada com sucesso',
  //   type: IndexUserSwagger,
  //   isArray: true,
  // })
  async index() {
    return await this.userService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequestSwagger,
  })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Novo usuário registrado com sucesso',
  //   type: IndexUserSwagger,
  // })
  @ApiOperation({ summary: 'Registrar novo usuário' })
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de um usuário' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Dados de um usuário',
  //   type: GetUserSwagger,
  // })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: NotFoundSwagger,
  })
  async show(@Param('id') id: string) {
    return await this.userService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados de um usuário' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Usuário atualizado com sucesso',
  //   type: UpdateUserSwagger,
  // })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequestSwagger,
  })
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'Usuário deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: NotFoundSwagger,
  })
  async destroy(@Param('id') id: string) {
    await this.userService.deleteById(id);
  }
}
