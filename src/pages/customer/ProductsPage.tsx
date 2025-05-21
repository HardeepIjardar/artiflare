import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { getProducts, Product } from '../../services/firestore';

const ProductsPage: React.FC = () => {
  const { addToCart, updateQuantity: updateCartQuantity, cartItems, removeFromCart } = useCart();
  const [showQuantitySelector, setShowQuantitySelector] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products, error } = await getProducts();
        if (error) {
          setError(error);
        } else {
          setProducts(products);
        }
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  const handleAddToCartClick = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // First add 1 item to cart immediately
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      artisan: product.artisanId,
      image: product.images[0]
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
      // Remove from cart if quantity would be 0
      removeFromCart(productId);
      setShowQuantitySelector(prev => ({ ...prev, [productId]: false }));
      setQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[productId];
        return newQuantities;
      });
    } else {
      const newQuantity = currentQuantity - 1;
      setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
      updateCartQuantity(productId, newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-dark mb-6">All Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => {
          const inCart = cartItems.some(item => item.id === product.id);
          
          return (
            <div key={product.id} className="bg-white rounded-lg shadow p-6">
              <Link to={`/products/${product.id}`}>
                <div className="h-40 rounded-md mb-4 overflow-hidden">
                  <img 
                    src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder-product.jpg'} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-dark">{product.name}</h3>
                <p className="text-dark-500 text-sm mt-1">by {product.artisanId}</p>
              </Link>
              <div className="flex justify-between items-center mt-4">
                <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                
                {!showQuantitySelector[product.id] ? (
                  <button
                    onClick={() => handleAddToCartClick(product.id)}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-700"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementQuantity(product.id)}
                      className="bg-gray-200 text-dark px-2 py-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-dark">{quantities[product.id] || 1}</span>
                    <button
                      onClick={() => incrementQuantity(product.id)}
                      className="bg-gray-200 text-dark px-2 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
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