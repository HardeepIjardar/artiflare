import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Your Profile</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="md:flex">
          <div className="md:w-1/3 p-6 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center text-primary text-2xl font-bold">
                JD
              </div>
              <h2 className="mt-4 text-xl font-bold text-dark">John Doe</h2>
              <p className="text-dark-500">john.doe@example.com</p>
              <p className="text-dark-500 mt-1">Member since May 2023</p>
              <button className="mt-4 bg-white text-primary border border-primary px-4 py-2 rounded-md hover:bg-primary-50">
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <h2 className="text-lg font-bold text-dark mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-dark-500">Full Name</h3>
                <p className="text-dark">John Doe</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark-500">Email Address</h3>
                <p className="text-dark">john.doe@example.com</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark-500">Phone Number</h3>
                <p className="text-dark">(555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark-500">Default Shipping Address</h3>
                <p className="text-dark">123 Main Street, Apt 4B</p>
                <p className="text-dark">New York, NY 10001</p>
                <p className="text-dark-500">United States</p>
                <Link to="/profile/addresses" className="text-primary text-sm hover:text-primary-700 mt-1 inline-block">
                  Manage Addresses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-dark">Recent Orders</h2>
            <Link to="/orders" className="text-primary hover:text-primary-700 text-sm font-medium">
              View All Orders
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-dark">#12345</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-dark">May 12, 2023</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-sage-100 text-sage-800">
                      Delivered
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-dark">$34.99</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <Link to="/orders/12345" className="text-primary hover:text-primary-700">
                      View
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-dark">#12344</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-dark">April 28, 2023</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                      Processing
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-dark">$29.99</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <Link to="/orders/12344" className="text-primary hover:text-primary-700">
                      View
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-bold text-dark mb-4">Account Settings</h2>
          <div className="space-y-4">
            <button className="text-dark hover:text-dark-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Change Password
            </button>
            <button className="text-dark hover:text-dark-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notification Preferences
            </button>
            <button className="text-primary hover:text-primary-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 