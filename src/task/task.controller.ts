import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../models/task';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  /*
   * Create
   * */
  @Post('/')
  async createTask(@Body() task: Task) {
    return await this.taskService.create(task);
  }

  /*
   * Read
   * */
  @Get('/')
  async findTasks() {
    return this.taskService.find();
  }

  /*
   * Read One
   * */
  @Get('/:taskId')
  async findTask(@Param('taskId') taskId: string) {
    return this.taskService.findOne(taskId);
  }

  /*
   * Update
   * */
  @Patch('/:taskId')
  async updateTask(@Body() task: Task, @Param('taskId') taskId: string) {
    return await this.taskService.update(taskId, task);
  }

  /*
   * Delete
   * */
  @Delete('/:taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    return await this.taskService.delete(taskId);
  }
}
