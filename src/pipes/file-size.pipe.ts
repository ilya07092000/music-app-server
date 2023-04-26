import { Injectable, MaxFileSizeValidator } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe extends MaxFileSizeValidator {
  maxSize?: number;

  constructor(props: { maxSize: number } = { maxSize: 0 }) {
    super(props);
  }

  buildErrorMessage(): string {
    return `File Size less than ${this.validationOptions.maxSize / 1000000} MB`;
  }

  isValid(file: any): boolean {
    if (file.size > this.validationOptions.maxSize) {
      return false;
    }

    return true;
  }
}
