import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { ApiBody, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.todosService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateTodoDto) {
    return await this.todosService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateTodoDto) {
    return await this.todosService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number, @Res() res: Response) {
    await this.todosService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
