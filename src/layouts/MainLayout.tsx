import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <header className="bg-white shadow-sm border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-3">
                {/* Logo would go here */}
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
            <div>
              <Link to="/login" className="border border-primary text-primary px-5 py-2 rounded-md hover:bg-primary hover:text-white transition duration-300">
                Sign In
              </Link>
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