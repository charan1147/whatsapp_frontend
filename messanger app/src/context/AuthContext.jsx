import { createContext, useState, useEffect } from 'react';
import { login, register, addContact } from '../api.js';
import socket from '../socket.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5013/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && data.user) {
          console.log('Fetched user:', data.user);
          setUser(data.user);
          socket.connect();
        }
      } catch (err) {
        console.error('Fetch user error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      setError(null);
      console.log('Attempting login:', { email, password });
      const res = await login({ email, password });
      console.log('Login response:', res.data);
      setUser(res.data.user);
      socket.connect();
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      console.error('Login error:', err);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      setError(null);
      await register({ email, password });
      alert('Registration successful. Please log in.');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  const handleAddContact = async (email) => {
    try {
      setError(null);
      const res = await addContact(email);
      console.log('Add contact response:', res.data);
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add contact');
    }
  };

  const handleLogout = () => {
    setUser(null);
    socket.disconnect();
    fetch('http://localhost:5013/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  };

  return (
    <AuthContext.Provider value={{ user, error, loading, handleLogin, handleRegister, handleAddContact, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};