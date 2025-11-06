import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

/**
 * Call this hook inside pages that must require authentication.
 * If user is not logged in, it will redirect to /login.
 */
export default function useProtectedRoute() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) navigate('/login', { replace: true, state: { from: location } });
  }, [token, navigate, location]);
}
