import { UserEntity } from '../entity/user.entity';

export interface UserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity>;
  update(user: UserEntity): Promise<UserEntity>;
  delete(id: number): Promise<void>;
  findAll(): Promise<UserEntity[]>;
}
