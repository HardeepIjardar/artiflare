import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { getProductById, Product } from '../../data/products';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, updateQuantity: updateCartQuantity, cartItems, removeFromCart } = useCart();
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct || null);
      // Check if product is in cart and show quantity selector if it is
      if (foundProduct && cartItems.some(item => item.id === foundProduct.id)) {
        setShowQuantitySelector(true);
        const cartItem = cartItems.find(item => item.id === foundProduct.id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      }
    }
    setLoading(false);
  }, [id, cartItems]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      artisan: product.artisan,
      customization: customization || undefined,
      image: product.image
    });

    setShowQuantitySelector(true);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartQuantity(product!.id, newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity <= 1) {
      removeFromCart(product!.id);
      setShowQuantitySelector(false);
      setQuantity(1);
      return;
    }
    
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateCartQuantity(product!.id, newQuantity);
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-xl font-medium text-dark mb-2">Product not found</h2>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-block bg-primary hover:bg-primary-700 text-white font-bold py-2 px-6 rounded"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="h-64 md:h-full bg-sage-100 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold text-dark">{product.name}</h1>
            <p className="text-dark-500 text-sm mt-1">by {product.artisan}</p>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-dark-500 text-sm">{product.rating}.0 ({product.reviews} reviews)</span>
            </div>
            <p className="text-primary text-2xl font-bold mt-4">${product.price.toFixed(2)}</p>
            <div className="mt-4">
              <h3 className="text-dark font-medium">Description</h3>
              <p className="text-dark-500 mt-2">
                {product.description}
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
                  value={customization}
                  onChange={(e) => setCustomization(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              {showQuantitySelector ? (
                <div className="flex items-center space-x-2">
                  <button
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    onClick={decrementQuantity}
                  >
                    <span>−</span>
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    onClick={incrementQuantity}
                  >
                    <span>+</span>
                  </button>
                </div>
              ) : (
                <button 
                  className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300 flex-grow"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 