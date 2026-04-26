import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { testStatuses, TestStatus } from 'src/lib/test-status';
import { testTypes, TestType } from 'src/lib/test-types';

@Schema({ timestamps: true })
export class TestRun extends Document {
  @Prop({ required: true })
  serviceName: string;

  @Prop({ required: true, enum: testTypes })
  testType: TestType;

  @Prop({
    required: true,
    enum: testStatuses,
    default: testStatuses[0],
  })
  status: TestStatus;

  @Prop({ type: Object })
  loadConfig: any;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Object })
  requestConfig: any;

  @Prop()
  output: string;

  @Prop()
  error: string;

  @Prop()
  finishedAt: Date;
}

export const TestRunSchema = SchemaFactory.createForClass(TestRun);