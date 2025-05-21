import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { getProducts, Product } from '../../services/firestore';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart, updateQuantity: updateCartQuantity, cartItems, removeFromCart } = useCart();
  const [showQuantitySelector, setShowQuantitySelector] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });

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

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = query === '' || 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);

    const matchesPrice = product.price >= priceRange.min && 
      product.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading search results...</div>
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
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-dark mb-4">Filters</h2>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-dark-700 mb-2">Categories</h3>
              <div className="space-y-2">
                {Array.from(new Set(products.map(p => p.category))).map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-dark-600">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-dark-700 mb-2">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-dark-500">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-dark mb-6">
            Search Results for "{query}"
            <span className="text-dark-500 text-lg font-normal ml-2">
              ({filteredProducts.length} products)
            </span>
          </h1>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-xl font-medium text-dark mb-2">No products found</h2>
              <p className="text-dark-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <Link 
                to="/products" 
                className="inline-block bg-primary hover:bg-primary-700 text-white font-bold py-2 px-6 rounded"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage; 