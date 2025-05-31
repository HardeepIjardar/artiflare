import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { getProducts, getUserData, Product } from '../../services/firestore';
import ProductCard from '../../components/ProductCard';

const ProductsPage: React.FC = () => {
  const { addToCart, updateQuantity: updateCartQuantity, cartItems, removeFromCart } = useCart();
  const [showQuantitySelector, setShowQuantitySelector] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artisanNames, setArtisanNames] = useState<{ [key: string]: string }>({});
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  
  useEffect(() => {
    const fetchProductsAndArtisans = async () => {
      try {
        const { products, error } = await getProducts();
        if (error) {
          setError(error);
        } else {
          setProducts(products || []);
          // Fetch artisan names
          const uniqueArtisanIds = Array.from(new Set(products.map(p => p.artisanId)));
          const namesMap: { [key: string]: string } = {};
          await Promise.all(uniqueArtisanIds.map(async (artisanId) => {
            try {
              const userData = await getUserData(artisanId);
              if (userData) {
                namesMap[artisanId] = userData.companyName || userData.displayName || 'Artisan';
              }
            } catch (err) {
              console.error(`Error fetching artisan data for ${artisanId}:`, err);
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
    fetchProductsAndArtisans();
  }, []);

  const handleAddToCartClick = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      artisan: product.artisanId,
      image: product.images[0]
    });
    
    setShowQuantitySelector(prev => ({ ...prev, [productId]: true }));
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
  const filteredProducts = selectedOccasion
    ? products.filter(product => product.occasion?.toLowerCase() === selectedOccasion.toLowerCase())
    : products;

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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark mb-6">All Products</h1>
        
        {/* Occasion Filter */}
        <div className="mb-6">
          <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Occasion
          </label>
          <select
            id="occasion"
            value={selectedOccasion}
            onChange={(e) => setSelectedOccasion(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="">All Occasions</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="christmas">Christmas</option>
            <option value="valentines">Valentine's Day</option>
            <option value="housewarming">Housewarming</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            artisanName={artisanNames[product.artisanId] || 'Artisan'}
            inCart={cartItems.some(item => item.id === product.id)}
            quantity={quantities[product.id] || 1}
            showQuantitySelector={!!showQuantitySelector[product.id]}
            onAddToCart={handleAddToCartClick}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage; 