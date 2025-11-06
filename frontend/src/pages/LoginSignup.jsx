import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import './auth.css'; // 👈 make sure you have the CSS file below in same folder

export default function LoginSignup() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') await login(email, password);
      else await signup(name, email, password);
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      // handled in context
    }
  };

  return (
    <div className="card auth-card">
      <h2>{mode === 'login' ? 'Login' : 'Sign up'}</h2>
      <form onSubmit={submit}>
        {mode === 'signup' && (
          <input
            className="name-animate"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn" disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign up'}
        </button>

        {error && <p className="error">{error}</p>}
      </form>

      <div className="muted">
        {mode === 'login' ? (
          <p>
            Don’t have an account?
            <button className="link" onClick={() => setMode('signup')}>
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?
            <button className="link" onClick={() => setMode('login')}>
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
