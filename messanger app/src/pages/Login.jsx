import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import AuthForm from '../components/AuthForm.jsx';

function Login() {
  const { handleLogin, error, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('User logged in, navigating to /');
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <AuthForm onSubmit={handleLogin} buttonText="Login" error={error} />
    </div>
  );
}

export default Login