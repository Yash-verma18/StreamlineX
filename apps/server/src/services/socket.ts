import { Server } from 'socket.io';
import prismaClient from './prisma';
require('dotenv').config();

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
  }

  public initListeners() {
    const io = this.io;
    console.log('Init Socket Listeners...');
    io.on('connect', (socket) => {
      console.log('New Socket Connected', socket.id);

      socket.on(
        'event:message',
        async (message: { text: string; userType: string }) => {
          console.log('New Message Recieved', message);
          await prismaClient.message.create({
            data: {
              text: message?.text,
            },
          });
          io.emit('event:message', message);
        }
      );
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
