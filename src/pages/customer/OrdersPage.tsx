import React from 'react';
import { Link } from 'react-router-dom';

const OrdersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Your Orders</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-dark">Order #12345</h2>
              <p className="text-dark-500 text-sm">Placed on May 12, 2023</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-sage-100 text-sage-800 rounded-full text-sm font-medium">
                Delivered
              </span>
              <p className="text-dark-500 text-sm mt-1">Delivered on May 15, 2023</p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="md:flex">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="h-24 w-24 bg-sage-100 rounded-md"></div>
            </div>
            <div className="md:w-2/4">
              <h3 className="font-bold text-dark">Handcrafted Wooden Planter</h3>
              <p className="text-dark-500 text-sm">by Emma's Crafts</p>
              <p className="text-dark-600 text-sm mt-1">Engraving: "Happy Birthday"</p>
            </div>
            <div className="md:w-1/4 text-right">
              <p className="text-primary font-bold">$34.99</p>
              <p className="text-dark-500 text-sm">Qty: 1</p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 flex justify-end space-x-4">
          <Link 
            to="/orders/12345/tracking" 
            className="text-primary hover:text-primary-700 font-medium text-sm"
          >
            Track Order
          </Link>
          <button className="text-dark-600 hover:text-dark-800 font-medium text-sm">
            View Invoice
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-dark">Order #12344</h2>
              <p className="text-dark-500 text-sm">Placed on April 28, 2023</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                Processing
              </span>
              <p className="text-dark-500 text-sm mt-1">Estimated delivery: May 18, 2023</p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="md:flex">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="h-24 w-24 bg-sage-100 rounded-md"></div>
            </div>
            <div className="md:w-2/4">
              <h3 className="font-bold text-dark">Custom Embroidered Pillow</h3>
              <p className="text-dark-500 text-sm">by Paper & Petals</p>
              <p className="text-dark-600 text-sm mt-1">Custom design: "Home Sweet Home"</p>
            </div>
            <div className="md:w-1/4 text-right">
              <p className="text-primary font-bold">$29.99</p>
              <p className="text-dark-500 text-sm">Qty: 1</p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 flex justify-end space-x-4">
          <Link 
            to="/orders/12344/tracking" 
            className="text-primary hover:text-primary-700 font-medium text-sm"
          >
            Track Order
          </Link>
          <button className="text-dark-600 hover:text-dark-800 font-medium text-sm">
            View Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage; 