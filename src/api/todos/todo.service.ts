import { Express } from "express";
import { FilterDTO, TodoDTO } from "./todo.interface";
import { readData, writeData } from "../../data";
import { shortUUIDGenerator } from "../../utils/ShortUUIDGenerator";

export default class TodoService {
  constructor(private app: Express) {}

  create(dto: TodoDTO) {
    const data = readData();
    const newData = {
      task: dto.task,
      duration: dto.duration,
      id: shortUUIDGenerator(),
      deletedAt: null,
    };
    data.push(newData);
    // implement
    writeData(data);
    return data;
  }

  update(id: string, dto: TodoDTO) {
    // implement
    const findData = readData();
    let dataToUpdate = findData.find((x) => x.id == id);

    if (dataToUpdate == undefined) {
      throw new Error("Data not found");
    } else {
      dataToUpdate = {
        id: dataToUpdate.id,
        task: dto.task,
        duration: dto.duration,
        deletedAt: dataToUpdate.deletedAt,
      };
      const indexData = findData.findIndex((x) => x.id == id);
      findData[indexData] = dataToUpdate;
      writeData(findData);
      return findData;
    }
  }

  get(id: string) {
    // implement
    const findData = readData();
    let dataToUpdate = findData.find((x) => x.id == id);
    if (dataToUpdate == undefined) {
      throw new Error("Data not found");
    }
    return dataToUpdate;
  }

  getAll(filter: FilterDTO) {
    let data = readData();
    console.log(filter, "isi filter");
    // implement filter
    if (filter.active && filter.active !== "false") {
      data = data.filter((x) => x.deletedAt == null);
    }
    return data;
  }

  hardDelete(id: string) {
    // implement
    const data = readData().filter((x) => x.id !== id);
    return data;
  }

  softDelete(id: string) {
    // implement
    const findData = readData();
    let dataToUpdate = findData.find((x) => x.id == id);

    if (dataToUpdate == undefined) {
      throw new Error("Data not found");
    } else {
      dataToUpdate = {
        id: dataToUpdate.id,
        task: dataToUpdate.task,
        duration: dataToUpdate.duration,
        deletedAt: new Date(),
      };
      const indexData = findData.findIndex((x) => x.id == id);
      findData[indexData] = dataToUpdate;
      writeData(findData);

      return findData;
    }
  }
}
