import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TestRun extends Document {
  @Prop({ required: true })
  serviceName: string;

  @Prop({ required: true })
  testType: string;

  @Prop({
    required: true,
    enum: ['PENDING', 'RUNNING', 'COMPLETED', 'FAILED'],
    default: 'PENDING',
  })
  status: string;

  @Prop({ type: Object })
  loadConfig: any;

  @Prop()
  output: string;

  @Prop()
  error: string;

  @Prop()
  finishedAt: Date;
}

export const TestRunSchema = SchemaFactory.createForClass(TestRun);