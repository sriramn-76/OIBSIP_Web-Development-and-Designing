import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const api = axios.create({ baseURL: 'http://localhost:9000' });
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default function Checkout({ pizza, amount, onBack, onOrderSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [delivery, setDelivery] = useState({ address: '', phone: '', instructions: '' });

  const handlePaymentSelect = (method) => {
    if (method === 'card') {
      if (!process.env.REACT_APP_RAZORPAY_KEY || process.env.REACT_APP_RAZORPAY_KEY.includes('xxx')) {
        alert('⚠️ Card payment not available. Razorpay keys not configured. Please use Cash or GPay.');
        return;
      }
    }
    setPaymentMethod(method);
    setShowDeliveryForm(true);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!delivery.address || !delivery.phone) {
      alert('Please fill in address and phone number');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        pizza,
        amount,
        paymentMethod,
        delivery
      };

      const res = await api.post('/api/user/order', orderData);

      if (paymentMethod === 'card') {
        // Razorpay integration
        const { razorpay } = res.data;
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          amount: razorpay.amount,
          currency: razorpay.currency,
          name: 'PizzaHub',
          description: `${pizza.base} Pizza`,
          order_id: razorpay.id,
          handler: async function (response) {
            try {
              await api.post('/api/order/verify', { ...response, orderId: res.data.orderId });
              alert('✅ Order placed successfully! Payment received.');
              onOrderSuccess();
            } catch (err) {
              alert('Payment verification failed');
            }
          },
          prefill: { email: localStorage.getItem('email') || '' },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Cash or GPay - order placed
        alert(`✅ Order placed successfully!\n\nPayment Method: ${paymentMethod === 'cash' ? '💰 Cash on Delivery' : '📱 Google Pay'}\nYour pizza will be delivered to:\n${delivery.address}`);
        onOrderSuccess();
      }
    } catch (err) {
      alert('❌ Order failed: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (showDeliveryForm) {
    return (
      <div className="min-h-screen bg-slate-100">
  <Header />

        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-xl">
            <div className="px-6 py-8">

              <button
                onClick={onBack}
                className="text-indigo-600 hover:text-indigo-700 font-medium mb-6"
              >
                ← Back to Menu
              </button>

              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Complete Your Order
              </h2>
              <p className="text-slate-500 mb-8">Delivery Details</p>

              <form onSubmit={handlePlaceOrder} className="space-y-6">

                {/* Order Summary */}
                <div className="bg-slate-50 p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Your Pizza
                  </h3>

                  <p className="text-slate-700 font-medium">
                    {pizza.base} Base with {pizza.sauce} Sauce & {pizza.cheese} Cheese
                  </p>

                  {pizza.veggies.length > 0 && (
                    <p className="text-slate-500 mt-2">
                      Veggies: {pizza.veggies.join(', ')}
                    </p>
                  )}

                  {pizza.meat.length > 0 && (
                    <p className="text-slate-500 mt-1">
                      Meat: {pizza.meat.join(', ')}
                    </p>
                  )}

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-800">
                        Total Amount:
                      </span>
                      <span className="text-3xl font-bold text-indigo-600">
                        ₹{amount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={delivery.address}
                    onChange={e => setDelivery({ ...delivery, address: e.target.value })}
                    placeholder="Enter your full delivery address"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows="4"
                  />
                </div>

                {/* Phone + Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={delivery.phone}
                      onChange={e => setDelivery({ ...delivery, phone: e.target.value })}
                      placeholder="10-digit phone number"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Special Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={delivery.instructions}
                      onChange={e => setDelivery({ ...delivery, instructions: e.target.value })}
                      placeholder="E.g., No onions, ring bell twice..."
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                </div>

                {/* Payment Method */}
                <div className="bg-slate-50 p-4 rounded-lg border">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Payment Method:</span>{" "}
                    {paymentMethod === 'cash'
                      ? 'Cash on Delivery'
                      : paymentMethod === 'gpay'
                      ? 'Google Pay'
                      : 'Credit/Debit Card'}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 px-6 py-3 border rounded-lg text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
                  >
                    {loading ? 'Processing...' : 'Place Order & Pay'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>  
    );
  }

  // Payment Method Selection
  return (
   <div className="min-h-screen bg-slate-100">
  <Header />

  <div className="max-w-4xl mx-auto py-12 px-4">
    <div className="bg-white shadow-lg rounded-xl">

      <div className="px-6 py-8">

        <button
          onClick={onBack}
          className="text-indigo-600 hover:text-indigo-700 mb-6"
        >
          ← Back to Menu
        </button>

        <h2 className="text-4xl font-bold text-slate-800 mb-2">
          Select Payment Method
        </h2>
        <p className="text-slate-500 mb-10">
          Choose how you want to pay
        </p>

        {/* Order Preview */}
        <div className="mb-10 bg-slate-50 p-6 rounded-lg border">
          <h3 className="font-semibold text-slate-800 mb-2">
            Order Preview
          </h3>
          <p className="text-slate-700 font-medium">{pizza.base} Pizza</p>

          <p className="text-slate-500 text-sm mt-2">
            {pizza.sauce} • {pizza.cheese}
            {pizza.veggies.length > 0 && ` • ${pizza.veggies.join(', ')}`}
            {pizza.meat.length > 0 && ` • ${pizza.meat.join(', ')}`}
          </p>

          <div className="mt-4 pt-4 border-t flex justify-between">
            <span className="font-bold text-slate-800">Total</span>
            <span className="text-indigo-600 font-bold">₹{amount}</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <button
            onClick={() => handlePaymentSelect('cash')}
            className="p-6 border rounded-xl hover:border-indigo-500 hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Cash on Delivery
            </h3>
            <p className="text-sm text-slate-500">Pay on delivery</p>
          </button>

          <button
            onClick={() => handlePaymentSelect('gpay')}
            className="p-6 border rounded-xl hover:border-indigo-500 hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Google Pay
            </h3>
            <p className="text-sm text-slate-500">Fast & secure</p>
          </button>

          <button
            onClick={() => handlePaymentSelect('card')}
            disabled={!process.env.REACT_APP_RAZORPAY_KEY || process.env.REACT_APP_RAZORPAY_KEY.includes('xxx')}
            className="p-6 border rounded-xl hover:border-indigo-500 hover:shadow-md transition disabled:opacity-50"
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Card Payment
            </h3>
            <p className="text-sm text-slate-500">
              Secure via Razorpay
            </p>
          </button>

        </div>

      </div>
    </div>
  </div>
</div>
  );
}
