import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setUserRole(role || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
<header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <Link to="/" className="flex-shrink-0 flex items-center gap-2 hover:opacity-80 transition">
          <h1 className="text-white text-2xl font-bold">PizzaHub</h1>
        </Link>

        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
          <Link to="/" className="border-transparent text-white hover:border-white hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition">
            Home
          </Link>

          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="border-transparent text-white hover:border-white hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition">
                Order Pizza
              </Link>

              {userRole === 'admin' && (
                <Link to="/admin" className="border-transparent text-white hover:border-white hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition">
                  Admin Panel
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      <div className="hidden sm:ml-6 sm:flex sm:items-center gap-3">
        {isLoggedIn ? (
          <>
            <span className="text-white text-sm font-medium">
              {userRole === 'admin' ? 'Admin' : 'User'}
            </span>

            <button
              onClick={handleLogout}
              className="bg-white text-red-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium transition">
              Login
            </Link>

            <Link to="/register" className="bg-white text-red-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition font-bold">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  </div>
</header>
  );
}