import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext.jsx';
import ContactList from './components/ContactList.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Register from './pages/Register.jsx';
import ChatPage from './pages/ChatPage.jsx';
import { useContext } from 'react';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat/:contactId" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}