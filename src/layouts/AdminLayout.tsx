import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout: React.FC = () => {
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
              <span className="ml-2 bg-dark-900 text-white text-xs px-2 py-1 rounded">Admin</span>
            </div>
            <div>
              <Link to="/" className="text-dark hover:text-primary mr-4">
                View Site
              </Link>
              <button className="bg-primary text-white px-4 py-2 rounded-md">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-grow flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-[#e0e0e0] p-6">
          <h2 className="text-xl font-bold text-dark mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <Link to="/admin" className="block py-2 px-4 rounded-md bg-primary-50 text-primary font-medium">
              Dashboard
            </Link>
            <Link to="/admin/products" className="block py-2 px-4 rounded-md text-dark hover:bg-primary-50 hover:text-primary">
              Products
            </Link>
            <Link to="/admin/orders" className="block py-2 px-4 rounded-md text-dark hover:bg-primary-50 hover:text-primary">
              Orders
            </Link>
            <Link to="/admin/users" className="block py-2 px-4 rounded-md text-dark hover:bg-primary-50 hover:text-primary">
              Users
            </Link>
            <Link to="/admin/settings" className="block py-2 px-4 rounded-md text-dark hover:bg-primary-50 hover:text-primary">
              Settings
            </Link>
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
            &copy; {new Date().getFullYear()} Artisan Gift Express. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout; 