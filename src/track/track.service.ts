import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentService } from 'src/comment/comment.service';
import { FileService } from 'src/file/file.service';
import { AddCommentDto } from './dto/add-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './track.model';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackRepository: Model<Track>,
    private fileService: FileService,
    private commentService: CommentService,
  ) {}

  async create(dto: CreateTrackDto, audio: Express.Multer.File) {
    let audioFileName = '';
    if (audio) {
      audioFileName = this.fileService.save(audio);
    }

    const track = await this.trackRepository.create({
      ...dto,
      audio: audioFileName,
    });
    return track;
  }

  async getAll() {
    return this.trackRepository.find();
  }

  async getById(id: string) {
    const track = await this.trackRepository.findById(id).populate('comments');
    if (!track) {
      throw new HttpException('Track Not Found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async deleteById(id: string) {
    const track = await this.trackRepository.findOneAndDelete({ _id: id });

    if (!track) {
      throw new HttpException('Track Not Found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async update() {
    return 'updated';
  }

  async addComment(dto: AddCommentDto) {
    const track = await this.trackRepository.findById(dto.trackId);
    if (!track) {
      throw new HttpException('Track Not Found', HttpStatus.NOT_FOUND);
    }

    const comment = await this.commentService.create(dto);
    track.comments.push(comment);
    await track.save();

    return track;
  }

  getFile(name: string) {
    return this.fileService.getFileStream(name);
  }
}
