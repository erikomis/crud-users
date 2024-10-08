import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEUserEntityRepository: Repository<UserEntity>,
  ) {}
  create(user: UserEntity): Promise<UserEntity> {
    const newUser = this.userEUserEntityRepository.create(user);
    return this.userEUserEntityRepository.save(newUser);
  }
  findByEmail(email: string): Promise<UserEntity> {
    return this.userEUserEntityRepository.findOne({ where: { email } });
  }
  findById(id: number): Promise<UserEntity> {
    return this.userEUserEntityRepository.findOne({
      where: { id },
    });
  }
  update(user: UserEntity): Promise<UserEntity> {
    return this.userEUserEntityRepository.save(user);
  }
  delete(id: number): Promise<void> {
    this.userEUserEntityRepository.delete(id);
    return;
  }
  findAll(): Promise<UserEntity[]> {
    return this.userEUserEntityRepository.find();
  }
}
