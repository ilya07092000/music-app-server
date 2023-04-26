import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  async create() {
    return 'Created';
  }

  async getAll() {
    return 'Get All';
  }

  async getById(id: string) {
    return id;
  }

  async deleteById() {
    return 'deleted';
  }

  async update() {
    return 'updated';
  }
}
