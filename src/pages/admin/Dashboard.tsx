import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-dark mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-dark-500">Total Orders</h2>
              <p className="mt-1 text-xl font-bold text-dark">1,248</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/orders" className="text-primary text-sm font-medium hover:text-primary-700">
              View all orders &rarr;
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-dark-500">Total Revenue</h2>
              <p className="mt-1 text-xl font-bold text-dark">$48,295.70</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/reports" className="text-primary text-sm font-medium hover:text-primary-700">
              View reports &rarr;
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-dark-500">Total Users</h2>
              <p className="mt-1 text-xl font-bold text-dark">3,426</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/users" className="text-primary text-sm font-medium hover:text-primary-700">
              View all users &rarr;
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-dark-500">Total Products</h2>
              <p className="mt-1 text-xl font-bold text-dark">852</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/products" className="text-primary text-sm font-medium hover:text-primary-700">
              View all products &rarr;
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-dark">Recent Orders</h2>
            <Link to="/admin/orders" className="text-primary text-sm font-medium hover:text-primary-700">
              View all
            </Link>
          </div>
          
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark">#12345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">May 12, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">$34.99</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark">#12344</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">Jane Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">May 10, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Processing
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">$29.99</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark">#12343</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">Robert Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">May 5, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">$74.97</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-dark">Top Selling Products</h2>
            <Link to="/admin/products" className="text-primary text-sm font-medium hover:text-primary-700">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-sage-100 rounded-md"></div>
              <div className="ml-4 flex-grow">
                <div className="text-sm font-medium text-dark">Handcrafted Wooden Planter</div>
                <div className="text-sm text-dark-500">Emma's Crafts</div>
              </div>
              <div className="text-sm font-medium text-dark">123 sold</div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-sage-100 rounded-md"></div>
              <div className="ml-4 flex-grow">
                <div className="text-sm font-medium text-dark">Artisan Scented Candle Set</div>
                <div className="text-sm text-dark-500">Woodwork Wonders</div>
              </div>
              <div className="text-sm font-medium text-dark">98 sold</div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-sage-100 rounded-md"></div>
              <div className="ml-4 flex-grow">
                <div className="text-sm font-medium text-dark">Custom Embroidered Pillow</div>
                <div className="text-sm text-dark-500">Paper & Petals</div>
              </div>
              <div className="text-sm font-medium text-dark">87 sold</div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-sage-100 rounded-md"></div>
              <div className="ml-4 flex-grow">
                <div className="text-sm font-medium text-dark">Handwoven Basket</div>
                <div className="text-sm text-dark-500">Baskets & Beyond</div>
              </div>
              <div className="text-sm font-medium text-dark">75 sold</div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-sage-100 rounded-md"></div>
              <div className="ml-4 flex-grow">
                <div className="text-sm font-medium text-dark">Ceramic Mug Set</div>
                <div className="text-sm text-dark-500">Clay Creations</div>
              </div>
              <div className="text-sm font-medium text-dark">68 sold</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-dark">Recent Artisan Registrations</h2>
          <Link to="/admin/users" className="text-primary text-sm font-medium hover:text-primary-700">
            View all artisans
          </Link>
        </div>
        
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                  Shop Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                  Date Joined
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                  Products
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-sage-100"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-dark">Emma Johnson</div>
                      <div className="text-sm text-dark-500">emma@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">Emma's Crafts</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">May 10, 2023</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Approved
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">8 products</td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-sage-100"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-dark">Michael Chen</div>
                      <div className="text-sm text-dark-500">michael@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">Woodwork Wonders</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">May 8, 2023</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending Review
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">3 products</td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-sage-100"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-dark">Sarah Wilson</div>
                      <div className="text-sm text-dark-500">sarah@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">Paper & Petals</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">May 5, 2023</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Approved
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">12 products</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 