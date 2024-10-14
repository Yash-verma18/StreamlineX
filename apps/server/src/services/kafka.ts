import { Kafka, Producer } from 'kafkajs';
import fs from 'fs';
import path from 'path';
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

export async function produceMessage(message: string) {
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
