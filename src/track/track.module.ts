import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from 'src/comment/comment.module';
import { FileModule } from 'src/file/file.module';
import { TrackController } from './track.controller';
import { Track, TrackSchema } from './track.model';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [
    FileModule,
    CommentModule,
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
})
export class TrackModule {}
