import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppContent from './AppContent';
import ErrorBoundary from './components/common/ErrorBoundary';
import { WebSocketProvider } from './contexts/WebSocketContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <WebSocketProvider>
          <Router>
            <AppContent />
          </Router>
        </WebSocketProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
