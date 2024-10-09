import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducer implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('my-kafka-consumer');
    await this.kafkaClient.connect();
  }

  async sendMessage(topic: string, message: any) {
    try {
      return this.kafkaClient.emit(topic, message);
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      throw error;
    }
  }
}
