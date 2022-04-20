import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Number, ObjectId } from 'mongoose';

export type PlantDocument = Plant & Document;

export class PlantNeedsSchema {
  @Prop({ type: Number, required: true })
  humidity: number;

  @Prop({ type: Number, required: true })
  temperature: number;

  @Prop({ type: Number, required: true })
  moisture: number;

  @Prop({ type: Number, required: true })
  lux: number;
}

@Schema()
export class Plant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  explanation: string;

  @Prop()
  images: string[];

  @Prop({ required: true })
  needs: PlantNeedsSchema;

  @Prop({ required: true })
  addedBy: mongoose.Types.ObjectId;

  @Prop({ default: 1, required: true })
  status: number;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
