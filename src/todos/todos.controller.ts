import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

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
  async update(@Param('id') id: number, @Body() body: Partial<UpdateTodoDto>) {
    return await this.todosService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.todosService.remove(id);
  }
}
