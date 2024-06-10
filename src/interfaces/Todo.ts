import { Duration } from 'date-fns';

export interface Todo {
  id: string,
  task: string,
  duration: Duration,
  deletedAt: Date | null,
}