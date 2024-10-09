import { LogEntity } from '../entity/log.entity';

export interface LogRepository {
  create(user: LogEntity): Promise<LogEntity>;
}
