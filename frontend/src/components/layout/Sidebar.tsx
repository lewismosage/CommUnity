import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useSelector((state: { auth: { user: any } }) => state.auth);

  const getInitial = () => {
    if (user?.firstName) {
      return user.firstName[0].toUpperCase();
    }
    return "G";
  };

  const getFullName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return "Guest User";
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* User Section */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
              {getInitial()}
            </div>
            <div>
              <h2 className="font-semibold text-gray-800 text-sm">
                {getFullName()}
              </h2>
              <p className="text-xs text-gray-500">
                {user?.username || "guest"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-col h-[calc(100%-64px)]">
          {/* Navigation Links */}
          <nav className="flex-1 p-3 overflow-y-auto flex flex-col justify-between">
            {/* Main Links */}
            <div>
              <div className="space-y-1">
                <Link
                  to={user ? `/profile/${user.username}` : '/profile'}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Profile
                </Link>
                <Link
                  to="/my-communities"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  My Communities
                </Link>
                <Link
                  to="/communities/events"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Community Events
                </Link>
                <Link
                  to="/calendar"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Calendar
                </Link>
                <Link
                  to="/resources"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Resources
                </Link>
                <Link
                  to="/analytics"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Analytics
                </Link>
              </div>
            </div>

            {/* Settings Section - moved to bottom */}
            <div className="mt-auto">
              <div className="border-t border-gray-200 pt-4">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Settings and Support
                </h3>
                <div className="space-y-1">
                  <Link
                    to="/settings"
                    className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/about"
                    className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/whats-new"
                    className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg mb-3"
                  >
                    What's New
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-500">
              <p>Version 0.1</p>
              <p>© 2024 CommUnity</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
