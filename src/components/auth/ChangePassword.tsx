import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface ChangePasswordProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onSuccess, onError }) => {
  const { updatePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validate passwords
    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match');
      setIsLoading(false);
      return;
    }

    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const result = await updatePassword(form.newPassword);
      
      if (result.error) {
        setError(result.error);
        onError?.(result.error);
      } else {
        setForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        onSuccess?.();
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update password';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type={showCurrent ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-400 hover:text-primary focus:outline-none"
            tabIndex={-1}
            onClick={() => setShowCurrent((v) => !v)}
            aria-label={showCurrent ? 'Hide password' : 'Show password'}
          >
            {showCurrent ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="relative">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type={showNew ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-400 hover:text-primary focus:outline-none"
            tabIndex={-1}
            onClick={() => setShowNew((v) => !v)}
            aria-label={showNew ? 'Hide password' : 'Show password'}
          >
            {showNew ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="relative">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-400 hover:text-primary focus:outline-none"
            tabIndex={-1}
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword; 