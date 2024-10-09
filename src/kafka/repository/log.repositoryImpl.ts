import { InjectRepository } from '@nestjs/typeorm';
import { LogEntity } from '../entity/log.entity';
import { LogRepository } from './log.repository';
import { Repository } from 'typeorm';

export class LogRepositoryImpl implements LogRepository {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logEntityRepository: Repository<LogEntity>,
  ) {}
  create(log: LogEntity): Promise<LogEntity> {
    const newLog = this.logEntityRepository.create({
      action: log.action,
      data: JSON.stringify(log),
    });
    return this.logEntityRepository.save(newLog);
  }
}
