import { IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
