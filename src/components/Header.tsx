import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const { currentUser } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              ArtiFlare
            </Link>
            <nav className="ml-10 space-x-8 hidden md:flex">
              <Link to="/" className="text-dark-500 hover:text-dark">
                Home
              </Link>
              <Link to="/products" className="text-dark-500 hover:text-dark">
                Products
              </Link>
              <Link to="/artisans" className="text-dark-500 hover:text-dark">
                Artisans
              </Link>
              <Link to="/about" className="text-dark-500 hover:text-dark">
                About Us
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <Link to="/cart" className="text-dark-500 hover:text-dark mr-6 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            {currentUser ? (
              <Link to="/account" className="text-dark-500 hover:text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            ) : (
              <Link to="/login" className="text-dark-500 hover:text-dark">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 