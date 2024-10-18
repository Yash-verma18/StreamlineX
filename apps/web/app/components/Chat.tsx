// pages/chat.tsx
import { useEffect, useState } from 'react';
import MessageGrid from '../components/MessageGrid';
import MessageInput from '../components/MessageInput';
import { useSocket } from '../context/SocketProvider';
import { Message } from '../iterface';

const Chat: React.FC = () => {
  const { sendMessage, messages } = useSocket();
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const updatedMessages: Message[] = [
        ...userMessages,
        { text: newMessage, userType: 'sender' },
      ];
      setUserMessages(updatedMessages);
      setNewMessage(''); // Clear input
      sendMessage({
        text: newMessage,
        userType: 'sender',
      });
    }
  };

  useEffect(() => {
    if (messages) {
      setUserMessages(messages);
    }
  }, [messages]);

  return (
    <div className='bg-[#020305] h-screen flex flex-col items-center justify-center'>
      <MessageGrid userMessages={userMessages} />
      <MessageInput
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSubmit={handleSendMessage}
      />
    </div>
  );
};

export default Chat;

/*
{ text: 'Hello!', userType: 'receiver' },
    { text: 'How are you?', userType: 'receiver' },
    {
      text: 'Welcome!',
      userType: 'sender',
    },
    {
      text: 'chat!',
      userType: 'sender',
    },
    {
      text: 'Welcome',
      userType: 'sender',
    },
  */
