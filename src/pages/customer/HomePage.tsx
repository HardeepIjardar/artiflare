import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBirthdayCake, FaWineGlassAlt, FaHeart, FaSeedling } from 'react-icons/fa';
import { getProducts, Product } from '../../services/firestore';
import { getUserData } from '../../services/firestore';
import { useCart } from '../../contexts/CartContext';
import ProductCard from '../../components/ProductCard';

// Hero Section with Search bar
const HeroSection = () => (
  <div className="px-4 sm:px-6 lg:px-8 mt-8">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden relative">
        <div className="bg-sage-500 bg-opacity-20 px-8 py-16 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-4">
            Handcrafted Gifts for Special Moments
          </h1>
          <p className="text-lg text-dark-500 mb-8">
            Local artisans. Custom gifts. Express delivery.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto hero-search-bar">
            <div className="relative">
              <input 
                type="text" 
                className="w-full px-6 py-3 rounded-full border border-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="Find a perfect gift..."
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Occasion Card Component
interface OccasionCardProps {
  title: string;
  link: string;
  icon: React.ReactNode;
}

const OccasionCard: React.FC<OccasionCardProps> = ({ title, link, icon }) => (
  <Link to={link} className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105">
    <div className="p-6 text-center">
      <div className="w-16 h-16 bg-sand-300 rounded-full mx-auto mb-4 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="font-bold text-dark">{title}</h3>
    </div>
  </Link>
);

// Occasions Section
const OccasionsSection = () => (
  <div className="px-4 sm:px-6 lg:px-8 mt-12">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-6">Browse by Occasion</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <OccasionCard 
          title="Birthday" 
          link="/occasions/birthday" 
          icon={<FaBirthdayCake size={32} />} 
        />
        <OccasionCard 
          title="Anniversary" 
          link="/occasions/anniversary" 
          icon={<FaHeart size={32} />} 
        />
        <OccasionCard 
          title="Date Night" 
          link="/occasions/date-night" 
          icon={<FaWineGlassAlt size={32} />} 
        />
        <OccasionCard 
          title="Just Because" 
          link="/occasions/just-because" 
          icon={<FaSeedling size={32} />} 
        />
      </div>
    </div>
  </div>
);

// SOS Gifts Section
const SOSGiftsSection = () => (
  <div className="px-4 sm:px-6 lg:px-8 mt-12">
    <div className="max-w-7xl mx-auto">
      <div className="bg-primary bg-opacity-10 rounded-lg p-6">
        <div className="md:flex justify-between items-start">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">SOS Gifts</h2>
            <p className="text-dark-600">Last-minute gifts delivered within hours</p>
          </div>
          <div className="bg-white border border-[#e0e0e0] rounded-lg p-4 md:w-96">
            <div className="flex">
              <div className="h-20 w-20 bg-sand-300 rounded flex-shrink-0"></div>
              <div className="ml-4 flex-grow">
                <h3 className="font-bold text-dark text-sm">Express Flower Bouquet</h3>
                <p className="text-dark-500 text-sm">Delivery in 3 hours</p>
                <p className="text-primary font-bold mt-2">$49</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Artisan Card Component
interface ArtisanCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  link: string;
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ name, rating, reviewCount, distance, link }) => (
  <Link to={link} className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
    <div className="p-6 text-center">
      <div className="w-20 h-20 bg-sand-100 rounded-full mx-auto mb-4"></div>
      <h3 className="font-bold text-dark mb-1">{name}</h3>
      <p className="text-dark-500 text-sm mb-1">
        ⭐️ {rating.toFixed(1)} ({reviewCount} reviews)
      </p>
      <p className="text-sage-500 text-sm">{distance}</p>
    </div>
  </Link>
);

// Featured Artisans Section
const FeaturedArtisansSection = () => (
  <div className="px-4 sm:px-6 lg:px-8 mt-12 mb-12">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-6">Featured Artisans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ArtisanCard 
          name="Emma's Crafts" 
          rating={4.9} 
          reviewCount={56} 
          distance="5 miles away" 
          link="/artisans/emmas-crafts" 
        />
        <ArtisanCard 
          name="Woodwork Wonders" 
          rating={4.7} 
          reviewCount={38} 
          distance="8 miles away" 
          link="/artisans/woodwork-wonders" 
        />
        <ArtisanCard 
          name="Paper & Petals" 
          rating={4.8} 
          reviewCount={42} 
          distance="3 miles away" 
          link="/artisans/paper-petals" 
        />
      </div>
    </div>
  </div>
);

// HomePage Component
const HomePage: React.FC = () => {
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
          // Fetch artisan names
          const uniqueArtisanIds = Array.from(new Set(products.map(p => p.artisanId)));
          const namesMap: { [key: string]: string } = {};
          await Promise.all(uniqueArtisanIds.map(async (artisanId) => {
            const userData = await getUserData(artisanId);
            if (userData) {
              namesMap[artisanId] = userData.companyName || userData.displayName || 'Artisan';
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

  return (
    <div>
      <HeroSection />
      <OccasionsSection />
      <SOSGiftsSection />
      {/* All Products Section */}
      <div className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-dark mb-6">All Products</h2>
          {loading ? (
            <div className="text-center">Loading products...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  artisanName={artisanNames[product.artisanId] || 'Artisan'}
                  inCart={!!cartItems.find(item => item.id === product.id)}
                  quantity={quantities[product.id] || 1}
                  showQuantitySelector={!!showQuantitySelector[product.id]}
                  onAddToCart={handleAddToCartClick}
                  onIncrement={incrementQuantity}
                  onDecrement={decrementQuantity}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <FeaturedArtisansSection />
    </div>
  );
};

export default HomePage; 