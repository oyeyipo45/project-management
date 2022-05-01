import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/tasks-filter-dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ResponseDto, TaskHelper } from './task-helpers';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskHelpers: TaskHelper,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskHelpers.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepo.findOne({
      where: {
        id,
      },
    });
    if (!found)
      throw new NotFoundException(`Task with ID ${id} does not exist`);

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskHelpers.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string): Promise<void> {
    const deleted = await this.taskRepo.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`Task  with ID ${id} not found`);
    }
    console.log(deleted, 'dfdfdfdf');
    return;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    await this.taskRepo.save(task);
    return task;
  }
}
