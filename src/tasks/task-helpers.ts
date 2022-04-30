import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/tasks-filter-dto';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './tasks-status-enum';

export class TaskHelper {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepo: Repository<TaskEntity>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const query = this.taskRepo.createQueryBuilder('task');
    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(payload: CreateTaskDto): Promise<TaskEntity> {
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
