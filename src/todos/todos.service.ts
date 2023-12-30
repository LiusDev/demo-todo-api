import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.repo.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async create(todo: CreateTodoDto): Promise<Todo> {
    return await this.repo.save(todo);
  }

  async update(id: number, todo: Partial<UpdateTodoDto>): Promise<Todo> {
    const todoFromDb = await this.repo.findOneBy({ id });
    if (!todoFromDb) {
      throw new NotFoundException('Todo not found');
    }
    return await this.repo.save({ ...todoFromDb, ...todo });
  }

  async remove(id: number): Promise<void> {
    const todo = await this.repo.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    await this.repo.remove(todo);
  }
}
