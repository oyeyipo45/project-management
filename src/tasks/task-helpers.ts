import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/tasks-filter-dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status-enum';
import { InternalServerErrorException, Logger } from '@nestjs/common';

export class TaskHelper {
  private Logger = new Logger('Task controller');
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepo.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }
    try {
      const tasks = await query.getMany();

      return tasks;
    } catch (error) {
      this.Logger.error(`Failed to get tasks for ${user}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(payload: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = payload;

    const task = this.taskRepo.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    const createdTask = await this.taskRepo.save(task);
    return createdTask;
  }
}

export class ResponseDto {
  message: string;
  data: any;
}
