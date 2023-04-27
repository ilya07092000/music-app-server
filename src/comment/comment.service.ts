import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentRepository: Model<Comment>,
  ) {}

  async create(dto: CreateCommentDto) {
    const comment = await this.commentRepository.create(dto);
    return comment;
  }
}
