import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './tasks.model';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  desccription: string;

  @Column()
  status: TaskStatus;
}
