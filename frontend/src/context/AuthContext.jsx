import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
      return { ...state, token: action.payload.token, role: action.payload.role, isAuthenticated: true };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return { ...state, token: null, role: null, isAuthenticated: false };
    case 'SET_AUTH':
      return { ...state, token: action.payload.token, role: action.payload.role, isAuthenticated: !!action.payload.token };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { token: null, role: null, isAuthenticated: false });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      dispatch({ type: 'SET_AUTH', payload: { token, role } });
    }
  }, []);

  const login = (token, role) => dispatch({ type: 'LOGIN', payload: { token, role } });

  const logout = () => dispatch({ type: 'LOGOUT' });

  const value = { ...state, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

