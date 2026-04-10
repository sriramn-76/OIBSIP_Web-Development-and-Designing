# Pizza Delivery Application

A full-stack MERN (MongoDB, Express.js, React, Node.js) pizza delivery application with real-time features, dynamic pricing, multiple payment methods, and admin management.

## 🚀 Features

### User Features
- **User Registration & Authentication**: Secure signup with email verification, login, forgot password, and password reset
- **Pizza Customization**: Interactive pizza builder with selectable base, sauce, cheese, veggies, and meat
- **Dynamic Pricing**: Real-time price calculation based on selected ingredients
- **Multiple Payment Methods**: Cash, GPay, and Razorpay card payments
- **Order Tracking**: Real-time order status updates (Received → Kitchen → Delivered)
- **Order History**: View past orders with details
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS

### Admin Features
- **Admin Dashboard**: Separate login for administrators
- **Inventory Management**: Track ingredient stock levels with automatic alerts
- **Order Management**: View and update order statuses
- **User Management**: Overview of registered users

### Additional Features
- **Email Notifications**: Automated emails for verification, password reset, and low inventory alerts
- **Inventory Alerts**: Email notifications when stock falls below threshold
- **Secure Payments**: Razorpay integration for card payments (test mode)
- **JWT Authentication**: Secure token-based authentication
- **CORS Enabled**: Cross-origin requests handled
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Nodemailer** for email services
- **Razorpay** for payment processing
- **node-cron** for scheduled tasks
- **CORS** for cross-origin requests

### Frontend
- **React 18** with hooks
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **Razorpay SDK** for payments

### Database Models
- **User**: name, email, password, role, emailVerified, reset tokens
- **Order**: user, pizza details, amount, payment method, status, delivery info, Razorpay fields
- **Inventory**: stock counts for base, sauce, cheese, veggies, meat, threshold
- **PizzaOption**: ingredient options categorized by type

## 📁 Project Structure

```
pizza-delivery-app/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── userController.js     # User operations (pizza options, orders)
│   │   ├── adminController.js    # Admin operations (inventory, orders)
│   │   ├── pizzaController.js    # Pizza options management
│   │   └── orderController.js    # Order processing
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Order.js              # Order schema
│   │   ├── Inventory.js          # Inventory schema
│   │   └── PizzaOption.js        # Pizza options schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── user.js               # User routes
│   │   ├── admin.js              # Admin routes
│   │   ├── pizza.js              # Pizza routes
│   │   └── order.js              # Order routes
│   ├── seeds/
│   │   ├── seedOptions.js        # Seed pizza options
│   │   └── seedAdmin.js          # Seed admin user
│   ├── utils/
│   │   └── razorpay.js           # Razorpay utilities
│   ├── .env                      # Environment variables
│   ├── index.js                  # Server entry point
│   └── package.json
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │   ├── Verify.js
│   │   │   │   ├── Forgot.js
│   │   │   │   └── Reset.js
│   │   │   ├── Admin/
│   │   │   │   └── AdminDashboard.js
│   │   │   ├── Checkout.js        # Payment and delivery
│   │   │   ├── Dashboard.js       # Pizza builder
│   │   │   ├── Header.js          # Navigation
│   │   │   └── Home.js            # Landing page
│   │   ├── App.js                 # Main app component
│   │   ├── index.js               # React entry point
│   │   └── index.css              # Global styles
│   ├── .env                       # Frontend env vars
│   └── package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Backend Setup

1. **Clone and navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create `.env` file in server directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/pizza-delivery
   JWT_SECRET=your_jwt_secret_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Seed the database:**
   ```bash
   npm run seed          # Populate pizza options
   npm run seed:admin    # Create admin user (admin@admin.com / admin123)
   ```

5. **Start the server:**
   ```bash
   npm start             # Production mode
   npm run dev           # Development mode with nodemon
   ```

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create `.env` file in client directory:
   ```env
   REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Start the React app:**
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000` and proxy API requests to `http://localhost:5000`.

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /verify` - Email verification
- `POST /forgot` - Forgot password
- `POST /reset` - Password reset

### User (`/api/user`)
- `GET /options` - Get pizza options
- `GET /orders` - Get user orders
- `POST /order` - Create new order

### Admin (`/api/admin`)
- `GET /inventory` - Get inventory levels
- `PUT /inventory` - Update inventory
- `GET /orders` - Get all orders
- `PUT /orders/:id` - Update order status

### Pizza (`/api/pizza`)
- `GET /options` - Get all pizza options
- `POST /options` - Add new pizza option
- `DELETE /options/:id` - Delete pizza option

### Order (`/api/order`)
- `PUT /:id/status` - Update order status

## 💰 Pricing Structure

The application uses a dynamic pricing system:

```javascript
const PRICING = {
  base: {
    'Thin Crust': 150,
    'Thick Crust': 180,
    'Cheese Burst': 220,
    'Gluten Free': 200,
    'Pan Pizza': 190
  },
  sauce: {
    'Tomato': 0,
    'Barbecue': 20,
    'Alfredo': 30,
    'Pesto': 25,
    'Spicy': 15
  },
  cheese: {
    'Mozzarella': 40,
    'Cheddar': 50,
    'Parmesan': 60,
    'Provolone': 55
  },
  veggies: {
    'Onion': 10,
    'Bell Pepper': 15,
    'Mushroom': 20,
    'Olives': 25,
    'Tomato': 10,
    'Spinach': 15
  },
  meat: {
    'Chicken': 80,
    'Beef': 100,
    'Sausage': 90,
    'Bacon': 110,
    'Ham': 85
  }
};
```

## 🔐 Authentication Flow

1. User registers with name, email, password
2. Email verification link sent (auto-verified in development)
3. User logs in, receives JWT token
4. Token stored in localStorage for subsequent requests
5. Protected routes check for valid token

## 💳 Payment Integration

### Razorpay (Card Payments)
- Test mode integration
- Order creation with amount and currency
- Payment verification with signature validation

### Cash and GPay
- No external integration required
- Payment status set to 'paid' upon order placement

## 📧 Email Configuration

Uses Nodemailer with Gmail SMTP. For development, consider using Ethereal Email for testing.

## 🗄️ Database Seeding

### Pizza Options
Run `npm run seed` to populate default pizza ingredients:
- Bases: Thin Crust, Thick Crust, Cheese Burst, Gluten Free, Pan Pizza
- Sauces: Tomato, Barbecue, Alfredo, Pesto, Spicy
- Cheeses: Mozzarella, Cheddar, Parmesan, Provolone
- Veggies: Onion, Bell Pepper, Mushroom, Olives, Tomato, Spinach
- Meats: Chicken, Beef, Sausage, Bacon, Ham

### Admin User
Run `npm run seed:admin` to create admin account:
- Email: admin@admin.com
- Password: admin123

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on hosting platform
2. Ensure MongoDB connection string is configured
3. Run `npm run seed` and `npm run seed:admin` on production DB
4. Start server with `npm start`

### Frontend Deployment
1. Build the app: `npm run build`
2. Serve static files from `build` directory
3. Configure proxy or update API calls to production backend URL

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Ensure MongoDB is running and MONGO_URI is correct
2. **Email Not Sending**: Check EMAIL_USER and EMAIL_PASS in .env
3. **Port Already in Use**: Kill process on port 5000/3000 or change PORT
4. **CORS Errors**: Ensure backend has CORS enabled
5. **Payment Failures**: Verify Razorpay credentials and test mode

### Development Tips
- Use `npm run dev` for auto-restart on file changes
- Check browser console and server logs for errors
- Use MongoDB Compass for database inspection
- Test emails with Ethereal Email service

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.

2. **User Dashboard**
   - Browse pizza options, build custom pizza, and place orders.
   - Razorpay checkout in test mode; after success the order is saved and inventory is decremented.
   - Orders list updates every 5 seconds for status changes.

3. **Admin Dashboard**
   - View and update inventory quantities (base, sauce, cheese, veggies, meat).
   - See all orders and change status between `received`, `kitchen`, and `delivered`.
   - Stock alerts are emailed to the admin when any item drops below the threshold.

### Notes

- Inventory decrement and email alerts are triggered after payment verification in `orderController`.
- You can adjust the notification threshold inside the `Inventory` document.

### Extending the App

- Add real pricing logic to compute the `amount` dynamically based on selected items.
- Implement role-based route guards in React and better UI/UX.
- Use websockets (e.g., Socket.io) for bi-directional realtime updates instead of polling.

---

Feel free to modify and enhance this boilerplate for your internship or project needs!
