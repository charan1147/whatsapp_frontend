import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import ContactList from '../components/ContactList.jsx';

function Home() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>WhatsApp Clone</h1>
      {user ? (
        <ContactList />
      ) : (
        <p>Welcome! Please log in or register to start chatting.</p>
      )}
    </div>
  );
}

export default Home