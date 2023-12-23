import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Post()
  async create(@Body() body: CreateTodoDto) {
    return await this.todosService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.todosService.remove(id);
  }
}
