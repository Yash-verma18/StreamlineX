import { Server } from 'socket.io';

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

      socket.on('event:message', async ({ message }: { message: string }) => {
        console.log('New Message Recieved', message);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
