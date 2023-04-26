import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  artist: string;

  @Prop({ type: String })
  text: string;

  @Prop({ type: Number })
  listens: number;

  @Prop({ type: String })
  picture: string;

  @Prop({ type: String, required: true, unique: true })
  audio: string;

  // comments:
}

export const TrackSchema = SchemaFactory.createForClass(Track);
