import { Kafka, Producer } from 'kafkajs';
import fs from 'fs';
import path from 'path';
import prismaClient from './prisma';
require('dotenv').config();

const kafka_username = process.env.KAFKA_USERNAME as string;
const kafka_password = process.env.KAFKA_PASSWORD as string;
const kafka_broker = process.env.KAFKA_BROKER as string;

const kafka = new Kafka({
  brokers: [kafka_broker],
  ssl: {
    ca: [fs.readFileSync(path.resolve('./ca.pem'), 'utf-8')],
  },
  sasl: {
    username: kafka_username,
    password: kafka_password,
    mechanism: 'plain',
  },
});
let producer: null | Producer = null;

export async function createProducer() {
  if (producer) return producer;

  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;

  return producer;
}

export async function produceMessage(message: any) {
  const producer = await createProducer();

  await producer.send({
    messages: [
      {
        key: `message-${Date.now()}`,
        value: message,
      },
    ],
    topic: 'MESSAGES',
  });

  return true;
}

export async function startMessageConsumer() {
  const consumer = kafka.consumer({
    groupId: 'default',
  });

  await consumer.connect();

  await consumer.subscribe({ topic: 'MESSAGES', fromBeginning: true });

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      if (!message.value) return;
      console.log('New Message Recieved.. ');

      try {
        await prismaClient.message.create({
          data: {
            text: message.value?.toString(),
          },
        });
      } catch (error) {
        console.log('Something is wrong');
        pause();
        setTimeout(() => {
          consumer.resume([
            {
              topic: 'MESSAGES',
            },
          ]);
        }, 60 * 1000);
      }
    },
  });
}
