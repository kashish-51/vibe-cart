import React, { createContext, useReducer, useEffect } from 'react';
import { authLogin, authSignup, setAuthToken } from '../api/api';

const initial = {
  user: (() => {
    try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
  })(),
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null
};

const AuthContext = createContext(initial);

function reducer(state, action){
  switch(action.type){
    case 'START': return { ...state, loading: true, error: null };
    case 'SUCCESS': return { ...state, loading: false, token: action.payload.token, user: action.payload.user };
    case 'FAIL': return { ...state, loading: false, error: action.payload };
    case 'LOGOUT': return { user: null, token: null, loading: false, error: null };
    default: return state;
  }
}

export function AuthProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(()=>{
    if (state.token){
      localStorage.setItem('token', state.token);
      setAuthToken(state.token);
    } else {
      localStorage.removeItem('token');
      setAuthToken(null);
    }
  }, [state.token]);

  useEffect(()=>{
    // keep user persisted in storage
    if (state.user) {
      try { localStorage.setItem('user', JSON.stringify(state.user)); } catch {}
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  const login = async (email, password) => {
    dispatch({ type: 'START' });
    try{
      const res = await authLogin({ email, password });
      dispatch({ type: 'SUCCESS', payload: { token: res.data.token, user: res.data.user } });
      return res.data;
    } catch(err){
      dispatch({ type: 'FAIL', payload: err?.response?.data?.error || err.message });
      throw err;
    }
  };

  const signup = async (name, email, password) => {
    dispatch({ type: 'START' });
    try{
      const res = await authSignup({ name, email, password });
      dispatch({ type: 'SUCCESS', payload: { token: res.data.token, user: res.data.user } });
      return res.data;
    } catch(err){
      dispatch({ type: 'FAIL', payload: err?.response?.data?.error || err.message });
      throw err;
    }
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ ...state, isAuthenticated: !!state.token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
