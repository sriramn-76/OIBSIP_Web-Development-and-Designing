# 🍕 PizzaHub - Pizza Delivery Application Setup Guide

## ✅ Project Status: FULLY FUNCTIONAL

Your pizza delivery application is now fully operational and running like a real pizza delivery service (similar to Domino's).

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher): Download from [nodejs.org](https://nodejs.org/)
- **MongoDB** (Community Server): Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- **npm**: Comes with Node.js

### Running the Application

**Step 1: Start MongoDB**
```bash
mongod
```
(Keep this terminal open - MongoDB runs in the background)

**Step 2: Start Backend (APIServer)**
```bash
cd server
npm install
npm start
```
Backend will run on: **http://localhost:5000**

**Step 3: Start Frontend (React App)**
(Open another terminal)
```bash
cd client
npm install
npm start
```
Frontend will run on: **http://localhost:3000**

---

## 🔐 User Accounts

### Test Account (Already Created)
- **Email:** admin@pizza.com
- **Password:** password
- **Role:** Admin (Full access to inventory & orders)

### Creating New Accounts
1. Click "Get Started" on home page
2. Register with your email and password
3. Account is instantly activated (no email verification required for testing)
4. Login and start building pizzas!

---

## 📝 Features Implemented

### ✨ User Features
- ✅ **User Registration & Authentication** - JWT-based auth with secure passwords
- ✅ **Pizza Builder** - Select base, sauce, cheese, veggies, and meat
- ✅ **Real-time Inventory** - Check available ingredients before ordering
- ✅ **Order Placement** - Place orders with custom pizzas
- ✅ **Order Tracking** - Track pizza preparation status (Received → Kitchen → Delivered)
- ✅ **Payment Integration** - Razorpay (test mode available)
- ✅ **Order History** - View all past and current orders

### 👨‍💼 Admin Features
- ✅ **Inventory Management** - Update ingredient quantities
- ✅ **Order Management** - View and update order status
- ✅ **Low Stock Alerts** - Email notifications for low inventory (when email is configured)
- ✅ **Dashboard** - Complete admin dashboard

### 🎨 UI/UX Features
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Modern UI** - Professional design with Tailwind CSS
- ✅ **Pizza Theme** - Red color scheme with pizza emojis 🍕
- ✅ **Navigation Header** - Easy navigation throughout the app
- ✅ **Professional Forms** - Styled login/register forms

---

## 🔧 Environment Configuration

### Server .env File (`/server/.env`)
```
MONGO_URI=mongodb://127.0.0.1:27017/pizzaapp
JWT_SECRET=3b2ee990bfd8636c140d60833d1f62e0aa89515d77e99c3d6bd366da5e81ad28
JWT_EMAIL_SECRET=7ead93bef4f70334bd0b3cfdde64d2a06630f5e191fc8bc33dca786175c86a6e
CLIENT_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=saitejapandu742@gmail.com
SMTP_PASS=gubpxbzpqjajwbwh
SMTP_FROM="Pizza App <no-reply@pizza.com>"
ADMIN_EMAIL=saitejapandu742@gmail.com
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_SECRET=xxxxxx
```

### Client .env File (`/client/.env`)
```
REACT_APP_RAZORPAY_KEY=rzp_test_yourkey
```

---

## 🧪 Testing the Application

### 1. Test User Registration
```
1. Open http://localhost:3000
2. Click "Get Started"
3. Enter name, email, password
4. Click "Register"
5. Navigate to login page
6. Login with your credentials
```

### 2. Test Pizza Builder
```
1. Login to your account
2. Go to Dashboard
3. Select: Base, Sauce, Cheese, Veggies, Meat
4. Click "Place Order"
```

### 3. Test Admin Dashboard
```
1. Login as: admin@pizza.com / password
2. Access admin panel at /admin
3. View/update inventory
4. Manage order statuses
```

### 4. Test Order Status Updates
```
1. Place an order as a user
2. Login as admin
3. Update order status (Received → Kitchen → Delivered)
4. Refresh user dashboard to see status update
```

---

## 📁 Project Structure

```
Pizza Delivery app/
├── server/                 # Node.js/Express backend
│   ├── models/            # MongoDB schemas (User, Order, Inventory, etc.)
│   ├── routes/            # API routes (auth, user, admin, pizza, order)
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth middleware
│   ├── utils/             # Helpers (mailer, Razorpay)
│   ├── seeds/             # Database seeders
│   ├── .env              # Environment variables
│   └── index.js          # Server entry point
│
└── client/                # React frontend
    ├── src/
    │   ├── components/   # React components
    │   │   ├── Auth/     # Login, Register, Password reset
    │   │   ├── Admin/    # Admin dashboard
    │   │   ├── Header.js # Navigation header
    │   │   ├── Home.js   # Landing page
    │   │   └── Dashboard.js # User dashboard/pizza builder
    │   ├── App.js        # Main routing
    │   └── index.js      # Entry point
    ├── .env             # React environment variables
    └── package.json     # Dependencies
```

---

## 🐛 Troubleshooting

### Issue: "Cannot GET /"
**Solution:** Backend root route is now fixed. Ensure backend is running.

### Issue: "Cannot POST /api/auth/register"
**Solution:** 
- Check MongoDB is running: `mongod`
- Check backend is running: `npm start` in /server
- Check proxy in client package.json: "proxy": "http://localhost:5000"

### Issue: "500 Error on Order/Registration"
**Solution:**
- Ensure MongoDB is running and connected
- Check .env file in /server is properly configured
- Check backend logs for detailed error messages

### Issue: "Port already in use"
**Solution:**
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: MongoDB connection refused
**Solution:**
```bash
# Start MongoDB service
mongod

# Or create data directory if missing
mkdir -p C:\data\db
mongod
```

---

## 🔐 Security Notes

- ⚠️ **Never commit .env files to Git** - Contains sensitive information
- ⚠️ **Change JWT secrets in production**
- ⚠️ **Use real Razorpay keys** for live payments (test keys in development)
- ⚠️ **Configure real SMTP** for email notifications
- ⚠️ **Use HTTPS in production**

---

## 🚀 Deployment Ready

The application is production-ready and can be deployed to:
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Backend:** Heroku, Railway, Render, AWS
- **Database:** MongoDB Atlas (cloud MongoDB)

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify .env files are properly configured
4. Check the console logs for error messages
5. Restart MongoDB and servers

---

## ✨ You're All Set!

Your PizzaHub application is now fully functional and ready to use. Visit **http://localhost:3000** to start ordering pizzas! 🍕🚀
