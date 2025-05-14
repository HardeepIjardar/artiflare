import { initializeApp } from 'firebase/app';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  deleteDoc,
  Timestamp,
  addDoc,
  DocumentData,
  QueryConstraint,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Type definitions
export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  phoneNumber?: string;
  role: 'customer' | 'artisan' | 'admin';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  address?: Address;
  bio?: string; // For artisans
  companyName?: string; // For artisans
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  artisanId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  inventory: number;
  attributes: Record<string, any>;
  tags: string[];
  isCustomizable: boolean;
  averageRating?: number;
  totalReviews?: number;
  occasion?: string;
  materials?: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingMethod: string;
  shippingCost: number;
  discount?: number;
  tax?: number;
  trackingNumber?: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  artisanId: string;
  image: string;
  customizations?: Record<string, any>;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  images?: string[];
  artisanResponse?: {
    response: string;
    createdAt: Timestamp;
  };
}

// User operations
export const createUser = async (uid: string, userData: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', uid);
    const timestamp = Timestamp.now();
    
    await setDoc(userRef, {
      ...userData,
      uid,
      role: userData.role || 'customer',
      createdAt: timestamp,
      updatedAt: timestamp
    });
    
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUserById = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { user: userSnap.data() as User, error: null };
    } else {
      return { user: null, error: 'User not found' };
    }
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
    
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUserData = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (error: any) {
    console.error('Error getting user data:', error);
    return { error: error.message };
  }
};

// Product operations
export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const productsRef = collection(db, 'products');
    const timestamp = serverTimestamp();
    
    const docRef = await addDoc(productsRef, {
      ...productData,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    
    // Update the document with its ID
    await updateDoc(docRef, { id: docRef.id });
    
    return { productId: docRef.id, error: null };
  } catch (error: any) {
    return { productId: null, error: error.message };
  }
};

export const getProductById = async (productId: string) => {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      return { product: productSnap.data() as Product, error: null };
    } else {
      return { product: null, error: 'Product not found' };
    }
  } catch (error: any) {
    return { product: null, error: error.message };
  }
};

export const updateProduct = async (productId: string, updates: Partial<Product>) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
    
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
    
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getProducts = async (
  constraints: QueryConstraint[] = [],
  limitCount: number = 20
) => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, ...constraints, limit(limitCount));
    const querySnapshot = await getDocs(q);
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data() as Product);
    });
    
    return { products, error: null };
  } catch (error: any) {
    return { products: [], error: error.message };
  }
};

export const getProductsByArtisan = async (artisanId: string) => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('artisanId', '==', artisanId));
    const querySnapshot = await getDocs(q);
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data() as Product);
    });
    
    return { products, error: null };
  } catch (error: any) {
    return { products: [], error: error.message };
  }
};

// Order operations
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const ordersRef = collection(db, 'orders');
    const timestamp = serverTimestamp();
    
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    
    // Update the document with its ID
    await updateDoc(docRef, { id: docRef.id });
    
    return { orderId: docRef.id, error: null };
  } catch (error: any) {
    return { orderId: null, error: error.message };
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);
    
    if (orderSnap.exists()) {
      return { order: orderSnap.data() as Order, error: null };
    } else {
      return { order: null, error: 'Order not found' };
    }
  } catch (error: any) {
    return { order: null, error: error.message };
  }
};

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: Timestamp.now()
    });
    
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as Order);
    });
    
    return { orders, error: null };
  } catch (error: any) {
    return { orders: [], error: error.message };
  }
};

export const getArtisanOrders = async (artisanId: string) => {
  try {
    const ordersRef = collection(db, 'orders');
    // This query structure assumes your order items have artisanId fields
    const q = query(
      ordersRef, 
      where('items.artisanId', 'array-contains', artisanId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as Order);
    });
    
    return { orders, error: null };
  } catch (error: any) {
    return { orders: [], error: error.message };
  }
};

// Review operations
export const createReview = async (reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const timestamp = serverTimestamp();
    
    const docRef = await addDoc(reviewsRef, {
      ...reviewData,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    
    // Update the document with its ID
    await updateDoc(docRef, { id: docRef.id });
    
    // Update product's average rating
    await updateProductRating(reviewData.productId);
    
    return { reviewId: docRef.id, error: null };
  } catch (error: any) {
    return { reviewId: null, error: error.message };
  }
};

export const getProductReviews = async (productId: string) => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef, 
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const reviews: Review[] = [];
    querySnapshot.forEach((doc) => {
      reviews.push(doc.data() as Review);
    });
    
    return { reviews, error: null };
  } catch (error: any) {
    return { reviews: [], error: error.message };
  }
};

export const addArtisanResponseToReview = async (reviewId: string, response: string) => {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewRef, {
      artisanResponse: {
        response,
        createdAt: Timestamp.now()
      },
      updatedAt: Timestamp.now()
    });
    
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Helper function to update product's average rating
const updateProductRating = async (productId: string) => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, where('productId', '==', productId));
    const querySnapshot = await getDocs(q);
    
    let totalRating = 0;
    let reviewCount = 0;
    
    querySnapshot.forEach((doc) => {
      const review = doc.data() as Review;
      totalRating += review.rating;
      reviewCount++;
    });
    
    const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;
    
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      averageRating,
      totalReviews: reviewCount,
      updatedAt: Timestamp.now()
    });
    
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}; 