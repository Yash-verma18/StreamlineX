'use client';
import { useSocket } from './context/SocketProvider';
import classes from './page.module.css';
import { useState } from 'react';
export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('');
  return (
    <div>
      <div className={classes['message-container']}>
        <h1>All message will appear here</h1>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          className={classes['chat-input']}
          type='text'
          placeholder='Write your message'
        />
        <button
          className={classes['button']}
          onClick={() => {
            // console.log('send message', message);
            sendMessage(message);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
