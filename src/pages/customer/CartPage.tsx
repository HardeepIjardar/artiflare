import React from 'react';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Your Cart</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/3 p-6">
            <div className="divide-y divide-gray-200">
              {/* Cart Item 1 */}
              <div className="py-4 flex">
                <div className="h-24 w-24 bg-sage-100 rounded-md flex-shrink-0"></div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-bold text-dark">Handcrafted Wooden Planter</h3>
                  <p className="text-dark-500 text-sm">by Emma's Crafts</p>
                  <div className="flex mt-2">
                    <p className="text-dark-600 text-sm">Engraving: "Happy Birthday"</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2">
                      <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
                        <span>-</span>
                      </button>
                      <span className="text-dark">1</span>
                      <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
                        <span>+</span>
                      </button>
                    </div>
                    <p className="text-primary font-bold">$34.99</p>
                  </div>
                </div>
                <button className="ml-4 text-dark-400 hover:text-dark-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Cart Item 2 */}
              <div className="py-4 flex">
                <div className="h-24 w-24 bg-sage-100 rounded-md flex-shrink-0"></div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-bold text-dark">Artisan Scented Candle Set</h3>
                  <p className="text-dark-500 text-sm">by Woodwork Wonders</p>
                  <div className="flex mt-2">
                    <p className="text-dark-600 text-sm">Scent: Lavender</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2">
                      <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
                        <span>-</span>
                      </button>
                      <span className="text-dark">2</span>
                      <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
                        <span>+</span>
                      </button>
                    </div>
                    <p className="text-primary font-bold">$49.98</p>
                  </div>
                </div>
                <button className="ml-4 text-dark-400 hover:text-dark-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3 bg-gray-50 p-6">
            <h2 className="text-lg font-bold text-dark mb-4">Order Summary</h2>
            <div className="divide-y divide-gray-200">
              <div className="py-2 flex justify-between">
                <span className="text-dark-500">Subtotal</span>
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
            <div className="mt-6">
              <Link 
                to="/checkout" 
                className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded text-center block"
              >
                Proceed to Checkout
              </Link>
              <Link 
                to="/products" 
                className="w-full border border-dark-300 text-dark hover:bg-gray-50 font-medium py-2 px-4 rounded text-center block mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 