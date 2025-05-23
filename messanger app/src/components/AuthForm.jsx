import { useState } from 'react';

function AuthForm({ onSubmit, buttonText, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Form submitted:', { email, password });
  onSubmit(email, password);
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">{buttonText}</button>
    </form>
  );
}
export default AuthForm