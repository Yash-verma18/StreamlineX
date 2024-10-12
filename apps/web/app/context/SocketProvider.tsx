'use client';
import React from 'react';

const SocketContext = React.createContext(null);

interface SocketProviderProps {
  children?: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  return (
    <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
  );
};
