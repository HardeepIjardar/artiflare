import React from 'react';

const ProductsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Browse All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Product cards will go here */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-40 bg-sage-100 rounded-md mb-4"></div>
          <h3 className="font-bold text-dark">Handcrafted Wooden Planter</h3>
          <p className="text-dark-500 text-sm mt-1">by Emma's Crafts</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-primary font-bold">$34.99</span>
            <button className="bg-primary text-white px-3 py-1 rounded text-sm">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-40 bg-sage-100 rounded-md mb-4"></div>
          <h3 className="font-bold text-dark">Custom Embroidered Pillow</h3>
          <p className="text-dark-500 text-sm mt-1">by Paper & Petals</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-primary font-bold">$29.99</span>
            <button className="bg-primary text-white px-3 py-1 rounded text-sm">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-40 bg-sage-100 rounded-md mb-4"></div>
          <h3 className="font-bold text-dark">Artisan Scented Candle Set</h3>
          <p className="text-dark-500 text-sm mt-1">by Woodwork Wonders</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-primary font-bold">$24.99</span>
            <button className="bg-primary text-white px-3 py-1 rounded text-sm">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 