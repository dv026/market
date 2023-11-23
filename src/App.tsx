import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const socket = io('http://localhost:3000');

socket.on('new_message_server', (data) => {
  console.log(data);
});

function App() {
  const [notifications, setNotifications] = useState<string[]>([]);
  useEffect(() => {
    socket.on('notification_new_request', (data) => {
      setNotifications((p) => p.concat(data));
    });
  }, []);
  return (
    <div>
      <div style={{ fontSize: '48px', marginBottom: '50px' }}>{notifications.length}</div>

      <div style={{ fontSize: '28px' }}>
        {notifications.map((n) => (
          <div>{n}</div>
        ))}
      </div>
      <button
        onClick={() => {
          socket.emit('new_message', {
            message: 'message 1'
          });
        }}>
        send message
      </button>
    </div>
  );
}

export default App;
