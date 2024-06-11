import { Duration } from 'date-fns';

export interface FilterDTO {
  active: string;
}

export interface DeleteQueryDTO {
  hard: boolean;
}

export interface TodoDTO {
  task: string,
  duration: Duration
}

