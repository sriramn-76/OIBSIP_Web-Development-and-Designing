# 🍕 PizzaHub - Complete Pizza Delivery Application Documentation

## 📋 Project Overview

**PizzaHub** is a full-stack MERN (MongoDB, Express.js, React, Node.js) pizza delivery application designed to provide a complete online pizza ordering experience similar to Domino's or Pizza Hut. The application features user authentication, dynamic pizza customization, real-time inventory management, multiple payment methods, and comprehensive admin controls.

### 🎯 Project Status
✅ **FULLY FUNCTIONAL** - Production-ready pizza delivery application with all core features implemented and tested.

---

## 🚀 Key Features

### 👤 User Features
- **Secure Authentication**: JWT-based registration, login, email verification, password reset
- **Interactive Pizza Builder**: Custom pizza creation with base, sauce, cheese, veggies, and meat selection
- **Dynamic Pricing**: Real-time price calculation based on selected ingredients
- **Multiple Payment Options**: Cash on Delivery, Google Pay, and Razorpay card payments
- **Order Tracking**: Live status updates (Received → Kitchen → Delivered)
- **Order History**: Complete order management and history
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Delivery Information**: Address and contact details collection

### 👨‍💼 Admin Features
- **Admin Dashboard**: Dedicated admin interface with full system control
- **Inventory Management**: Real-time stock tracking with automatic alerts
- **Order Management**: View and update order statuses across the system
- **User Management**: Overview of registered users and their activities
- **Low Stock Alerts**: Automated email notifications for inventory thresholds

### 🔧 Technical Features
- **Real-time Updates**: Order status polling every 5 seconds
- **Email Notifications**: SMTP-based email system for verification and alerts
- **Payment Integration**: Razorpay test mode integration with signature verification
- **Database Seeding**: Automated data population for development
- **CORS Enabled**: Cross-origin request handling
- **Error Handling**: Comprehensive error management and logging
- **Security**: bcrypt password hashing, JWT tokens, input validation

---

## 🛠️ Technology Stack

### Backend (Node.js/Express)
- **Runtime**: Node.js v16+
- **Framework**: Express.js v4.18.1
- **Database**: MongoDB v6.6.5 with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcryptjs for password hashing
- **Email**: Nodemailer with Gmail SMTP
- **Payments**: Razorpay v2.8.2
- **Scheduling**: node-cron v3.0.0
- **CORS**: cors v2.8.5

### Frontend (React)
- **Library**: React v18.1.0 with Hooks
- **Routing**: React Router DOM v6.3.0
- **Styling**: Tailwind CSS v3.3.0
- **HTTP Client**: Axios v0.27.2
- **Payments**: Razorpay React SDK v2.8.2
- **Build Tool**: Create React App (react-scripts v5.0.1)

### Development Tools
- **Process Management**: Nodemon v2.0.15
- **Environment**: dotenv v10.0.0
- **Database GUI**: MongoDB Compass (recommended)

---

## 🏗️ System Architecture

### Application Structure
```
PizzaHub/
├── server/                          # Backend API Server
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   ├── controllers/                 # Business logic layer
│   │   ├── authController.js        # Authentication operations
│   │   ├── userController.js        # User pizza/orders operations
│   │   ├── adminController.js       # Admin inventory/orders operations
│   │   ├── pizzaController.js       # Pizza options management
│   │   └── orderController.js       # Order processing and status updates
│   ├── models/                      # MongoDB schemas
│   │   ├── User.js                  # User authentication schema
│   │   ├── Order.js                 # Order and payment schema
│   │   ├── Inventory.js             # Stock management schema
│   │   └── PizzaOption.js           # Ingredient options schema
│   ├── routes/                      # API route definitions
│   │   ├── auth.js                  # Authentication endpoints
│   │   ├── user.js                  # User-facing operations
│   │   ├── admin.js                 # Admin operations
│   │   ├── pizza.js                 # Pizza management
│   │   └── order.js                 # Order status updates
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── utils/                       # Utility functions
│   │   ├── mailer.js                # Email service configuration
│   │   └── razorpay.js              # Payment gateway utilities
│   ├── seeds/                       # Database seeders
│   │   ├── seedOptions.js           # Populate pizza ingredients
│   │   └── seedAdmin.js             # Create admin user
│   ├── .env                         # Environment variables
│   └── index.js                     # Server entry point
│
└── client/                          # React Frontend Application
    ├── public/
    │   └── index.html               # HTML template
    ├── src/
    │   ├── components/              # React components
    │   │   ├── Auth/                # Authentication components
    │   │   │   ├── Login.js         # User login form
    │   │   │   ├── Register.js      # User registration form
    │   │   │   ├── Verify.js        # Email verification
    │   │   │   ├── Forgot.js        # Password reset request
    │   │   │   └── Reset.js         # Password reset form
    │   │   ├── Admin/
    │   │   │   └── AdminDashboard.js # Admin control panel
    │   │   ├── Checkout.js          # Payment and delivery form
    │   │   ├── Dashboard.js         # User pizza builder
    │   │   ├── Header.js            # Navigation component
    │   │   └── Home.js              # Landing page
    │   ├── App.js                   # Main application router
    │   ├── index.js                 # React entry point
    │   └── index.css                # Global styles
    ├── .env                         # Frontend environment variables
    └── package.json                 # Dependencies and scripts
```

### Data Flow Architecture
1. **User Registration**: Client → Auth API → MongoDB (User collection)
2. **Pizza Building**: Client fetches options → User selects ingredients → Price calculation
3. **Order Placement**: Client → Order API → Payment verification → Inventory update → Email notifications
4. **Admin Operations**: Admin client → Admin API → Direct database operations
5. **Real-time Updates**: Client polls order status API every 5 seconds

---

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'user', enum: ['user', 'admin']),
  emailVerified: Boolean (default: false),
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: Date (default: now)
}
```

### Order Model
```javascript
{
  user: ObjectId (ref: 'User'),
  pizza: {
    base: String,
    sauce: String,
    cheese: String,
    veggies: [String],
    meat: [String]
  },
  amount: Number (required),
  paymentMethod: String (enum: ['cash', 'gpay', 'card']),
  status: String (default: 'received', enum: ['received', 'kitchen', 'delivered']),
  deliveryInfo: {
    address: String,
    phone: String,
    instructions: String
  },
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String
  },
  createdAt: Date (default: now)
}
```

### Inventory Model
```javascript
{
  base: {
    'Thin Crust': Number (default: 100),
    'Thick Crust': Number (default: 100),
    'Cheese Burst': Number (default: 100),
    'Gluten Free': Number (default: 100),
    'Pan Pizza': Number (default: 100)
  },
  sauce: {
    'Tomato': Number (default: 100),
    'Barbecue': Number (default: 100),
    'Alfredo': Number (default: 100),
    'Pesto': Number (default: 100),
    'Spicy': Number (default: 100)
  },
  cheese: {
    'Mozzarella': Number (default: 100),
    'Cheddar': Number (default: 100),
    'Parmesan': Number (default: 100),
    'Provolone': Number (default: 100)
  },
  veggies: {
    'Onion': Number (default: 100),
    'Bell Pepper': Number (default: 100),
    'Mushroom': Number (default: 100),
    'Olives': Number (default: 100),
    'Tomato': Number (default: 100),
    'Spinach': Number (default: 100)
  },
  meat: {
    'Chicken': Number (default: 100),
    'Beef': Number (default: 100),
    'Sausage': Number (default: 100),
    'Bacon': Number (default: 100),
    'Ham': Number (default: 100)
  },
  threshold: Number (default: 10)
}
```

### PizzaOption Model
```javascript
{
  category: String (enum: ['base', 'sauce', 'cheese', 'veggies', 'meat']),
  name: String (required),
  price: Number (default: 0),
  available: Boolean (default: true)
}
```

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration with email verification
- `POST /login` - User authentication and JWT token generation
- `POST /verify` - Email verification token processing
- `POST /forgot` - Password reset email request
- `POST /reset` - Password reset with token validation

### User Routes (`/api/user`)
- `GET /options` - Fetch all available pizza ingredients
- `GET /orders` - Retrieve user's order history
- `POST /order` - Create new pizza order with payment processing

### Admin Routes (`/api/admin`)
- `GET /inventory` - Get current inventory levels
- `PUT /inventory` - Update ingredient stock quantities
- `GET /orders` - Fetch all orders for management
- `PUT /orders/:id` - Update order status and trigger notifications

### Pizza Management Routes (`/api/pizza`)
- `GET /options` - Retrieve all pizza ingredient options
- `POST /options` - Add new ingredient option
- `DELETE /options/:id` - Remove ingredient option

### Order Routes (`/api/order`)
- `PUT /:id/status` - Update order status (admin operation)

---

## 💰 Pricing System

The application implements a dynamic pricing model with base prices and add-on costs:

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
    'Tomato': 0,      // Free
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

**Pricing Logic:**
- Base price is required and determines starting cost
- Sauce can be free (Tomato) or add cost
- Cheese adds fixed amount
- Veggies and meat are additive per selection
- Total = Base + Sauce + Cheese + (Veggies × count) + (Meat × count)

---

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** v16 or higher
- **MongoDB** Community Server v5+ or MongoDB Atlas
- **npm** (comes with Node.js)
- **Git** for version control

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create `.env` file in server directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/pizza-delivery
   JWT_SECRET=your_super_secure_jwt_secret_here
   JWT_EMAIL_SECRET=your_email_jwt_secret_here
   CLIENT_URL=http://localhost:3000
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   SMTP_FROM=PizzaHub <no-reply@pizzahub.com>
   ADMIN_EMAIL=admin@pizzahub.com
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Seed the database:**
   ```bash
   npm run seed          # Populate pizza ingredients
   npm run seed:admin    # Create admin user (admin@pizzahub.com / admin123)
   ```

5. **Start the backend server:**
   ```bash
   npm start             # Production mode
   npm run dev           # Development mode with auto-restart
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

3. **Configure environment variables:**
   Create `.env` file in client directory:
   ```env
   REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id
   ```

4. **Start the React development server:**
   ```bash
   npm start
   ```

### Database Setup

1. **Start MongoDB locally:**
   ```bash
   mongod
   ```
   Or use MongoDB Atlas for cloud database.

2. **Verify connection:**
   The server will log "MongoDB connected" on successful connection.

---

## 🧪 Testing the Application

### User Flow Testing

1. **Registration & Login:**
   - Visit http://localhost:3000
   - Click "Get Started" → Register with email/password
   - Check email verification (auto-verified in development)
   - Login with credentials

2. **Pizza Customization:**
   - Navigate to Dashboard
   - Select base, sauce, cheese, veggies, meat
   - Observe real-time price updates
   - Add delivery information

3. **Order Placement:**
   - Choose payment method (Cash/GPay/Card)
   - Complete Razorpay payment (test mode)
   - Verify order appears in history

4. **Order Tracking:**
   - Place order as user
   - Login as admin to update status
   - Observe status changes in user dashboard

### Admin Testing

1. **Admin Login:**
   - Email: admin@pizzahub.com
   - Password: admin123

2. **Inventory Management:**
   - Update stock quantities
   - Verify low stock alerts (email when < threshold)

3. **Order Management:**
   - View all orders
   - Update order statuses
   - Monitor order flow

### Payment Testing

- **Cash on Delivery:** No payment processing required
- **Google Pay:** Simulated payment (shows confirmation)
- **Razorpay Card:** Use test card 4111 1111 1111 1111

---

## 🚀 Deployment Guide

### Backend Deployment

**Recommended Platforms:**
- Heroku, Railway, Render, AWS EC2, DigitalOcean

**Steps:**
1. Set environment variables in hosting platform
2. Ensure MongoDB connection string is configured
3. Run database seeding scripts on production DB
4. Deploy with `npm start`

### Frontend Deployment

**Recommended Platforms:**
- Vercel, Netlify, GitHub Pages

**Steps:**
1. Build the application: `npm run build`
2. Deploy the `build` folder contents
3. Configure API proxy to production backend URL

### Database Deployment

**MongoDB Atlas (Recommended):**
1. Create Atlas cluster
2. Configure network access
3. Create database user
4. Update MONGO_URI in environment variables

---

## 🔐 Security Features

### Authentication & Authorization
- **JWT Tokens:** Secure stateless authentication
- **Password Hashing:** bcrypt with salt rounds
- **Route Protection:** Middleware validation for admin routes
- **Token Expiration:** Automatic logout on token expiry

### Data Protection
- **Input Validation:** Server-side validation for all inputs
- **CORS Configuration:** Restricted cross-origin access
- **Environment Variables:** Sensitive data not in codebase
- **Error Handling:** No sensitive information in error responses

### Payment Security
- **Razorpay Integration:** Official SDK with signature verification
- **Test Mode:** Secure testing without real transactions
- **Payment Verification:** Server-side payment confirmation

---

## 🐛 Troubleshooting

### Common Issues & Solutions

1. **MongoDB Connection Error**
   ```
   Error: MongoDB connection failed
   ```
   **Solution:**
   - Ensure MongoDB is running: `mongod`
   - Check MONGO_URI in .env file
   - Verify network access for MongoDB Atlas

2. **Email Not Sending**
   ```
   Error: Email service failed
   ```
   **Solution:**
   - Verify SMTP credentials in .env
   - Check Gmail app password generation
   - Use Ethereal Email for testing

3. **Port Already in Use**
   ```
   Error: listen EADDRINUSE: address already in use
   ```
   **Solution:**
   ```bash
   # Find process using port
   netstat -ano | findstr :5000
   # Kill process
   taskkill /PID <PID> /F
   ```

4. **CORS Errors**
   ```
   Access to XMLHttpRequest blocked by CORS policy
   ```
   **Solution:**
   - Ensure backend has `app.use(cors())`
   - Check CLIENT_URL in backend .env

5. **Payment Failures**
   ```
   Razorpay payment verification failed
   ```
   **Solution:**
   - Verify Razorpay keys in both .env files
   - Check test mode configuration
   - Ensure webhook endpoints are correct

6. **Build Errors**
   ```
   Module not found: Can't resolve 'axios'
   ```
   **Solution:**
   - Run `npm install` in correct directory
   - Check node_modules folder exists
   - Clear npm cache: `npm cache clean --force`

### Development Tips
- Use `npm run dev` for auto-restart during development
- Check browser developer tools for frontend errors
- Monitor server console for backend errors
- Use MongoDB Compass for database inspection
- Test emails with Ethereal Email service

---

## 📊 Performance Optimization

### Backend Optimizations
- **Database Indexing:** Indexes on frequently queried fields
- **Connection Pooling:** Mongoose connection pooling
- **Caching:** Consider Redis for session storage
- **Rate Limiting:** Implement request rate limiting

### Frontend Optimizations
- **Code Splitting:** React.lazy for route-based splitting
- **Image Optimization:** Compress and lazy-load images
- **Bundle Analysis:** Use webpack-bundle-analyzer
- **Service Worker:** Implement for offline functionality

### Database Optimizations
- **Query Optimization:** Use MongoDB aggregation pipelines
- **Data Archiving:** Archive old orders periodically
- **Backup Strategy:** Regular automated backups

---

## 🔮 Future Enhancements

### Planned Features
- **Real-time Notifications:** WebSocket integration for instant updates
- **Mobile App:** React Native companion app
- **Advanced Analytics:** Sales reporting and analytics dashboard
- **Loyalty Program:** Points system for repeat customers
- **Multi-language Support:** Internationalization (i18n)
- **Dark Mode:** Theme switching capability

### Technical Improvements
- **Microservices Architecture:** Split into independent services
- **API Documentation:** Swagger/OpenAPI specification
- **Unit Testing:** Comprehensive test coverage
- **CI/CD Pipeline:** Automated deployment workflow
- **Containerization:** Docker support for easy deployment
- **Monitoring:** Application performance monitoring

### Business Features
- **Restaurant Management:** Multiple restaurant support
- **Delivery Tracking:** GPS-based delivery tracking
- **Customer Reviews:** Rating and feedback system
- **Promotional Codes:** Discount and coupon system
- **Subscription Model:** Meal plans and subscriptions

---

## 🤝 Contributing

### Development Workflow
1. **Fork the repository**
2. **Create feature branch:** `git checkout -b feature/new-feature`
3. **Make changes and test thoroughly**
4. **Commit changes:** `git commit -am 'Add new feature'`
5. **Push to branch:** `git push origin feature/new-feature`
6. **Create Pull Request**

### Code Standards
- Follow ESLint configuration
- Use meaningful commit messages
- Write comprehensive documentation
- Test all new features
- Maintain code coverage

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

### Permissions
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

### Limitations
- ❌ Liability
- ❌ Warranty

---

## 📞 Support & Contact

### Getting Help
1. **Check Documentation:** Review this comprehensive guide
2. **Troubleshooting Section:** Common issues and solutions
3. **GitHub Issues:** Report bugs or request features
4. **Community:** Join discussions and share experiences

### Contact Information
- **Project Repository:** GitHub repository URL
- **Documentation:** This comprehensive guide
- **Support:** Create GitHub issue for technical support

---

## 🎉 Conclusion

PizzaHub represents a complete, production-ready pizza delivery application built with modern web technologies. The project demonstrates full-stack development capabilities, from user authentication and payment processing to real-time inventory management and admin controls.

### Key Achievements
- ✅ **Full MERN Stack Implementation**
- ✅ **Secure Authentication System**
- ✅ **Dynamic Pricing Engine**
- ✅ **Multiple Payment Integration**
- ✅ **Real-time Order Tracking**
- ✅ **Comprehensive Admin Dashboard**
- ✅ **Responsive Mobile Design**
- ✅ **Production Deployment Ready**

### Learning Outcomes
This project provides hands-on experience with:
- Full-stack JavaScript development
- Database design and management
- API development and documentation
- Payment gateway integration
- Email service implementation
- State management in React
- Security best practices
- Deployment and DevOps

The application serves as an excellent portfolio piece demonstrating the ability to build complex, real-world web applications from concept to deployment.

---

**🍕 Happy Coding! Your PizzaHub is ready to serve delicious digital pizzas! 🚀**