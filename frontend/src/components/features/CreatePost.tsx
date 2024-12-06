import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { createPost } from '../../store/slices/postSlice';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await dispatch(createPost(content)).unwrap();
      setContent('');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          rows={3}
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            disabled={!content.trim()}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost; 