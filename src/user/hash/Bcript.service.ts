import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashService } from './hash';

@Injectable()
export class BcriptServiceImpl implements HashService {
  generate(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }
  compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
