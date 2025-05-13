import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Checkout</h1>
      
      <div className="md:flex md:space-x-6">
        <div className="md:w-2/3">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-dark mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark-600 mb-1">Address</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1">City</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1">ZIP Code</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1">Phone</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-dark mb-4">Delivery Options</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <input
                  id="standard"
                  name="deliveryOption"
                  type="radio"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  defaultChecked
                />
                <label htmlFor="standard" className="ml-3 flex flex-col">
                  <span className="text-dark font-medium">Standard Delivery</span>
                  <span className="text-dark-500 text-sm">3-5 business days</span>
                </label>
                <span className="ml-auto text-dark">$5.99</span>
              </div>
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <input
                  id="express"
                  name="deliveryOption"
                  type="radio"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <label htmlFor="express" className="ml-3 flex flex-col">
                  <span className="text-dark font-medium">Express Delivery</span>
                  <span className="text-dark-500 text-sm">1-2 business days</span>
                </label>
                <span className="ml-auto text-dark">$12.99</span>
              </div>
              <div className="flex items-center p-4 border border-primary-200 bg-primary-50 rounded-lg">
                <input
                  id="sos"
                  name="deliveryOption"
                  type="radio"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <label htmlFor="sos" className="ml-3 flex flex-col">
                  <span className="text-dark font-medium">SOS Delivery</span>
                  <span className="text-primary text-sm">Delivered within 3 hours (select areas)</span>
                </label>
                <span className="ml-auto text-primary font-bold">$24.99</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-dark mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <input
                    id="card"
                    name="paymentMethod"
                    type="radio"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    defaultChecked
                  />
                  <label htmlFor="card" className="ml-3">
                    <span className="text-dark font-medium">Credit / Debit Card</span>
                  </label>
                </div>
                <div className="mt-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-dark-600 mb-1">Card Number</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="1234 1234 1234 1234"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-600 mb-1">Expiration Date</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="MM / YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-600 mb-1">CVC</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3 mt-6 md:mt-0">
          <div className="bg-white shadow rounded-lg p-6 sticky top-6">
            <h2 className="text-lg font-bold text-dark mb-4">Order Summary</h2>
            <div className="divide-y divide-gray-200">
              <div className="py-2 flex justify-between">
                <span className="text-dark-500">Products (2)</span>
                <span className="text-dark font-medium">$84.97</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-dark-500">Shipping</span>
                <span className="text-dark font-medium">$5.99</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-dark-500">Tax</span>
                <span className="text-dark font-medium">$6.80</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-dark font-bold">Total</span>
                <span className="text-primary font-bold">$97.76</span>
              </div>
            </div>
            <button className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded mt-6">
              Place Order
            </button>
            <Link 
              to="/cart" 
              className="w-full border border-dark-300 text-dark hover:bg-gray-50 font-medium py-2 px-4 rounded text-center block mt-4"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 