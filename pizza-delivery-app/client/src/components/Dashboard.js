import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Checkout from './Checkout';

const api = axios.create({ baseURL: 'http://localhost:9000' });
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Pricing for each component
const PRICING = {
  base: { 'Thin Crust': 150, 'Thick Crust': 180, 'Cheese Burst': 220, 'Gluten Free': 200, 'Pan Pizza': 190 },
  sauce: { 'Tomato': 0, 'Barbecue': 20, 'Alfredo': 30, 'Pesto': 25, 'Spicy': 15 },
  cheese: { 'Mozzarella': 40, 'Cheddar': 50, 'Parmesan': 60, 'Provolone': 55 },
  veggies: { 'Onion': 10, 'Bell Pepper': 15, 'Mushroom': 20, 'Olives': 25, 'Tomato': 10, 'Spinach': 15 },
  meat: { 'Chicken': 80, 'Beef': 100, 'Sausage': 90, 'Bacon': 110, 'Ham': 85 }
};

export default function Dashboard() {
  const [options, setOptions] = useState({ base: [], sauce: [], cheese: [], veggies: [], meat: [] });
  const [pizza, setPizza] = useState({ base:'', sauce:'', cheese:'', veggies: [], meat: [] });
  const [orders, setOrders] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    api.get('/api/user/options').then(r => {
      const opts = { base: [], sauce: [], cheese: [], veggies: [], meat: [] };
      r.data.forEach(o => { opts[o.category].push(o.name); });
      setOptions(opts);
    });
    loadOrders();
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate total price dynamically
  useEffect(() => {
    let total = 0;
    if (pizza.base) total += PRICING.base[pizza.base] || 0;
    if (pizza.sauce) total += PRICING.sauce[pizza.sauce] || 0;
    if (pizza.cheese) total += PRICING.cheese[pizza.cheese] || 0;
    pizza.veggies.forEach(v => { total += PRICING.veggies[v] || 0; });
    pizza.meat.forEach(m => { total += PRICING.meat[m] || 0; });
    setTotalAmount(total);
  }, [pizza]);

  const loadOrders = () => {
    api.get('/api/user/orders').then(r => setOrders(r.data));
  };

  const handleProceedToCheckout = () => {
    if (!pizza.base || !pizza.sauce || !pizza.cheese) {
      alert('Please select Base, Sauce, and Cheese!');
      return;
    }
    setShowCheckout(true);
  };

  if (showCheckout) {
    return <Checkout pizza={pizza} amount={totalAmount} onBack={() => setShowCheckout(false)} onOrderSuccess={() => { loadOrders(); setShowCheckout(false); setPizza({ base:'', sauce:'', cheese:'', veggies: [], meat: [] }); setTotalAmount(0); }} />;
  }

  return (
   <div className="min-h-screen bg-slate-100">
  <Header />

  <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div className="px-4 py-6 sm:px-0">
      
      <h1 className="text-4xl font-bold text-slate-800 mb-2">
        Build Your Perfect Pizza
      </h1>
      <p className="text-slate-500 mb-8">
        Customize your pizza with fresh ingredients
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Pizza Builder */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-xl">
          <div className="px-6 py-6">
            <form className="space-y-6">

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                {/* Base */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Base <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={pizza.base}
                    onChange={e=>setPizza({...pizza, base:e.target.value})}
                    className="mt-1 w-full py-2 px-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select base</option>
                    {options.base.map(b=> (
                      <option key={b} value={b}>
                        {b} - ₹{PRICING.base[b]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sauce */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Sauce <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={pizza.sauce}
                    onChange={e=>setPizza({...pizza, sauce:e.target.value})}
                    className="mt-1 w-full py-2 px-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select sauce</option>
                    {options.sauce.map(s=> (
                      <option key={s} value={s}>
                        {s} - ₹{PRICING.sauce[s]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cheese */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Cheese <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={pizza.cheese}
                    onChange={e=>setPizza({...pizza, cheese:e.target.value})}
                    className="mt-1 w-full py-2 px-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select cheese</option>
                    {options.cheese.map(c=> (
                      <option key={c} value={c}>
                        {c} - ₹{PRICING.cheese[c]}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Veggies */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Veggies (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {options.veggies.map(v=> (
                    <div key={v} className="flex items-center p-2 border rounded-lg hover:border-indigo-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pizza.veggies.includes(v)}
                        onChange={e=>{
                          const checked = e.target.checked;
                          setPizza(prev=>{
                            const list = prev.veggies.slice();
                            if (checked) list.push(v);
                            else list.splice(list.indexOf(v),1);
                            return {...prev, veggies:list};
                          });
                        }}
                        className="h-4 w-4 text-indigo-600 border-slate-300"
                      />
                      <label className="ml-2 text-sm text-slate-800">{v}</label>
                      <span className="ml-auto text-xs text-indigo-600 font-medium">
                        +₹{PRICING.veggies[v]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meat */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Meat (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {options.meat.map(m=> (
                    <div key={m} className="flex items-center p-2 border rounded-lg hover:border-indigo-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pizza.meat.includes(m)}
                        onChange={e=>{
                          const checked = e.target.checked;
                          setPizza(prev=>{
                            const list = prev.meat.slice();
                            if (checked) list.push(m);
                            else list.splice(list.indexOf(m),1);
                            return {...prev, meat:list};
                          });
                        }}
                        className="h-4 w-4 text-indigo-600 border-slate-300"
                      />
                      <label className="ml-2 text-sm text-slate-800">{m}</label>
                      <span className="ml-auto text-xs text-indigo-600 font-medium">
                        +₹{PRICING.meat[m]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="sticky top-4 bg-white border shadow-lg rounded-xl">
            <div className="px-6 py-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b">
                {pizza.base && (
                  <div className="flex justify-between text-sm">
                    <span>{pizza.base}</span>
                    <span className="font-medium text-indigo-600">
                      ₹{PRICING.base[pizza.base]}
                    </span>
                  </div>
                )}
                {pizza.sauce && (
                  <div className="flex justify-between text-sm">
                    <span>{pizza.sauce}</span>
                    <span className="font-medium text-indigo-600">
                      ₹{PRICING.sauce[pizza.sauce]}
                    </span>
                  </div>
                )}
                {pizza.cheese && (
                  <div className="flex justify-between text-sm">
                    <span>{pizza.cheese}</span>
                    <span className="font-medium text-indigo-600">
                      ₹{PRICING.cheese[pizza.cheese]}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-slate-800">Total:</span>
                <span className="text-3xl font-bold text-indigo-600">
                  ₹{totalAmount}
                </span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Orders */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Your Orders
        </h2>

        {orders.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-12 text-center">
            <p className="text-slate-500 text-lg">
              No orders yet. Start building your pizza.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(o=> (
              <div key={o._id} className="bg-white shadow rounded-xl hover:shadow-lg transition">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-bold text-slate-800">
                    {o.pizza.base}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {[o.pizza.sauce, o.pizza.cheese, ...o.pizza.veggies, ...o.pizza.meat].join(', ')}
                  </p>

                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="font-semibold capitalize">
                        {o.status}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-semibold text-indigo-600">
                        ₹{o.amount}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Payment:</span>
                      <span className="font-semibold text-green-600">
                        {o.paymentStatus}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </div>
</div>
  );
}
