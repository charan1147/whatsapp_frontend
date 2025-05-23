import axios from 'axios';

const api = axios.create({
  baseURL: 'https://whatsapp-backend-3-cc0j.onrender.com/api',
  withCredentials: true, 
});

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const addContact = (email) => api.post('/auth/add-contact', { email });
export const sendMessage = (data) => api.post('/chat/send', data);
export const getMessages = (contactId) => api.get(`/chat/messages/${contactId}`);