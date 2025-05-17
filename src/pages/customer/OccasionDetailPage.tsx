import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByOccasion } from '../../data/products';
import { useCart } from '../../contexts/CartContext';

const OccasionDetailPage: React.FC = () => {
  const { occasion } = useParams<{ occasion: string }>();
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState<Record<string, boolean>>({});
  
  // Early return with a loading state if occasion is undefined
  if (!occasion) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading...</div>
  }
  
  // Now occasion is guaranteed to be defined
  const occasionTitle = occasion
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const occasionProducts = getProductsByOccasion(occasion);
  
  const handleAddToCart = (productId: string) => {
    const product = occasionProducts.find(p => p.id === productId);
    if (!product) return;
    
    // Add to cart with quantity 1
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      artisan: product.artisan,
      image: product.image
    });
    
    // Show added feedback
    setAddedProducts(prev => ({ ...prev, [productId]: true }));
    
    // Reset after 2 seconds
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [productId]: false }));
    }, 2000);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">
        {occasionTitle} Gifts
      </h1>
      
      {occasionProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-dark-500">No products found for this occasion.</p>
          <Link to="/products" className="text-primary hover:underline mt-2 inline-block">
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {occasionProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow p-6">
              <Link to={`/products/${product.id}`}>
                <div className="h-40 rounded-md mb-4 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-dark">{product.name}</h3>
                <p className="text-dark-500 text-sm mt-1">by {product.artisan}</p>
              </Link>
              <div className="flex justify-between items-center mt-4">
                <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                <button 
                  className={`${
                    addedProducts[product.id] 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-primary hover:bg-primary-700'
                  } text-white px-3 py-1 rounded text-sm transition-colors duration-300`}
                  onClick={() => handleAddToCart(product.id)}
                >
                  {addedProducts[product.id] ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OccasionDetailPage; 