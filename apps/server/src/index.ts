import http from 'http';
import express from 'express';
import cors from 'cors';
import SocketService from './services/socket';
import { startMessageConsumer } from './services/kafka';

import userRouter from './routes/user';
async function init() {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      allowedHeaders: ['*'],
      origin: '*',
    })
  );
  app.use('/api', userRouter);
  app.use(cors());
  // startMessageConsumer();
  const httpServer = http.createServer();
  const socketService = new SocketService();
  const Port = process.env.PORT ? process.env.PORT : 8000;

  socketService.io.attach(httpServer);

  // httpServer.listen(Port, () => {
  //   console.log(`Http Server started at port:${Port}`);
  // });
  app.listen(Port, () => {
    console.log(`Http Server started at port:${Port}`);
  });

  socketService.initListeners();
}

init();
