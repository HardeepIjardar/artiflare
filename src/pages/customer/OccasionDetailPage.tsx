import React from 'react';
import { useParams } from 'react-router-dom';

const OccasionDetailPage: React.FC = () => {
  const { occasion } = useParams<{ occasion: string }>();
  
  // Early return with a loading state if occasion is undefined
  if (!occasion) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading...</div>
  }
  
  // Now occasion is guaranteed to be defined
  const occasionTitle = occasion.charAt(0).toUpperCase() + occasion.slice(1);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">
        {occasionTitle} Gifts
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product cards will go here */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-48 bg-sage-100"></div>
          <div className="p-4">
            <h3 className="font-bold text-dark">Custom Gift Box</h3>
            <p className="text-dark-500 text-sm mt-1">Personalized for your special one</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-primary font-bold">$39.99</span>
              <button className="bg-primary text-white px-3 py-1 rounded text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-48 bg-sage-100"></div>
          <div className="p-4">
            <h3 className="font-bold text-dark">Handmade Candle Set</h3>
            <p className="text-dark-500 text-sm mt-1">Artisan crafted with natural materials</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-primary font-bold">$24.99</span>
              <button className="bg-primary text-white px-3 py-1 rounded text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-48 bg-sage-100"></div>
          <div className="p-4">
            <h3 className="font-bold text-dark">Custom Photo Frame</h3>
            <p className="text-dark-500 text-sm mt-1">Preserve your cherished memories</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-primary font-bold">$29.99</span>
              <button className="bg-primary text-white px-3 py-1 rounded text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccasionDetailPage; 