import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { getProductById, Product } from '../../services/firestore';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, updateQuantity: updateCartQuantity, cartItems, removeFromCart } = useCart();
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const { product, error } = await getProductById(id);
        if (error) {
          setError(error);
        } else if (product) {
          setProduct(product);
          // Check if product is in cart and show quantity selector if it is
          if (cartItems.some(item => item.id === product.id)) {
            setShowQuantitySelector(true);
            const cartItem = cartItems.find(item => item.id === product.id);
            if (cartItem) {
              setQuantity(cartItem.quantity);
            }
          }
        }
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, cartItems]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      artisan: product.artisanId,
      customization: customization || undefined,
      image: product.images[0]
    });

    setShowQuantitySelector(true);
  };

  const incrementQuantity = () => {
    if (!product) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartQuantity(product.id, newQuantity);
  };

  const decrementQuantity = () => {
    if (!product) return;
    if (quantity <= 1) {
      removeFromCart(product.id);
      setShowQuantitySelector(false);
      setQuantity(1);
    } else {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartQuantity(product.id, newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-500">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder-product.jpg'} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold text-dark mb-2">{product.name}</h1>
            <p className="text-dark-500 mb-4">by {product.artisanId}</p>
            
            <div className="mb-6">
              <p className="text-primary text-2xl font-bold">${product.price.toFixed(2)}</p>
              {product.discountedPrice && (
                <p className="text-dark-500 line-through">${product.discountedPrice.toFixed(2)}</p>
              )}
            </div>
            
            <p className="text-dark-600 mb-6">{product.description}</p>
            
            {product.isCustomizable && (
              <div className="mb-6">
                <label className="block text-dark-700 mb-2">Customization</label>
                <textarea
                  value={customization}
                  onChange={(e) => setCustomization(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add your customization details..."
                  rows={3}
                />
              </div>
            )}
            
            <div className="flex items-center space-x-4">
              {!showQuantitySelector ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-700"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={decrementQuantity}
                    className="bg-gray-200 text-dark px-2 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-dark">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="bg-gray-200 text-dark px-2 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-dark mb-2">Product Details</h2>
              <ul className="list-disc list-inside text-dark-600">
                <li>Category: {product.category}</li>
                {product.subcategory && <li>Subcategory: {product.subcategory}</li>}
                {product.materials && <li>Materials: {product.materials.join(', ')}</li>}
                {product.occasion && <li>Perfect for: {product.occasion}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 