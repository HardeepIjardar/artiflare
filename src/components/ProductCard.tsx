import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Link to={`/products/${product.id}`}>
        <div className="h-40 rounded-md mb-4 overflow-hidden">
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-bold text-dark">{product.name}</h3>
        <p className="text-dark-500 text-sm mt-1">by {artisanName}</p>
      </Link>
      <div className="flex justify-between items-center mt-4">
        <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
        {!showQuantitySelector ? (
          <button
            onClick={() => onAddToCart(product.id)}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onDecrement(product.id)}
              className="bg-gray-200 text-dark px-2 py-1 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-dark">{quantity}</span>
            <button
              onClick={() => onIncrement(product.id)}
              className="bg-gray-200 text-dark px-2 py-1 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 