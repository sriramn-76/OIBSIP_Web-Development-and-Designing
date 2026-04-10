import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

export default function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    const token = localStorage.getItem('token');
    if (token) {
      const role = localStorage.getItem('role');
      if (role === 'admin') navigate('/admin');
      else navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-100">
  <Header />

  <main>
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="text-center">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800">
          Welcome to <span className="text-indigo-600">PizzaHub</span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-slate-500 text-lg">
          Build your perfect pizza with our custom pizza builder. Choose from a variety of bases, sauces, cheeses, veggies, and meats. Fast delivery and delicious pizzas await.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/register"
            className="px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold transition"
          >
            Sign In
          </Link>

        </div>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Custom Pizza Builder
          </h3>
          <p className="text-slate-500 text-sm">
            Create your perfect pizza with multiple ingredients and combinations.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Fast Delivery
          </h3>
          <p className="text-slate-500 text-sm">
            Get your pizza delivered hot and fresh right to your doorstep.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Secure Payment
          </h3>
          <p className="text-slate-500 text-sm">
            Multiple safe and reliable payment options for a smooth checkout.
          </p>
        </div>

      </div>
    </div>
  </main>
</div>
  );
}