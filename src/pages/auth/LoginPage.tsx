import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GoogleLogin from '../../components/auth/GoogleLogin';
import PhoneLogin from '../../components/auth/PhoneLogin';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to home
  const from = (location.state as any)?.from?.pathname || '/';

  const getUserRole = async (user: User) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        return userDoc.data().role;
      }
      return 'customer'; // Default role if not found
    } catch (error) {
      console.error('Error fetching user role:', error);
      return 'customer'; // Default role on error
    }
  };

  const handleRedirect = async (user: User) => {
    const role = await getUserRole(user);
    if (role === 'artisan') {
      navigate('/artisan');
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.error) {
        setError(result.error);
      } else if (result.user) {
        await handleRedirect(result.user);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await googleLogin();
      
      if (result.error) {
        setError(result.error);
      } else if (result.user) {
        await handleRedirect(result.user);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLoginSuccess = async (user: User) => {
    await handleRedirect(user);
  };

  const handlePhoneLoginError = (errorMsg: string) => {
    setError(errorMsg);
  };

  const togglePhoneLogin = () => {
    setShowPhoneLogin(!showPhoneLogin);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row animate-fadeIn">
      {/* Left side - Form - Scrollable */}
      <div className="w-full md:w-1/2 min-h-screen flex items-start justify-center p-8 md:p-16 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-8">
          <div className="animate-slideDown">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to continue your creative journey
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-fadeIn">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          {!showPhoneLogin ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="transform transition duration-300 ease-in-out hover:translate-y-[-2px]">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out focus:shadow-md"
                    placeholder="name@example.com"
                  />
                </div>
                
                <div className="transform transition duration-300 ease-in-out hover:translate-y-[-2px]">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out focus:shadow-md"
                    placeholder="••••••••"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition duration-300 ease-in-out"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary-700 transition-colors duration-300">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>

              <div className="animate-fadeIn">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70 active:translate-y-[1px]"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8 space-y-6">
              <PhoneLogin
                onSuccess={handlePhoneLoginSuccess}
                onError={handlePhoneLoginError}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <button
                onClick={togglePhoneLogin}
                className="w-full text-center text-sm text-primary hover:text-primary-700 transition-colors duration-300"
              >
                Sign in with email instead
              </button>
            </div>
          )}

          <div className="mt-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-md active:translate-y-[1px] disabled:opacity-70"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={togglePhoneLogin}
                disabled={isLoading || showPhoneLogin}
                className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-md active:translate-y-[1px] disabled:opacity-70"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
                Phone Number
              </button>
            </div>
          </div>
          
          <p className="mt-6 text-center text-sm text-gray-600 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary-700 transition-colors duration-300 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      {/* Right side - Image/Banner - Fixed, non-scrollable */}
      <div className="hidden md:block md:w-1/2 bg-primary animate-slideRight fixed right-0 top-0 h-screen">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h3 className="text-2xl font-bold mb-4">Find Unique Handcrafted Items</h3>
            <p className="text-white/80">
              Connect with skilled artisans and discover one-of-a-kind creations
              that tell a story and bring beauty to your life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these keyframe animations to the component file
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideRight {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out forwards;
}

.animate-slideDown {
  animation: slideDown 0.5s ease-in-out forwards;
}

.animate-slideRight {
  animation: slideRight 0.5s ease-in-out forwards;
}
`;

// Add the style tag to the document
const styleTag = document.createElement('style');
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);

export default LoginPage; 