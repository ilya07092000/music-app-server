import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from 'src/comment/comment.model';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true, unique: false })
  artist: string;

  @Prop({ type: String })
  text: string;

  @Prop({ type: Number })
  listens: number;

  @Prop({ type: String })
  picture: string;

  @Prop({ type: String, required: true, unique: true })
  audio: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
