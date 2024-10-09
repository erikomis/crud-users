import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateLogUseCase } from './usecase/create-log.usecase';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly createLogUseCase: CreateLogUseCase) {}

  @MessagePattern('my-kafka-consumer')
  async consume(@Payload() message) {
    console.log('Mensagem recebida:', message);
    // Chama o caso de uso para criar o log
    return await this.createLogUseCase.execute(message);
  }
}
