import React from 'react';
import { useParams } from 'react-router-dom';
import { FaFile, FaFolder, FaDownload, FaShare, FaPlus } from 'react-icons/fa';

interface Resource {
  id: string;
  title: string;
  type: 'document' | 'folder' | 'link';
  category: string;
  size?: string;
  lastModified: Date;
  sharedBy: string;
  downloads?: number;
}

export const CommunityResources: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Community Guidelines',
      type: 'document',
      category: 'Documentation',
      size: '2.4 MB',
      lastModified: new Date(),
      sharedBy: 'Admin',
      downloads: 145
    },
    {
      id: '2',
      title: 'Event Planning Templates',
      type: 'folder',
      category: 'Templates',
      lastModified: new Date(),
      sharedBy: 'Event Team',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Resources</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
          <FaPlus className="mr-2" />
          Upload Resource
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="divide-y divide-gray-200">
          {resources.map((resource) => (
            <div key={resource.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {resource.type === 'folder' ? (
                    <FaFolder className="text-yellow-500 text-xl" />
                  ) : (
                    <FaFile className="text-blue-500 text-xl" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{resource.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>{resource.category}</span>
                      {resource.size && <span>{resource.size}</span>}
                      <span>Shared by {resource.sharedBy}</span>
                      <span>{resource.lastModified.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {resource.type === 'document' && (
                    <>
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <FaDownload />
                      </button>
                      <span className="text-sm text-gray-500">
                        {resource.downloads} downloads
                      </span>
                    </>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityResources; 