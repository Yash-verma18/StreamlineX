import React, { useState } from 'react';
import { signUp } from '../api/user';

const Signup = () => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    console.log('name', name);
    await signUp({ fullname: name });
  };

  return (
    <div className='h-screen w-screen  flex flex-col justify-center items-center gap-4'>
      <input
        className='h-10 p-9'
        placeholder='Enter your Name'
        name='name'
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Signup;
