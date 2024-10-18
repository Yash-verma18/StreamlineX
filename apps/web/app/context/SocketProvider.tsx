'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ISocketContext, Message, SocketProviderProps } from '../iterface';

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error('state is undefined');

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessage] = useState<Message[]>([]);

  const sendMessage: ISocketContext['sendMessage'] = useCallback(
    (msg) => {
      if (socket) {
        socket.emit('event:message', msg);
      }
    },
    [socket]
  );

  const onMessageReceived = useCallback((msg: string) => {
    console.log('from server message received', msg);
    const { message } = JSON.parse(msg) as {
      message: Message;
    };
    setMessage((prev: Message[]) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = io('http://localhost:8000/');

    _socket.on('message', onMessageReceived);

    setSocket(_socket);

    return () => {
      _socket.disconnect();
      _socket.off('message', onMessageReceived);
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
