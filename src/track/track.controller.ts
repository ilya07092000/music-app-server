import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
  create() {
    return this.trackService.create();
  }

  @Put()
  update() {
    return this.trackService.update();
  }

  @Delete()
  deleteById() {
    return this.trackService.deleteById();
  }
}
