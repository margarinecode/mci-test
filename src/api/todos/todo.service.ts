import { Express } from 'express';
import { FilterDTO, TodoDTO } from './todo.interface';
import { readData, writeData } from '../../data';
import { shortUUIDGenerator } from '../../utils/ShortUUIDGenerator';
import { assert } from 'console';

export default class TodoService {
  constructor(
    private app: Express,
  ) {}

  create(dto: TodoDTO) {
    const data = readData();
    const newTodo = {
      id: shortUUIDGenerator(),
      deletedAt: null,
      ...dto,
    };
    data.push(newTodo);
    writeData(data);
    return newTodo;
  }

  async get(id: string) {
    const data = readData();
    const todo = data.find(v => v.id === id);
    assert(!!todo, 'Todo not found!');
    return todo;
  }
  
  getAll(filter: FilterDTO) {
    const data = readData();
    if (filter.active) {
      return data.filter(v => v.deletedAt === null);
    }
    return data;
  }

  hardDelete(id: string) {
    const data = readData();
    const index = data.findIndex(v => v.id === id);
    
    if (index) {
      const deleted = data.splice(index, 1);
      writeData(data);
      return deleted;
    }
    return null;
  }

  softDelete(id: string) {
    const data = readData();
    const todo = data.find(v => v.id === id);
    if (!todo) {
      throw new Error('Not found!');
    }
    todo.deletedAt = new Date();
    writeData(data);
    return todo;
  }
}