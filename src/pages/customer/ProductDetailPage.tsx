import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="h-64 md:h-full bg-sage-100 flex items-center justify-center">
              <p className="text-dark-400">Product Image</p>
            </div>
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold text-dark">Handcrafted Wooden Planter</h1>
            <p className="text-dark-500 text-sm mt-1">by Emma's Crafts</p>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-dark-500 text-sm">4.0 (24 reviews)</span>
            </div>
            <p className="text-primary text-2xl font-bold mt-4">$34.99</p>
            <div className="mt-4">
              <h3 className="text-dark font-medium">Description</h3>
              <p className="text-dark-500 mt-2">
                Beautiful handcrafted wooden planter, perfect for small indoor plants.
                Made with sustainable materials and finished with non-toxic paint.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-dark font-medium">Customization</h3>
              <div className="mt-2">
                <label className="block text-sm font-medium text-dark-600">Engraving Text</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Add a personal message"
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <div className="w-24">
                <label className="block text-sm font-medium text-dark-600">Quantity</label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <button className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-6 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 