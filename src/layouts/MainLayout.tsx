import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

const MainLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close the profile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileMenuOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <header className="bg-white shadow-sm border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center mr-3">
                <Logo size={40} />
              </div>
              <Link to="/" className="text-lg font-bold text-primary">
                ArtiFlare
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-dark hover:text-primary">
                Home
              </Link>
              <Link to="/products" className="text-dark hover:text-primary">
                Browse
              </Link>
              <Link to="/occasions" className="text-dark hover:text-primary">
                Occasions
              </Link>
              <Link to="/how-it-works" className="text-dark hover:text-primary">
                How It Works
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="relative" ref={profileMenuRef}>
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  >
                    <FaUserCircle className="h-8 w-8 text-primary" />
                    {currentUser.displayName && (
                      <span className="ml-2 hidden md:block">{currentUser.displayName}</span>
                    )}
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/orders" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <Link 
                        to="/wishlist" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="border border-primary text-primary px-5 py-2 rounded-md hover:bg-primary hover:text-white transition duration-300">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-dark-900 py-4">
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          <p className="text-center text-sm text-white">
            &copy; {new Date().getFullYear()} ArtiFlare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 