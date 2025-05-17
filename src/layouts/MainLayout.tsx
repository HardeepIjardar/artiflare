import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Logo from '../components/Logo';

const MainLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [isHeroSearchVisible, setIsHeroSearchVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const isHomePage = location.pathname === '/';
  
  // Reference to the hero section search bar (for intersection observer)
  const heroSearchRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    // If not on the homepage, we should show the navbar search
    if (!isHomePage) {
      setIsHeroSearchVisible(false);
      return;
    }

    // Initialize with true since the hero section should be visible on initial load on homepage
    setIsHeroSearchVisible(true);

    // Find the hero section search bar after the component has mounted
    setTimeout(() => {
      heroSearchRef.current = document.querySelector('.hero-search-bar');
      
      if (heroSearchRef.current) {
        // Use Intersection Observer to detect when the hero search bar is visible
        const observer = new IntersectionObserver(
          (entries) => {
            // When the hero search becomes invisible (scrolled up), show the navbar search
            setIsHeroSearchVisible(entries[0].isIntersecting);
          },
          { threshold: 0.1 } // Trigger when 10% of the element is visible
        );

        observer.observe(heroSearchRef.current);

        return () => {
          if (heroSearchRef.current) {
            observer.unobserve(heroSearchRef.current);
          }
        };
      }
    }, 500); // Small delay to ensure DOM is ready
  }, [isHomePage, location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileMenuOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm border-b border-[#e0e0e0] transition-all duration-300">
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

            {/* Search Bar - Visible only when hero search is not visible */}
            {!isHeroSearchVisible && (
              <div className="hidden md:block flex-1 mx-8">
                <form onSubmit={handleSearch} className="max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Find a perfect gift..."
                      className="w-full px-6 py-3 rounded-full border border-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button 
                      type="submit" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <Link to="/cart" className="text-dark hover:text-primary relative">
                    <FaShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    )}
                  </Link>
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
                </>
              ) : (
                <>
                  <Link to="/cart" className="text-dark hover:text-primary relative mr-2">
                    <FaShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    )}
                  </Link>
                  <Link to="/login" className="border border-primary text-primary px-5 py-2 rounded-md hover:bg-primary hover:text-white transition duration-300">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow pt-20">
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