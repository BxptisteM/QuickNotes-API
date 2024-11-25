import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/features/authentification/hooks/auth.hook.jsx';
import { AuthPage } from '@/features/authentification/auth.jsx';

export const AppRoutes = () => {
  const { isAuthenticated, loading} = useAuth();

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage/>} />

      {isAuthenticated ? (
        <Route path="*" element={<Navigate to="/app" />} />
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};