import React from 'react';

const ArtisanSettings: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark">Settings</h1>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-700">
          Save Changes
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-dark">Shop Information</h2>
          <p className="mt-1 text-sm text-dark-500">
            Update your shop details and how they appear to customers
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="shop-name" className="block text-sm font-medium text-dark">
              Shop Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="shop-name"
                id="shop-name"
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                defaultValue="Emma's Crafts"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-dark">
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={4}
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                defaultValue="Handcrafted wooden items and home decor made with sustainable materials and love."
              />
            </div>
            <p className="mt-2 text-sm text-dark-500">
              Brief description of your shop and the products you sell.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark">
              Shop Logo
            </label>
            <div className="mt-1 flex items-center">
              <span className="h-12 w-12 rounded-full overflow-hidden bg-sage-100">
                <svg className="h-full w-full text-sage-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <button
                type="button"
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-dark hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Change
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-dark">
              Primary Category
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option>Home & Living</option>
              <option>Jewelry</option>
              <option>Art</option>
              <option>Clothing</option>
              <option>Accessories</option>
              <option>Paper Goods</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-dark">Payment Information</h2>
          <p className="mt-1 text-sm text-dark-500">
            Update your payment details and payout preferences
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="bank-account" className="block text-sm font-medium text-dark">
              Bank Account
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="bank-account"
                id="bank-account"
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="••••••••1234"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="payout-schedule" className="block text-sm font-medium text-dark">
              Payout Schedule
            </label>
            <select
              id="payout-schedule"
              name="payout-schedule"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="automatic-payout"
                name="automatic-payout"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="automatic-payout" className="ml-2 block text-sm text-dark">
                Automatic payouts
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-dark">Shipping Settings</h2>
          <p className="mt-1 text-sm text-dark-500">
            Manage your shipping options and delivery methods
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="shipping-from" className="block text-sm font-medium text-dark">
              Shipping From
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="shipping-from"
                id="shipping-from"
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                defaultValue="New York, NY, United States"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark">
              Shipping Options
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="standard-shipping"
                  name="shipping-option"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="standard-shipping" className="ml-2 block text-sm text-dark">
                  Standard Shipping (3-5 business days)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="express-shipping"
                  name="shipping-option"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="express-shipping" className="ml-2 block text-sm text-dark">
                  Express Shipping (1-2 business days)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="international-shipping"
                  name="shipping-option"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="international-shipping" className="ml-2 block text-sm text-dark">
                  International Shipping
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-dark">Notification Preferences</h2>
          <p className="mt-1 text-sm text-dark-500">
            Choose how and when you'd like to be notified
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="new-order"
                  name="new-order"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="new-order" className="ml-2 block text-sm text-dark">
                  New order received
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="new-order-email"
                  name="new-order-email"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="new-order-email" className="block text-sm text-dark-500">
                  Email
                </label>
                <input
                  id="new-order-sms"
                  name="new-order-sms"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="new-order-sms" className="block text-sm text-dark-500">
                  SMS
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="order-shipped"
                  name="order-shipped"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="order-shipped" className="ml-2 block text-sm text-dark">
                  Order shipped
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="order-shipped-email"
                  name="order-shipped-email"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="order-shipped-email" className="block text-sm text-dark-500">
                  Email
                </label>
                <input
                  id="order-shipped-sms"
                  name="order-shipped-sms"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="order-shipped-sms" className="block text-sm text-dark-500">
                  SMS
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="payment-received"
                  name="payment-received"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="payment-received" className="ml-2 block text-sm text-dark">
                  Payment received
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="payment-received-email"
                  name="payment-received-email"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="payment-received-email" className="block text-sm text-dark-500">
                  Email
                </label>
                <input
                  id="payment-received-sms"
                  name="payment-received-sms"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="payment-received-sms" className="block text-sm text-dark-500">
                  SMS
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanSettings; 