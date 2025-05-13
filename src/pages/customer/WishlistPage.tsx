import React from 'react';
import { Link } from 'react-router-dom';

const WishlistPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Your Wishlist</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Wishlist items */}
        <div className="bg-white rounded-lg shadow p-6 relative">
          <button className="absolute top-3 right-3 text-dark-400 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="h-40 bg-sage-100 rounded-md mb-4"></div>
          <h3 className="font-bold text-dark">Handcrafted Wooden Planter</h3>
          <p className="text-dark-500 text-sm mt-1">by Emma's Crafts</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-primary font-bold">$34.99</span>
            <Link to="/products/1" className="bg-primary text-white px-3 py-1 rounded text-sm">
              View Product
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 relative">
          <button className="absolute top-3 right-3 text-dark-400 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="h-40 bg-sage-100 rounded-md mb-4"></div>
          <h3 className="font-bold text-dark">Custom Embroidered Pillow</h3>
          <p className="text-dark-500 text-sm mt-1">by Paper & Petals</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-primary font-bold">$29.99</span>
            <Link to="/products/2" className="bg-primary text-white px-3 py-1 rounded text-sm">
              View Product
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 relative">
          <button className="absolute top-3 right-3 text-dark-400 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="h-40 bg-sage-100 rounded-md mb-4"></div>
          <h3 className="font-bold text-dark">Artisan Scented Candle Set</h3>
          <p className="text-dark-500 text-sm mt-1">by Woodwork Wonders</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-primary font-bold">$24.99</span>
            <Link to="/products/3" className="bg-primary text-white px-3 py-1 rounded text-sm">
              View Product
            </Link>
          </div>
        </div>
      </div>
      
      {/* Empty state */}
      {false && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-dark-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="mt-4 text-lg font-medium text-dark">Your wishlist is empty</h2>
          <p className="mt-2 text-dark-500">Browse our products and add your favorites to your wishlist</p>
          <Link to="/products" className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-md">
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage; 