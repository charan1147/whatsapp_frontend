import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function ContactList() {
  const { user, handleAddContact, handleLogout } = useContext(AuthContext);
  const [contactEmail, setContactEmail] = useState('');

  console.log('ContactList user:', user);
  console.log('ContactList contacts:', user?.contacts);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddContact(contactEmail);
    setContactEmail('');
  };

  if (!user) {
    return <p>Please log in to view contacts.</p>;
  }

  return (
    <div>
      <h2>Contacts</h2>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Add contact by email"
          required
        />
        <button type="submit">Add Contact</button>
      </form>
      {user.contacts && user.contacts.length > 0 ? (
        <ul>
          {user.contacts.map((contact) => (
            <li key={contact._id}>
              <Link to={`/chat/${contact._id}`}>{contact.email}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
}
export default ContactList