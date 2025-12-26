// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token'); // Ou votre logique d'auth

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}