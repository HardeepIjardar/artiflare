import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../contexts/CartContext';

const ProductsPage: React.FC = () => {
  const { addToCart, updateQuantity: updateCartQuantity, cartItems, removeFromCart } = useCart();
  const [showQuantitySelector, setShowQuantitySelector] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  const handleAddToCartClick = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    // First add 1 item to cart immediately
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      artisan: product.artisan,
      image: product.image
    });
    
    // Show quantity selector for adjusting
    setShowQuantitySelector(prev => ({ ...prev, [productId]: true }));
    // Initialize quantity to 1
    setQuantities(prev => ({ ...prev, [productId]: 1 }));
  };

  const incrementQuantity = (productId: string) => {
    const newQuantity = (quantities[productId] || 1) + 1;
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
    
    // Directly update cart quantity
    updateCartQuantity(productId, newQuantity);
  };

  const decrementQuantity = (productId: string) => {
    const currentQuantity = quantities[productId] || 1;
    if (currentQuantity <= 1) {
      // Remove item from cart when quantity would be 0
      removeFromCart(productId);
      setShowQuantitySelector(prev => ({ ...prev, [productId]: false }));
      setQuantities(prev => ({ ...prev, [productId]: 1 }));
      return;
    }
    
    const newQuantity = currentQuantity - 1;
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
    
    // Directly update cart quantity
    updateCartQuantity(productId, newQuantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Browse All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PRODUCTS.map(product => {
          const inCart = cartItems.some(item => item.id === product.id);
          
          return (
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
                
                {inCart && showQuantitySelector[product.id] ? (
                  <div className="flex items-center space-x-1">
                    <button
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      onClick={() => decrementQuantity(product.id)}
                    >
                      <span>−</span>
                    </button>
                    <span className="mx-1 text-sm">{quantities[product.id] || 1}</span>
                    <button
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      onClick={() => incrementQuantity(product.id)}
                    >
                      <span>+</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    className="bg-primary hover:bg-primary-700 text-white px-3 py-1 rounded text-sm transition-colors duration-300"
                    onClick={() => handleAddToCartClick(product.id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage; 