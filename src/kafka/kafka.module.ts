import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaController } from './kafka.controller';
import { KafkaProducer } from './producer/kafka.producer';
import { CreateLogUseCase } from './usecase/create-log.usecase';
import { LogEntity } from './entity/log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRepositoryImpl } from './repository/log.repositoryImpl';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'my-kafka-client',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'my-kafka-consumer',
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([LogEntity]),
  ],
  controllers: [KafkaController],
  providers: [
    KafkaProducer,
    CreateLogUseCase,
    CreateLogUseCase,
    LogRepositoryImpl,
  ],
  exports: [KafkaProducer],
})
export class KafkaModule {}
