import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../services/firestore';

interface ProductCardProps {
  product: Product;
  artisanName: string;
  inCart: boolean;
  quantity: number;
  showQuantitySelector: boolean;
  onAddToCart: (productId: string) => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  artisanName,
  inCart,
  quantity,
  showQuantitySelector,
  onAddToCart,
  onIncrement,
  onDecrement
}) => {
  const navigate = useNavigate();

  // Handler for card click (excluding cart controls)
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on a button or its children
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200 relative"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}`}
      onKeyDown={e => { if (e.key === 'Enter') handleCardClick(e as any); }}
    >
      <div>
        <div className="h-40 rounded-md mb-4 overflow-hidden">
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-bold text-dark">{product.name}</h3>
        <p className="text-dark-500 text-sm mt-1">by {artisanName}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
        {!showQuantitySelector ? (
          <button
            onClick={e => { e.stopPropagation(); onAddToCart(product.id); }}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={e => { e.stopPropagation(); onDecrement(product.id); }}
              className="bg-gray-200 text-dark px-2 py-1 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-dark">{quantity}</span>
            <button
              onClick={e => { e.stopPropagation(); onIncrement(product.id); }}
              className="bg-gray-200 text-dark px-2 py-1 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        )}
      </div>
      <button
        onClick={e => { e.stopPropagation(); navigate(`/products/${product.id}`); }}
        className="mt-4 w-full bg-secondary text-white py-2 rounded hover:bg-secondary-700 transition-colors duration-150"
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard; 