import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.model';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentService],
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  exports: [CommentService],
})
export class CommentModule {}
