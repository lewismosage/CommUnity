import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { initializeAuth } from './store/slices/authSlice';
import LoadingSpinner from './components/common/LoadingSpinner';
import { Navbar } from './components/layout/Navbar';
import Toast from './components/common/Toast';
import CommunityInitiatives from './pages/CommunityInitiatives';
import Marketplace from './pages/Marketplace';
import Events from './pages/Events';
import Groups from './pages/Groups';
import Login from './pages/Login';
import Register from './pages/Register';
import Messages from './pages/Messages';
import EventDetail from './pages/EventDetail';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { AppRoutes } from './routes';
import About from './pages/About';
import WhatsNew from './pages/WhatsNew';
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';
import MyCommunities from './pages/MyCommunities';
import Calendar from './pages/Calendar';
import Resources from './pages/Resources';
import Analytics from './pages/Analytics';
import CommunityManage from './pages/CommunityManage';
import CommunitySettings from './pages/CommunitySettings';
import CommunityResources from './pages/CommunityResources';
import CommunityAnalytics from './pages/CommunityAnalytics';
import CommunityEvents from './pages/CommunityEvents';
import EventDetailsPage from './pages/EventDetails';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<AppRoutes />} />
          <Route path="/community-initiatives" element={<CommunityInitiatives />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/u/:username" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/whats-new" element={<WhatsNew />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-communities" element={<MyCommunities />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/communities/:id/manage" element={<CommunityManage />} />
          <Route path="/communities/:id/settings" element={<CommunitySettings />} />
          <Route path="/communities/:id/resources" element={<CommunityResources />} />
          <Route path="/communities/:id/analytics" element={<CommunityAnalytics />} />
          <Route path="/communities/events" element={<CommunityEvents />} />
          <Route path="/communities/:id/events" element={<CommunityEvents />} />
          <Route path="/communities/:id/events/:eventId" element={<EventDetailsPage />} />
        </Routes>
      </main>
      <Toast />
    </div>
  );
};

export default AppContent; 