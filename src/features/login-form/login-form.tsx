import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../app/stores/auth-store';
import { toast } from 'react-toastify';

export const LoginForm = () => {
  const [login, setLogin] = useState('narek');
  const [password, setPassword] = useState('123');
  const { setUser } = useAuthStore();

  const handleSignIn = () => {
    if (login === 'narek' && password === '123') {
      setUser({
        login
      });
    } else {
      toast.error('Wow so easy!');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEnter);
    return () => {
      document.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  return (
    <div>
      <label>login</label>
      <Input value={login} onChange={(e) => setLogin(e.target.value)} />
      <label>password</label>
      <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
};
