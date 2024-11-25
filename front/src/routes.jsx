import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/features/authentification/hooks/auth.hook.jsx';
import { AuthPage } from '@/features/authentification/auth.jsx';
import { NotesPage } from '@/features/notes/notes.jsx'; // Assurez-vous que ce composant existe

export const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      {isAuthenticated ? (
        <>
          <Route path="/notes" element={<NotesPage />} />
          <Route path="*" element={<Navigate to="/notes" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};
