// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useCallback, useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import { useAuthStore } from '../../app/stores/auth-store';
// import { styles } from './home-page.styles';
// import { Link, useNavigate } from 'react-router-dom';
// import { useCreateItemStore } from '../../app/stores/create-item-store';
// import { purchaseApi } from '../../entities/purchase/api';
// import { CarModel } from '../../entities/purchase/model';
// import { Button, Table } from 'antd';
// import { ColumnsType } from 'antd/es/table';

// // const socket = io('https://payment-tg-bot.onrender.com');

// // socket.on('new_message_server', (data) => {
// //   console.log(data);
// // });

// export const HomePage = () => {
//   const [notifications, setNotifications] = useState<string[]>([]);
//   const { createItemStep } = useCreateItemStore((state) => state);
//   const [itemList, setItemList] = useState<CarModel[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // socket.on('notification_new_request', (data) => {
//     // setNotifications((p) => p.concat(data));
//     // });
//   }, []);

//   const { logout } = useAuthStore();

//   return (
//     <div css={styles.page}>
//       <Table columns={columns} dataSource={itemList} />;
//       <div style={{ fontSize: '48px', marginBottom: '50px' }}>{notifications.length}</div>
//       <div style={{ fontSize: '28px' }}>
//         {/* {notifications.map((n) => (
//           <div>{n}</div>
//         ))} */}
//       </div>
//       <button
//         onClick={() => {
//           // socket.emit('new_message', {
//           //   message: 'message 1'
//           // });
//         }}>
//         send message
//       </button>
//       <button onClick={() => logout()}>logout</button>
//     </div>
//   );
// };
