import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.repo.find();
  }

  async create(todo: CreateTodoDto): Promise<Todo> {
    return await this.repo.save(todo);
  }

  async remove(id: number): Promise<void> {
    const todo = await this.repo.findOneBy({ id });
    await this.repo.remove(todo);
  }
}
