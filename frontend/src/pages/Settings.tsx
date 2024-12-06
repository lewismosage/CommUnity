import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { updateSettings, deleteAccount, fetchSettings, Settings as SettingsType } from '../store/slices/settingsSlice';
import { logout } from '../store/slices/authSlice';
import { addToast } from '../store/slices/toastSlice';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
}

interface NotificationType {
  id: 'email' | 'push';
  label: string;
}

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { settings, loading } = useAppSelector((state) => state.settings);
  const [activeSection, setActiveSection] = useState('account');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  const sections: SettingsSection[] = [
    {
      id: 'account',
      title: 'Account Settings',
      description: 'Manage your account settings and preferences'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Customize how CommUnity looks on your device'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Control your privacy settings and security preferences'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage how you receive notifications'
    },
    {
      id: 'location',
      title: 'Location Services',
      description: 'Control how CommUnity uses your location'
    }
  ];

  const themes: SettingsType['theme'][] = ['light', 'dark', 'system'];

  const notificationTypes: NotificationType[] = [
    { id: 'email', label: 'Email Notifications' },
    { id: 'push', label: 'Push Notifications' }
  ];

  const handleThemeChange = (theme: SettingsType['theme']) => {
    dispatch(updateSettings({ theme }));
  };

  const handleLocationChange = (enabled: boolean) => {
    dispatch(updateSettings({ location_sharing: enabled }));
  };

  const handleNotificationChange = (type: NotificationType['id'], enabled: boolean) => {
    dispatch(updateSettings({ [`${type}_notifications`]: enabled }));
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteAccount(deletePassword)).unwrap();
      dispatch(logout());
      dispatch(addToast({
        type: 'success',
        message: 'Your account has been deleted successfully'
      }));
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        message: 'Failed to delete account. Please check your password.'
      }));
    }
  };

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        {/* Sidebar */}
        <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`${
                  activeSection === section.id
                    ? 'bg-gray-50 text-primary-600'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <span className="truncate">{section.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
          {activeSection === 'account' && (
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Account Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your account settings and preferences
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Account Information</h4>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Email: {user?.email}</p>
                      <p>Username: {user?.username}</p>
                      <p>Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-red-600">Danger Zone</h4>
                    <div className="mt-2">
                      <Button
                        variant="danger"
                        onClick={() => setShowDeleteConfirm(true)}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Appearance</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Customize how CommUnity looks on your device
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Theme</label>
                    <div className="mt-2 space-x-4">
                      {themes.map((theme) => (
                        <button
                          key={theme}
                          onClick={() => handleThemeChange(theme)}
                          className={`${
                            settings?.theme === theme
                              ? 'bg-primary-100 text-primary-700'
                              : 'bg-white text-gray-700'
                          } px-4 py-2 rounded-md border`}
                        >
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Privacy & Security</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Control your privacy settings and security preferences
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        dispatch(updateSettings({ two_factor_enabled: !settings?.two_factor_enabled }));
                      }}
                    >
                      {settings?.two_factor_enabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage how you receive notifications
                  </p>
                </div>

                <div className="space-y-4">
                  {notificationTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{type.label}</h4>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(
                          type.id,
                          !settings?.[`${type.id}_notifications`]
                        )}
                        className={`${
                          settings?.[`${type.id}_notifications`]
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                      >
                        <span className="sr-only">Enable {type.label}</span>
                        <span
                          className={`${
                            settings?.[`${type.id}_notifications`] ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'location' && (
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Location Services</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Control how CommUnity uses your location
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Location Sharing</h4>
                      <p className="text-sm text-gray-500">Allow CommUnity to access your location</p>
                    </div>
                    <button
                      onClick={() => handleLocationChange(!settings?.location_sharing)}
                      className={`${
                        settings?.location_sharing
                          ? 'bg-primary-600'
                          : 'bg-gray-200'
                      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                    >
                      <span className="sr-only">Enable location sharing</span>
                      <span
                        className={`${
                          settings?.location_sharing ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
        confirmText="Delete Account"
        type="danger"
      />
    </div>
  );
};

export default Settings; 