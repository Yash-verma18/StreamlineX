// components/MessageGrid.tsx
import { MessageGridProps } from '../iterface';
import MessageBox from './MessageBox';
import { useEffect, useRef } from 'react';

const MessageGrid: React.FC<MessageGridProps> = ({ userMessages }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [userMessages]);

  return (
    <div className='grid h-full w-9/12 gap-4 bg-[#7D5599] m-10 p-10 rounded-xl overflow-y-scroll scrollbar-hide'>
      {userMessages.map((msg: any, index: any) => (
        <MessageBox
          key={index}
          text={msg.text}
          userType={msg.userType}
          isNew={index === userMessages.length - 1}
        />
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageGrid;
