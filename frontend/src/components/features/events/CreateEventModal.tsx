import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { EventFormData } from '../../../types/event';
import { createEvent } from '../../../services/eventService';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: EventFormData) => void;
  initialData?: EventFormData;
  mode?: 'create' | 'edit';
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = 'create'
}) => {
  const [formData, setFormData] = useState<EventFormData>(
    initialData || {
    title: '',
    description: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    category: '',
    capacity: 0,
    organizer: {
      name: '',
      role: ''
    },
    agenda: [],
    requirements: []
    }
  );
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  // Mock categories - replace with API call
  const [categories, setCategories] = useState([
    { id: '1', name: 'Cleanup', description: 'Environmental cleanup events' },
    { id: '2', name: 'Fundraising', description: 'Charity and fundraising events' },
    { id: '3', name: 'Sports', description: 'Sports and fitness events' },
    { id: '4', name: 'Education', description: 'Learning and workshops' },
    { id: '5', name: 'Social', description: 'Social gatherings' },
  ]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategoryItem = {
      id: String(categories.length + 1),
      ...newCategory
    };
    setCategories([...categories, newCategoryItem]);
    setFormData({ ...formData, category: newCategoryItem.name });
    setNewCategory({ name: '', description: '' });
    setShowCategoryModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await createEvent(formData);
        setFormData({
            title: '',
            description: '',
            date: '',
            time: '',
            endTime: '',
            location: '',
            category: '',
            capacity: 0,
            organizer: {
                name: '',
                role: ''
            },
            agenda: [],
            requirements: []
        });
        setImagePreview('');
        onClose();
    } catch (error) {
        console.error('Failed to create event:', error);
        // Add error handling/notification here
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            {mode === 'edit' ? 'Update Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

      <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Left Column */}
            <div className="col-span-1">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Image
                </label>
              <div className="mt-1 flex justify-center px-4 py-2 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="mb-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                        className="mx-auto h-20 w-20 object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                    <FaUpload className="mx-auto h-6 w-6 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => {
                    if (e.target.value === 'create_new') {
                      setShowCategoryModal(true);
                    } else {
                      setFormData({ ...formData, category: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                  <option disabled>──────────</option>
                  <option value="create_new">➕ Create New Category</option>
                </select>
              </div>
              </div>

            {/* Right Column */}
            <div className="col-span-2 space-y-3">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
            </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Location and Capacity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Organizer */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organizer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizer.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      organizer: { ...formData.organizer, name: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organizer Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizer.role}
                    onChange={(e) => setFormData({
                      ...formData,
                      organizer: { ...formData.organizer, role: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Agenda and Requirements */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Agenda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Agenda
              </label>
              <div className="space-y-2">
                {formData.agenda.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newAgenda = [...formData.agenda];
                        newAgenda[index] = e.target.value;
                        setFormData({ ...formData, agenda: newAgenda });
                      }}
                      placeholder={`${index + 1}. e.g., 9:00 AM - Registration`}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newAgenda = formData.agenda.filter((_, i) => i !== index);
                        setFormData({ ...formData, agenda: newAgenda });
                      }}
                      className="px-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    agenda: [...formData.agenda, '']
                  })}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  + Add Agenda Item
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What to Bring
              </label>
              <div className="space-y-2">
                {formData.requirements.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newRequirements = [...formData.requirements];
                        newRequirements[index] = e.target.value;
                        setFormData({ ...formData, requirements: newRequirements });
                      }}
                      placeholder={`${index + 1}. e.g., Comfortable clothes`}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newRequirements = formData.requirements.filter((_, i) => i !== index);
                        setFormData({ ...formData, requirements: newRequirements });
                      }}
                      className="px-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    requirements: [...formData.requirements, '']
                  })}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  + Add Required Item
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
            >
              {mode === 'edit' ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>

      {/* Category Creation Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-full max-w-md mx-4">
            {/* ... Category modal content remains the same ... */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEventModal; 