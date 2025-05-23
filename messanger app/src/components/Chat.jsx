import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getMessages, sendMessage } from '../api.js';
import { AuthContext } from '../context/AuthContext.jsx';
import socket from '../socket.js';

function Chat() {
  const { contactId } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);

  const contact = user?.contacts?.find((c) => c._id === contactId);
  const contactEmail = contact ? contact.email : 'Unknown';

  useEffect(() => {
    console.log('Chat user.contacts:', user?.contacts);
    console.log('Chat contactId:', contactId);
    console.log('Chat contactEmail:', contactEmail);

    const fetchMessages = async () => {
      try {
        const res = await getMessages(contactId);
        console.log('Fetched messages:', res.data);
        setMessages(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load messages');
      }
    };
    fetchMessages();

    socket.on('message', (message) => {
      console.log('Received socket message:', message);
      if (message.sender === contactId || message.receiver === contactId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.off('message');
  }, [contactId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      setError(null);
      const message = await sendMessage({ receiver: contactId, content: newMessage });
      console.log('Sent message:', message.data);
      socket.emit('sendMessage', message.data);
      setNewMessage('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message');
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      {error && <p>{error}</p>}
      <div>
        {messages.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.sender === contactId ? contactEmail : 'You'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
export default Chat