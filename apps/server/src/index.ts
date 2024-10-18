import http from 'http';
import SocketService from './services/socket';
import { startMessageConsumer } from './services/kafka';
async function init() {
  // startMessageConsumer();
  const httpServer = http.createServer();
  const socketService = new SocketService();
  const Port = process.env.PORT ? process.env.PORT : 8000;

  socketService.io.attach(httpServer);

  httpServer.listen(Port, () => {
    console.log(`Http Server started at port:${Port}`);
  });

  socketService.initListeners();
}

init();
