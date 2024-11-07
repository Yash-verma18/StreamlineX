import axios from 'axios';

interface SignUpData {
  fullname: string;
}

export const signUp = async (data: SignUpData) => {
  const res = await axios.post('http://localhost:8000/api', data);

  console.log('res', res);
};
