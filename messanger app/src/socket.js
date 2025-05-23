import { io } from 'socket.io-client';

const socket = io('https://whatsapp-backend-3-cc0j.onrender.com', {
  withCredentials: true,
  autoConnect: false,
});

export default socket;