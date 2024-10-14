import { Server } from 'socket.io';
import Redis from 'ioredis';

import { produceMessage } from './kafka';
require('dotenv').config();

// for Publishing to Redis
const pub = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT as string),
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME,
});

const sub = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT as string),
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME,
});

class SocketService {
  private _io: Server;
  constructor() {
    console.log('Init Socket Service...');
    this._io = new Server({
      cors: {
        allowedHeaders: ['*'],
        origin: '*',
      },
    });

    sub.subscribe('MESSAGES');
  }

  public initListeners() {
    const io = this.io;
    console.log('Init Socket Listeners...');
    io.on('connect', (socket) => {
      console.log('New Socket Connected', socket.id);

      socket.on('event:message', async ({ message }: { message: string }) => {
        console.log('New Message Recieved', message);
        // publish this message to redis.
        await pub.publish(
          'MESSAGES',
          JSON.stringify({
            message,
          })
        );
      });
    });

    sub.on('message', async (channel, message) => {
      if (channel === 'MESSAGES') {
        console.log('Message Received', message);
        io.emit('message', message);

        // await prismaClient.message.create({
        //   data: {
        //     text: message,
        //   },
        // });

        await produceMessage(message);
        console.log('message produced to kafka broker');
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
