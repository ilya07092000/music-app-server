import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  save(file: Express.Multer.File) {
    let fileName: string;

    if ('originalname' in file) {
      fileName = `${uuidv4()}-${file.originalname}`;
    } else {
      fileName = uuidv4();
    }

    const filePath = join(__dirname, '..', 'static');
    if (!existsSync(filePath)) {
      mkdirSync(filePath, { recursive: true });
    }

    writeFileSync(join(filePath, fileName), file.buffer);

    return fileName;
  }
}
