import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Logo from '../components/Logo';
import { useAuth } from '../contexts/AuthContext';
import { getUserData } from '../services/firestore';

const ArtisanLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [firestoreUser, setFirestoreUser] = useState<any>(null);

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid).then(data => setFirestoreUser(data));
    } else {
      setFirestoreUser(null);
    }
  }, [currentUser]);

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
            <div className="flex items-center">
              <div className="relative" ref={profileMenuRef}>
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <FaUserCircle className="h-8 w-8 text-primary" />
                  {firestoreUser?.displayName && (
                    <span className="ml-2 text-dark">{firestoreUser.displayName}</span>
                  )}
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <Link 
                      to="/" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Browse Products
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        // Add logout functionality here
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-grow flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-[#e0e0e0] p-6">
          <h2 className="text-xl font-bold text-dark mb-6">Artisan Dashboard</h2>
          <nav className="space-y-2">
            <NavLink 
              to="/artisan" 
              end
              className={({ isActive }) => 
                `block py-2 px-4 rounded-md transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary-50 text-primary font-medium' 
                    : 'text-dark hover:bg-primary-50 hover:text-primary'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/artisan/products" 
              className={({ isActive }) => 
                `block py-2 px-4 rounded-md transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary-50 text-primary font-medium' 
                    : 'text-dark hover:bg-primary-50 hover:text-primary'
                }`
              }
            >
              Products
            </NavLink>
            <NavLink 
              to="/artisan/orders" 
              className={({ isActive }) => 
                `block py-2 px-4 rounded-md transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary-50 text-primary font-medium' 
                    : 'text-dark hover:bg-primary-50 hover:text-primary'
                }`
              }
            >
              Orders
            </NavLink>
            <NavLink 
              to="/artisan/earnings" 
              className={({ isActive }) => 
                `block py-2 px-4 rounded-md transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary-50 text-primary font-medium' 
                    : 'text-dark hover:bg-primary-50 hover:text-primary'
                }`
              }
            >
              Earnings
            </NavLink>
            <NavLink 
              to="/artisan/settings" 
              className={({ isActive }) => 
                `block py-2 px-4 rounded-md transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary-50 text-primary font-medium' 
                    : 'text-dark hover:bg-primary-50 hover:text-primary'
                }`
              }
            >
              Settings
            </NavLink>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
      
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

export default ArtisanLayout; 