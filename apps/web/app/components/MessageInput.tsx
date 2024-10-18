// components/MessageInput.tsx

import { MessageInputProps } from '../iterface';

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  const handleSubmit = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (e.type === 'keypress' && (e as React.KeyboardEvent).key !== 'Enter') {
      return;
    }

    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
      submitButton.classList.add('animate-submit');
      setTimeout(() => {
        submitButton.classList.remove('animate-submit');
      }, 300);
    }

    onSubmit();
  };

  return (
    <div className='sticky mx-7 max-w-5xl w-full flex items-center justify-between bg-[#0e2037] p-4  mt-4 mb-4 shadow-lg border-[#FF501A] rounded-md border-4 border-dotted'>
      <input
        type='text'
        value={value}
        onChange={onChange}
        onKeyPress={handleSubmit}
        className='bg-transparent flex-grow text-lg px-4 outline-none -'
        placeholder='Type your message...'
      />
      <button
        id='submit-button'
        onClick={handleSubmit}
        className='w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center transition-transform duration-300'
      >
        ➤
      </button>
    </div>
  );
};

export default MessageInput;
