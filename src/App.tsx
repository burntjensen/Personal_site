import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import { useAuthStore } from './store/authStore';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{element}</>;
};

function App() {
  // Hydrate auth from localStorage on initial load
  const { isAuthenticated } = useAuthStore();

  // Log authentication status
  useEffect(() => {
    console.log('Authentication status:', isAuthenticated ? 'Authenticated' : 'Not authenticated');
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route 
          path="/admin/projects" 
          element={
            <ProtectedRoute element={<AdminProjectsPage />} />
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;