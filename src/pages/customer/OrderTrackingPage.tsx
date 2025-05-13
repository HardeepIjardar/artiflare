import React from 'react';
import { Link, useParams } from 'react-router-dom';

const OrderTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/orders" className="text-primary hover:text-primary-700 font-medium">
          &larr; Back to Orders
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-dark mb-2">Track Order #{id}</h1>
      <p className="text-dark-500 mb-6">Order placed on May 12, 2023</p>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-dark">Delivery Status</h2>
            <span className="px-3 py-1 bg-sage-100 text-sage-800 rounded-full text-sm font-medium">
              In Transit
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="relative">
            {/* Timeline */}
            <div className="absolute top-0 left-5 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="relative flex items-start mb-8">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-dark">Order Confirmed</h3>
                <p className="text-dark-500 text-sm">May 12, 2023 - 10:30 AM</p>
                <p className="text-dark-600 mt-1">Your order has been confirmed and is being processed.</p>
              </div>
            </div>
            
            <div className="relative flex items-start mb-8">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-dark">Order Processed</h3>
                <p className="text-dark-500 text-sm">May 13, 2023 - 2:15 PM</p>
                <p className="text-dark-600 mt-1">Your order has been processed and is ready for shipping.</p>
              </div>
            </div>
            
            <div className="relative flex items-start mb-8">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-dark">Order Shipped</h3>
                <p className="text-dark-500 text-sm">May 14, 2023 - 9:45 AM</p>
                <p className="text-dark-600 mt-1">Your order has been shipped with Express Delivery.</p>
                <p className="text-primary text-sm mt-1">Tracking ID: TRK7890123</p>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-dark-400">Delivered</h3>
                <p className="text-dark-400 text-sm">Estimated: May 16, 2023</p>
                <p className="text-dark-400 mt-1">Your order will be delivered to your address.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-dark">Delivery Information</h2>
        </div>
        
        <div className="p-6">
          <div className="md:flex">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h3 className="font-bold text-dark mb-2">Shipping Address</h3>
              <p className="text-dark-600">John Doe</p>
              <p className="text-dark-600">123 Main Street</p>
              <p className="text-dark-600">Apt 4B</p>
              <p className="text-dark-600">New York, NY 10001</p>
              <p className="text-dark-600">United States</p>
            </div>
            
            <div className="md:w-1/2">
              <h3 className="font-bold text-dark mb-2">Delivery Method</h3>
              <p className="text-dark-600">Express Delivery</p>
              <p className="text-dark-600">1-2 business days</p>
              <p className="text-primary mt-2">Estimated delivery: May 16, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage; 