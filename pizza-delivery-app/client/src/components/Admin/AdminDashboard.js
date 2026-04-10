import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header';

const api = axios.create({ baseURL: 'http://localhost:9000' });
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default function AdminDashboard() {
  const [inventory, setInventory] = useState({});
  const [orders, setOrders] = useState([]);

  const loadData = () => {
    api.get('/api/admin/inventory').then(r=>setInventory(r.data));
    api.get('/api/admin/orders').then(r=>setOrders(r.data));
  };
  useEffect(() => { loadData(); }, []);

  const updateInv = (field, value) => {
    const upd = {...inventory, [field]:value};
    setInventory(upd);
    api.post('/api/admin/inventory', upd);
  };

  const changeStatus = (id, status) => {
    api.post(`/api/admin/order/${id}/status`, { status }).then(loadData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

          <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Inventory Management</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {['base','sauce','cheese','veggies','meat'].map(k=> (
                  <div key={k}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">{k}</label>
                    <input
                      type="number"
                      value={inventory[k]||0}
                      onChange={e=>updateInv(k, e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Orders</h3>
              <ul className="divide-y divide-gray-200">
                {orders.map(o=> (
                  <li key={o._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">{o.user.name} - 🍕 {o.pizza.base} Pizza</div>
                      <div className="text-sm text-gray-500">Status: <span className={`font-medium ${o.status === 'delivered' ? 'text-green-600' : o.status === 'kitchen' ? 'text-yellow-600' : 'text-blue-600'}`}>{o.status}</span></div>
                      <div className="space-x-2">
                        <button
                          onClick={()=>changeStatus(o._id,'kitchen')}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          In Kitchen
                        </button>
                        <button
                          onClick={()=>changeStatus(o._id,'delivered')}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Sent
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
