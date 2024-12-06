import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCog, FaLock, FaUsers, FaTrash, FaPlus } from 'react-icons/fa';

interface Category {
  id: string;
  name: string;
  description?: string;
}

export const CommunitySettings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data - replace with API call
  const categories: Category[] = [
    { id: '1', name: 'Technology', description: 'Tech-related communities' },
    { id: '2', name: 'Health', description: 'Health and wellness' },
    { id: '3', name: 'Education', description: 'Learning and teaching' },
    { id: '4', name: 'Environment', description: 'Environmental causes' },
    { id: '5', name: 'Arts', description: 'Creative arts and culture' },
    { id: '6', name: 'Sports', description: 'Sports and athletics' },
    { id: '7', name: 'News', description: 'Current events and news' },
    { id: '8', name: 'Automotive', description: 'Cars and vehicles' }
  ];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'create_new') {
      setShowCategoryModal(true);
      // Reset select to previously selected value
      e.target.value = selectedCategory;
    } else {
      setSelectedCategory(value);
    }
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create category
    console.log('Creating category:', newCategory);
    
    // Mock adding the new category to the list
    const newCategoryId = (categories.length + 1).toString();
    categories.push({
      id: newCategoryId,
      name: newCategory.name,
      description: newCategory.description
    });
    
    // Select the newly created category
    setSelectedCategory(newCategoryId);
    
    // Reset and close modal
    setNewCategory({ name: '', description: '' });
    setShowCategoryModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Community Settings</h1>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaCog className="text-gray-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Community Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                <option disabled>──────────</option>
                <option value="create_new">➕ Create New Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaLock className="text-gray-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Community Visibility</h3>
                <p className="text-sm text-gray-500">Control who can see your community</p>
              </div>
              <select className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Member Approval</h3>
                <p className="text-sm text-gray-500">Require approval for new members</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white shadow rounded-lg p-6 border border-red-200">
          <div className="flex items-center mb-4">
            <FaTrash className="text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Danger Zone</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Delete Community</h3>
              <p className="text-sm text-gray-500 mb-4">
                Once you delete a community, there is no going back. Please be certain.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Delete Community
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Creation Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Create New Category</h3>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateCategory}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="e.g., Sports, News, Gaming"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Brief description of what this category represents..."
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
                  >
                    Create Category
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunitySettings; 