import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) return null;  

  return (
    <header className="bg-white py-4 px-6 md:px-8 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-primary-700 hover:text-primary-800 transition-colors">
          Brent Jensen
        </Link>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/admin/projects">
                <Button 
                  variant="secondary" 
                  size="sm"
                  icon={<User size={16} />}
                >
                  Admin
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                icon={<LogOut size={16} />}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;