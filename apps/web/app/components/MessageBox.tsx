import React from 'react';
import { MessageBoxProps } from '../iterface';

const MessageBox: React.FC<MessageBoxProps> = ({ text, isNew, userType }) => {
  const isReceiver = userType === 'receiver';

  return (
    <div className={`flex ${isReceiver ? 'justify-start' : 'justify-end '} `}>
      <div
        className={`
          inline-block text-xl p-2 rounded-lg
          ${isReceiver ? 'bg-[#66164e]' : 'bg-[#d1ace3]'}
          text-white font-bold shadow-lg inline-block
          ${isNew ? 'animate-bounceIn' : ''}
          transition-transform duration-300 ease-in-out h-10
        `}
      >
        <p className={`text-${isReceiver ? 'left' : 'right'}`}>{text}</p>
      </div>
    </div>
  );
};

export default MessageBox;
