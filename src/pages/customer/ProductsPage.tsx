import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { getProducts, getUserData, Product } from '../../services/firestore';
import ProductCard from '../../components/ProductCard';
import { db } from '../../services/firebase';

const ProductsPage: React.FC = () => {
  const { addToCart, updateQuantity: updateCartQuantity, cartItems, removeFromCart } = useCart();
  const [showQuantitySelector, setShowQuantitySelector] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artisanNames, setArtisanNames] = useState<{ [key: string]: string }>({});
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const fetchProductsAndArtisans = async () => {
      try {
        const { products, error } = await getProducts();
        if (error) {
          setError(error);
          // Debug log
          console.error('ProductsPage error:', error);
          // Log Firebase project ID
          // @ts-ignore
          console.log('Firebase project ID:', db.app.options.projectId);
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
        // Debug log
        console.error('ProductsPage catch error:', err);
        // @ts-ignore
        console.log('Firebase project ID:', db.app.options.projectId);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsAndArtisans();
  }, []);

  useEffect(() => {
    if (!filterOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

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

  // Filter products by all selected filters
  const filteredProducts = products
    .filter(product =>
      (!selectedOccasion || product.occasion?.toLowerCase() === selectedOccasion.toLowerCase()) &&
      (!selectedCategory || product.category?.toLowerCase() === selectedCategory.toLowerCase()) &&
      (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
      (!priceRange.max || product.price <= parseFloat(priceRange.max))
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.createdAt as any) - (a.createdAt as any);
      return 0;
    });

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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-dark mb-6">All Products</h1>
          <div className="relative">
            <button
              ref={filterBtnRef}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-700 focus:outline-none"
              onClick={() => setFilterOpen(v => !v)}
            >
              Filter
            </button>
            {filterOpen && (
              <div ref={filterRef} className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10 p-4">
                {/* X Close Button */}
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-lg font-bold focus:outline-none"
                  onClick={() => setFilterOpen(false)}
                  aria-label="Close filter"
                  type="button"
                >
                  ×
                </button>
                {/* Occasion Filter */}
                <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-2">
                  Occasion
                </label>
                <select
                  id="occasion"
                  value={selectedOccasion}
                  onChange={e => setSelectedOccasion(e.target.value)}
                  className="block w-full mb-4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                  <option value="">All Occasions</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="christmas">Christmas</option>
                  <option value="valentines">Valentine's Day</option>
                  <option value="housewarming">Housewarming</option>
                </select>
                {/* Category Filter */}
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="block w-full mb-4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                  <option value="">All Categories</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="home-decor">Home Decor</option>
                  <option value="clothing">Clothing</option>
                  <option value="art">Art</option>
                  <option value="accessories">Accessories</option>
                  <option value="ceramics">Ceramics</option>
                  <option value="woodwork">Woodwork</option>
                </select>
                {/* Price Range Filter */}
                <div className="flex items-center mb-4 gap-2">
                  <div className="flex-1">
                    <label htmlFor="min-price" className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                    <input
                      id="min-price"
                      type="number"
                      min="0"
                      value={priceRange.min}
                      onChange={e => setPriceRange(pr => ({ ...pr, min: e.target.value }))}
                      className="block w-full pl-2 pr-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                  <span className="mx-2 text-gray-500">-</span>
                  <div className="flex-1">
                    <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                    <input
                      id="max-price"
                      type="number"
                      min="0"
                      value={priceRange.max}
                      onChange={e => setPriceRange(pr => ({ ...pr, max: e.target.value }))}
                      className="block w-full pl-2 pr-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>
                {/* Sort By Filter */}
                <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="block w-full mb-2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                  <option value="">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
                {/* Reset Button */}
                <button
                  className="mt-4 w-full bg-gray-200 text-dark py-2 rounded hover:bg-gray-300 transition-colors duration-150"
                  onClick={() => {
                    setSelectedOccasion('');
                    setSelectedCategory('');
                    setPriceRange({ min: '', max: '' });
                    setSortBy('');
                  }}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
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