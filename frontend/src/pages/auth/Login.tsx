import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setUser, setToken } from '../../store/slices/authSlice';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting login with:', { email, password });
      
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Login response:', response.data);

      const { token, user } = response.data;
      
      // Store token and user in Redux
      dispatch(setToken(token));
      dispatch(setUser(user));
      
      // Redirect to home page
      navigate('/');
    } catch (err: any) {
      console.error('Login error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      setError(err.response?.data?.error || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to CommUnity
          </h2>
        </div>
        
        {message && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">{message}</div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 