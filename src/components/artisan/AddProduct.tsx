import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { createProduct } from '../../services/firestore';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    discountedPrice: '',
    category: '',
    subcategory: '',
    inventory: '1',
    isCustomizable: false,
    tags: '',
    materials: '',
    occasion: '',
    // Images would be handled through a file upload component
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setForm(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('You must be logged in to add a product.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Create product in Firestore
      const productData = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        discountedPrice: form.discountedPrice ? parseFloat(form.discountedPrice) : undefined,
        category: form.category,
        subcategory: form.subcategory || undefined,
        artisanId: currentUser.uid,
        inventory: parseInt(form.inventory),
        isCustomizable: form.isCustomizable,
        tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        materials: form.materials.split(',').map(material => material.trim()).filter(material => material),
        occasion: form.occasion || undefined,
        // For this example, we'll use placeholder images
        images: [
          'https://placehold.co/600x400?text=Product+Image',
          'https://placehold.co/600x400?text=Product+Image+2'
        ],
        attributes: {
          // Additional product attributes
        }
      };
      
      const result = await createProduct(productData);
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        // Clear form
        setForm({
          name: '',
          description: '',
          price: '',
          discountedPrice: '',
          category: '',
          subcategory: '',
          inventory: '1',
          isCustomizable: false,
          tags: '',
          materials: '',
          occasion: ''
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md mb-6">
          <p className="text-green-700 text-sm">Product created successfully!</p>
          <button 
            onClick={() => setSuccess(false)}
            className="text-sm text-green-700 underline mt-2"
          >
            Add another product
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)*
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              value={form.price}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label htmlFor="discountedPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Discounted Price ($)
            </label>
            <input
              id="discountedPrice"
              name="discountedPrice"
              type="number"
              step="0.01"
              min="0"
              value={form.discountedPrice}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label htmlFor="inventory" className="block text-sm font-medium text-gray-700 mb-1">
              Inventory Quantity*
            </label>
            <input
              id="inventory"
              name="inventory"
              type="number"
              min="0"
              required
              value={form.inventory}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              id="category"
              name="category"
              required
              value={form.category}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Select Category</option>
              <option value="jewelry">Jewelry</option>
              <option value="home-decor">Home Decor</option>
              <option value="clothing">Clothing</option>
              <option value="art">Art</option>
              <option value="accessories">Accessories</option>
              <option value="ceramics">Ceramics</option>
              <option value="woodwork">Woodwork</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory
            </label>
            <input
              id="subcategory"
              name="subcategory"
              type="text"
              value={form.subcategory}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">
              Occasion
            </label>
            <select
              id="occasion"
              name="occasion"
              value={form.occasion}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Select Occasion (Optional)</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="christmas">Christmas</option>
              <option value="valentines">Valentine's Day</option>
              <option value="housewarming">Housewarming</option>
            </select>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={form.description}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={form.tags}
              onChange={handleChange}
              placeholder="handmade, unique, gift"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label htmlFor="materials" className="block text-sm font-medium text-gray-700 mb-1">
              Materials (comma separated)
            </label>
            <input
              id="materials"
              name="materials"
              type="text"
              value={form.materials}
              onChange={handleChange}
              placeholder="wood, metal, glass"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <input
                id="isCustomizable"
                name="isCustomizable"
                type="checkbox"
                checked={form.isCustomizable}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="isCustomizable" className="ml-2 block text-sm text-gray-700">
                This product can be customized
              </label>
            </div>
          </div>
        </div>
        
        {/* Image upload section would go here */}
        <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
          <p className="text-gray-500">
            Image uploading functionality would be implemented here
          </p>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {isLoading ? 'Creating Product...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct; 