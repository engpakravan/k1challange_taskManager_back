import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from '../helpers/types';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true})
export class Task {
  @Prop()
  title: string;

  @Prop()
  desc: string;

  @Prop({ type: TaskStatus, enum: Object.values(TaskStatus) })
  status: string;
}


export const TaskSchema = SchemaFactory.createForClass(Task);