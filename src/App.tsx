import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout components
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ArtisanLayout from './layouts/ArtisanLayout';

// Customer pages
import HomePage from './pages/customer/HomePage';
import ProductsPage from './pages/customer/ProductsPage';
import ProductDetailPage from './pages/customer/ProductDetailPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import OrdersPage from './pages/customer/OrdersPage';
import OrderTrackingPage from './pages/customer/OrderTrackingPage';
import ProfilePage from './pages/customer/ProfilePage';
import WishlistPage from './pages/customer/WishlistPage';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Artisan pages
import ArtisanDashboard from './pages/artisan/Dashboard';
import ArtisanProducts from './pages/artisan/Products';
import ArtisanOrders from './pages/artisan/Orders';
import ArtisanEarnings from './pages/artisan/Earnings';
import ArtisanSettings from './pages/artisan/Settings';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';

// Add new pages for design
import OccasionsPage from './pages/customer/OccasionsPage';
import OccasionDetailPage from './pages/customer/OccasionDetailPage';
import HowItWorksPage from './pages/customer/HowItWorksPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="occasions" element={<OccasionsPage />} />
            <Route path="occasions/:occasion" element={<OccasionDetailPage />} />
            <Route path="how-it-works" element={<HowItWorksPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Customer Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:id/tracking" element={<OrderTrackingPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="wishlist" element={<WishlistPage />} />
            </Route>
          </Route>

          {/* Artisan Routes - Protected with role */}
          <Route element={<ProtectedRoute allowedRoles={['artisan']} />}>
            <Route path="/artisan" element={<ArtisanLayout />}>
              <Route index element={<ArtisanDashboard />} />
              <Route path="products" element={<ArtisanProducts />} />
              <Route path="orders" element={<ArtisanOrders />} />
              <Route path="earnings" element={<ArtisanEarnings />} />
              <Route path="settings" element={<ArtisanSettings />} />
            </Route>
          </Route>

          {/* Admin Routes - Protected with role */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
