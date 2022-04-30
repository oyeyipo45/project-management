import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/tasks-filter-dto';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ResponseDto, TaskHelper } from './task-helpers';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskHelpers: TaskHelper,
    @InjectRepository(TaskEntity)
    private taskRepo: Repository<TaskEntity>,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    return this.taskHelpers.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    const found = await this.taskRepo.findOne({
      where: {
        id,
      },
    });
    if (!found)
      throw new NotFoundException(`Task with ID ${id} does not exist`);

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskHelpers.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
    const deleted = await this.taskRepo.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`Task  with ID ${id} not found`);
    }
    console.log(deleted, 'dfdfdfdf');
    return;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    task.status = status;

    await this.taskRepo.save(task);
    return task;
  }
}
