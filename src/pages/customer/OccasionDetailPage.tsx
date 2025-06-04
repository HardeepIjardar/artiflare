import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { getProducts, Product, getUserData } from '../../services/firestore';
import ProductCard from '../../components/ProductCard';

const OccasionDetailPage: React.FC = () => {
  const { occasion } = useParams<{ occasion: string }>();
  const { addToCart, updateQuantity: updateCartQuantity, cartItems, removeFromCart } = useCart();
  const [showQuantitySelector, setShowQuantitySelector] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artisanNames, setArtisanNames] = useState<{ [key: string]: string }>({});
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products, error } = await getProducts();
        if (error) {
          setError(error);
        } else {
          setProducts(products);
          // Fetch artisan names for all products
          const uniqueArtisanIds = Array.from(new Set(products.map(p => p.artisanId)));
          const namesMap: { [key: string]: string } = {};
          await Promise.all(uniqueArtisanIds.map(async (artisanId) => {
            try {
              const userData = await getUserData(artisanId);
              if (userData) {
                namesMap[artisanId] = userData.companyName || userData.displayName || 'Artisan';
              }
            } catch (err) {
              namesMap[artisanId] = 'Artisan';
            }
          }));
          setArtisanNames(namesMap);
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

  // Filter products by occasion
  const occasionProducts = products.filter(product => 
    product.occasion?.toLowerCase() === occasion?.toLowerCase()
  );

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
      <h1 className="text-2xl font-bold text-dark mb-6 capitalize">
        {occasion} Gifts
      </h1>
      
      {occasionProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-medium text-dark mb-2">No products found</h2>
          <p className="text-dark-500 mb-6">We couldn't find any products for this occasion.</p>
          <Link 
            to="/products" 
            className="inline-block bg-primary hover:bg-primary-700 text-white font-bold py-2 px-6 rounded"
          >
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {occasionProducts.map(product => {
            const inCart = cartItems.some(item => item.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                artisanName={artisanNames[product.artisanId] || 'Artisan'}
                inCart={inCart}
                quantity={quantities[product.id] || 1}
                showQuantitySelector={!!showQuantitySelector[product.id]}
                onAddToCart={handleAddToCartClick}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OccasionDetailPage; 