import React from 'react';

const WebProvContext = React.createContext(null);

interface WebProvIntef {
  children: React.ReactNode;
}

export const WebProv: React.FC<WebProvIntef> = ({ children }) => {
  return (
    <WebProvContext.Provider value={null}>{children}</WebProvContext.Provider>
  );
};
