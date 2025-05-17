import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Define type for cart items
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  artisan: string;
  customization?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const userId = currentUser?.uid || 'guest';

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${userId}`);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [userId]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
  }, [cartItems, userId]);

  // If user logs in, merge their guest cart with their user cart
  useEffect(() => {
    if (currentUser?.uid) {
      const guestCart = localStorage.getItem('cart_guest');
      const userCart = localStorage.getItem(`cart_${currentUser.uid}`);
      
      if (guestCart && (!userCart || userCart === '[]')) {
        setCartItems(JSON.parse(guestCart));
      } else if (guestCart && userCart && userCart !== '[]') {
        // Merge guest and user carts
        const guestItems = JSON.parse(guestCart);
        const userItems = JSON.parse(userCart);
        
        // Add guest items that aren't already in user cart
        const mergedItems = [...userItems];
        guestItems.forEach((guestItem: CartItem) => {
          const existingItem = mergedItems.find(item => item.id === guestItem.id);
          if (existingItem) {
            // Update quantity if item already exists
            existingItem.quantity += guestItem.quantity;
          } else {
            // Add new item
            mergedItems.push(guestItem);
          }
        });
        
        setCartItems(mergedItems);
        // Clear guest cart after merging
        localStorage.removeItem('cart_guest');
      }
    }
  }, [currentUser]);

  // Add an item to the cart
  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        // Add new item
        return [...prevItems, item];
      }
    });
  };

  // Remove an item from the cart
  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Update quantity of an item
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  // Calculate cart count
  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity, 
    0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext; 