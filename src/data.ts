import { readFileSync, writeFileSync } from 'fs';
import { Todo } from './interfaces/Todo';

const PATH = __dirname + '/todos.json';

export const data: Todo[] = [];

export const readData = () => {
  const res = readFileSync(PATH, { encoding: 'utf-8' });
  return JSON.parse(res) as Todo[];
};

export const writeData = (newData: Todo[]) => {
  writeFileSync(PATH, Buffer.from(JSON.stringify(newData)));
};