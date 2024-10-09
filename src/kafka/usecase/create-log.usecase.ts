import { Injectable } from '@nestjs/common';
import { LogEntity } from '../entity/log.entity';
import { LogRepositoryImpl } from '../repository/log.repositoryImpl';

@Injectable()
export class CreateLogUseCase {
  constructor(private logRepository: LogRepositoryImpl) {}

  async execute(log: LogEntity): Promise<LogEntity> {
    return await this.logRepository.create(log);
  }
}
