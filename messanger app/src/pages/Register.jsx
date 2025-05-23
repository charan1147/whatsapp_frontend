import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import AuthForm from '../components/AuthForm.jsx';

function Register() {
  const { handleRegister, error } = useContext(AuthContext);

  return (
    <div>
      <h1>Register</h1>
      <AuthForm onSubmit={handleRegister} buttonText="Register" error={error} />
    </div>
  );
}

export default Register