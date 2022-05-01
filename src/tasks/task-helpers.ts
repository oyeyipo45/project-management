import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/tasks-filter-dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status-enum';

export class TaskHelper {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepo.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }
    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(payload: CreateTaskDto): Promise<Task> {
    const { title, description } = payload;

    const task = this.taskRepo.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    const createdTask = await this.taskRepo.save(task);
    return createdTask;
  }
}

export class ResponseDto {
  message: string;

  data: any;
}
