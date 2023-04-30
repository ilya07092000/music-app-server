import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { FileSizeValidationPipe } from 'src/pipes/file-size.pipe';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.trackService.getById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  create(
    @Body() dto: CreateTrackDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileSizeValidationPipe({ maxSize: 100000000 }),
          new FileTypeValidator({ fileType: 'audio/mpeg' }),
        ],
      }),
    )
    audio: Express.Multer.File,
  ) {
    return this.trackService.create(dto, audio);
  }

  @Put()
  update() {
    return this.trackService.update();
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.trackService.deleteById(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

  @Get('/file/:name')
  getFile(
    @Res({ passthrough: true }) res: Response,
    @Param('name') name: string,
  ) {
    const fileStream = this.trackService.getFile(name);
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${name}"`,
    });
    fileStream.on('data', (chunk) => console.log(chunk));

    return new StreamableFile(fileStream);
  }
}
