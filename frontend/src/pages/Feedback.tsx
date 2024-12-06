import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addToast } from '../store/slices/toastSlice';
import Button from '../components/common/Button';

interface FeedbackForm {
  type: 'feature' | 'bug' | 'improvement' | 'other';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export const Feedback: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FeedbackForm>({
    type: 'feature',
    title: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement API call to submit feedback
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      dispatch(addToast({
        type: 'success',
        message: 'Thank you for your feedback! We\'ll review it shortly.'
      }));
      
      setForm({
        type: 'feature',
        title: '',
        description: '',
        priority: 'medium'
      });
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        message: 'Failed to submit feedback. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Submit Feedback</h1>
        <p className="mt-2 text-gray-600">
          Help us improve CommUnity by sharing your ideas and suggestions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Feedback Type
          </label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as FeedbackForm['type'] })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          >
            <option value="feature">Feature Request</option>
            <option value="bug">Bug Report</option>
            <option value="improvement">Improvement Suggestion</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Brief summary of your feedback"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Please provide detailed information..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <div className="flex space-x-4">
            {['low', 'medium', 'high'].map((priority) => (
              <label key={priority} className="flex items-center">
                <input
                  type="radio"
                  value={priority}
                  checked={form.priority === priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value as FeedbackForm['priority'] })}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{priority}</span>
              </label>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </div>
  );
};

export default Feedback; 