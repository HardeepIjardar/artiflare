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
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col transition-all duration-200 hover:shadow-lg hover:border-primary focus-within:shadow-lg focus-within:border-primary group cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}`}
      onKeyDown={e => { if (e.key === 'Enter') handleCardClick(e as any); }}
    >
      <div className="relative mb-3">
        <div className="h-52 w-full rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100">
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="font-semibold text-dark text-base leading-tight truncate mb-1" title={product.name}>{product.name}</h3>
        <p className="text-dark-400 text-xs mb-2 truncate">by {artisanName}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-primary font-bold text-lg">${product.price.toFixed(2)}</span>
          {showQuantitySelector ? (
            <div className="flex items-center space-x-1 bg-gray-100 rounded px-2 py-1">
              <button
                onClick={e => { e.stopPropagation(); onDecrement(product.id); }}
                className="text-dark text-base px-2 focus:outline-none hover:text-primary"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-dark text-sm w-4 text-center">{quantity}</span>
              <button
                onClick={e => { e.stopPropagation(); onIncrement(product.id); }}
                className="text-dark text-base px-2 focus:outline-none hover:text-primary"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={e => { e.stopPropagation(); onAddToCart(product.id); }}
              className="bg-primary text-white font-medium px-3 py-1.5 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6h13" /></svg>
              Add to Cart
            </button>
          )}
        </div>
        <button
          onClick={e => { e.stopPropagation(); navigate(`/products/${product.id}`); }}
          className="w-full text-secondary font-medium py-1.5 rounded-lg hover:underline transition-colors text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 