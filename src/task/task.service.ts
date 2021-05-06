import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../models/task';
import mongoose , { Model, MongooseQueryOptions } from "mongoose";
import { TaskStatus } from '../helpers/types';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<TaskDocument>) {}

  async create(task: any) {
    return this.TaskModel.create(task);
  }

  async find(): Promise<Task> {
    return this.TaskModel.find({ status: { $ne : TaskStatus.DELETED} })
      .sort({ createdAt: -1 })
      .then();
  }

  async findOne(taskId: string): Promise<Task> {
    return this.TaskModel.findById(taskId).then();
  }

  async update(taskId: string, value: Task): Promise<Task> {
    return this.TaskModel.updateOne({ _id: taskId }, value).then();
  }

  async delete(taskId: string): Promise<Task> {
    return this.TaskModel.updateOne(
      { _id: taskId },
      { status: TaskStatus.DELETED },
    ).then();
  }
}
