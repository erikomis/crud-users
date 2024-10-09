import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  create(user: UserEntity): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id },
    });
  }
  update(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }
  delete(id: number): Promise<void> {
    this.userRepository.delete(id);
    return;
  }
  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
