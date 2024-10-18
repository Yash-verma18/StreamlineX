export interface Message {
  text: string;
  userType: 'sender' | 'receiver';
}

export interface ISocketContext {
  sendMessage: (MessageT) => any;
  messages: Message[];
}

export interface SocketProviderProps {
  children?: React.ReactNode;
}

export interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export interface MessageGridProps {
  userMessages: Message[];
}

export interface MessageBoxProps {
  text: string;
  userType: 'sender' | 'receiver';
  isNew?: boolean;
}
