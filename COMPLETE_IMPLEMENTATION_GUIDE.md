# 📦 Parcel Management System - Complete Implementation Guide

## 🎯 Project Overview
A full-stack **Parcel Management System** built with Spring Boot (Backend) and Angular (Frontend). This is a **beginner-friendly, production-ready** project demonstrating best practices in modern web development.

---

## ✨ Features Implemented

### 🔐 Authentication & Authorization
- ✅ Dual-role system: **User** and **Admin**
- ✅ Role-based access control (RBAC)
- ✅ Validation on login (password: 8+ chars, uppercase, lowercase, special char)
- ✅ Demo accounts for quick testing
- ✅ Logout functionality

### 📮 User Features
1. **Book Parcel** - Create new shipments with automatic cost calculation (₹5/kg)
2. **Track Parcel** - Real-time tracking with visual timeline
3. **Manage Orders** - View, update, cancel orders
4. **User Profile** - Edit personal & contact information
5. **Feedback** - Submit ratings and reviews for deliveries  
6. **Invoice** - Generate and download order invoices
7. **Search & Filter** - Find parcels by tracking ID

### 🛠️ Admin Features
1. **Dashboard** - Statistics and quick overview
2. **All Orders** - Manage all parcels in the system
3. **Update Status** - Change parcel status (CREATED → DELIVERED)
4. **Book for User** - Create parcels on behalf of users
5. **Search & Filter** - Find parcels across the system

### 💳 Payment System
- ✅ Multiple payment methods: Credit Card, Debit Card, UPI
- ✅ Validation with Luhn algorithm for card numbers
- ✅ Expiry date and CVV validation
- ✅ UPI ID format validation
- ✅ Mock payment processing

### ✔️ Input Validation
**Frontend & Backend validation:**
- Username (3-20 chars, alphanumeric + underscore)
- Password (8+ chars, uppercase, lowercase, special char)
- Email (valid email format)
- Phone (10 digits)
- Card details (Luhn, CVV, expiry)
- UPI ID (valid format)
- Address fields (non-empty)

---

## 🗂️ Project Structure

```
Parcel Management System/
├── parcel-management-backend/
│   ├── src/main/java/com/example/parcel/
│   │   ├── entity/           (Database models)
│   │   ├── dto/              (Data transfer objects)
│   │   ├── controller/       (REST endpoints)
│   │   ├── service/          (Business logic)
│   │   ├── repository/       (Database queries)
│   │   ├── security/         (Auth config)
│   │   ├── util/             (Validation utilities)
│   │   └── config/           (App configuration)
│   ├── src/main/resources/
│   │   └── application.yml   (Database & server config)
│   └── pom.xml               (Maven dependencies)
│
├── parcel-management-frontend/
│   ├── src/app/
│   │   ├── auth/             (Login component)
│   │   ├── dashboard/        (User & profile dashboards)
│   │   ├── admin/            (Admin dashboard)
│   │   ├── parcel/           (Parcel features)
│   │   ├── core/             (Guards, pipes, interceptors)
│   │   ├── app.routes.ts     (Route definitions)
│   │   └── app.component.ts  (Root component)
│   ├── src/styles.css        (Global styles)
│   ├── angular.json          (Angular config)
│   ├── package.json          (NPM dependencies)
│   └── tsconfig.json         (TypeScript config)
│
└── database/
    └── schema.sql            (Database schema)
```

---

## 🚀 Quick Start

### Prerequisites
- **Java 21** (Backend)
- **Node.js 20 LTS** (Frontend)
- **MySQL 8.0+** (Database)
- **Maven 3.8+** (Build tool)
- **Angular CLI** (Frontend build tool)

### 1️⃣ Database Setup
```sql
-- Create database
CREATE DATABASE IF NOT EXISTS parcel_db;
USE parcel_db;

-- Run schema (from database/schema.sql)
-- Tables will be auto-created by Hibernate on first run
```

### 2️⃣ Backend Setup
```bash
# Navigate to backend
cd "E:\Code\Parcel Management System\parcel-management-backend"

# Install dependencies and compile
mvn clean install

# Start the server
mvn spring-boot:run
```

**Backend runs on:** `http://localhost:8080`

### 3️⃣ Frontend Setup
```bash
# Navigate to frontend
cd "E:\Code\Parcel Management System\parcel-management-frontend"

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend runs on:** `http://localhost:4200`

---

## 🔓 Demo Credentials

| Role   | Username | Password   |
|--------|----------|-----------|
| Admin  | `admin`  | `admin123` |
| User   | `user`   | `user123`  |

**Note:** Passwords follow security best practices:
- Minimum 8 characters
- 1 uppercase letter
- 1 lowercase letter
- 1 special character (@#$%^&+=!)

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/login         - User login
POST   /api/auth/register      - User registration
```

### Parcels (User)
```
POST   /api/parcels                 - Book a new parcel
GET    /api/parcels                 - List user's parcels
GET    /api/parcels/{id}            - Get parcel details
GET    /api/parcels/track/{trackingId} - Track by ID
PUT    /api/parcels/{id}            - Update parcel
POST   /api/parcels/{id}/cancel     - Cancel parcel
GET    /api/parcels/{id}/invoice    - Get invoice
```

### Parcels (Admin)
```
GET    /api/parcels/admin/all       - List all parcels
PUT    /api/parcels/admin/{id}/status - Update status
```

### User Profile
```
GET    /api/users/profile           - Get profile
PUT    /api/users/profile           - Update profile
```

### Feedback
```
POST   /api/feedback                - Submit feedback
GET    /api/feedback/{parcelId}     - Get feedback for parcel
```

### Payments
```
POST   /api/payments/validate       - Validate payment details
POST   /api/payments/update-status  - Update payment status
```

---

## 💾 Database Schema

### users
```sql
- id (PK)
- username (UNIQUE)
- password (hashed)
- email
- phone
- address
- city, state, zipCode
- role (ROLE_USER / ROLE_ADMIN)
- createdAt, updatedAt
```

### parcels
```sql
- id (PK)
- trackingId (UNIQUE)
- sender_id (FK to users)
- pickupAddress, pickupCity, pickupContactInfo
- dropLocation, dropCity, dropContactInfo
- weight (kg)
- cost (₹)
- pickupDate
- status (CREATED, PENDING, IN_TRANSIT, OUT_FOR_DELIVERY, DELIVERED, CANCELLED)
- cancelReason
- createdAt, updatedAt
```

### payments
```sql
- id (PK)
- parcel_id (FK to parcels)
- amount (₹)
- method (CREDIT_CARD, DEBIT_CARD, UPI)
- status (PAYMENT_PENDING, CONFIRMED, PAYMENT_FAILED)
- transactionId
- createdAt, updatedAt
```

### feedback
```sql
- id (PK)
- parcel_id (FK to parcels)
- user_id (FK to users)
- rating (1-5)
- comment (text)
- createdAt
```

---

## 🔒 Security Features

### Backend
- ✅ Basic Authentication with Base64 encoding
- ✅ Password hashing using BCrypt
- ✅ CORS enabled for frontend communication
- ✅ Input validation on all endpoints
- ✅ Authorization checks on protected routes

### Frontend
- ✅ Route guards based on user role
- ✅ Auth interceptor for API calls
- ✅ localStorage for token management
- ✅ Form validation before submission
- ✅ Role-based UI rendering

### Validation Utilities
- ✅ `ValidationUtil.java` with regex patterns
- ✅ Luhn algorithm for credit cards
- ✅ Email format validation
- ✅ Phone number validation
- ✅ UPI ID validation

---

## 📊 Cost Calculation
```
Cost = Weight (kg) × ₹5/kg
Example: 10 kg parcel = ₹50
```

---

## 🎨 UI/UX Design

### Design Principles
- **Modern Gradient**: Purple-blue gradient theme
- **Responsive**: Works on desktop, tablet, mobile
- **Dark Mode Ready**: Light backgrounds with contrast
- **Accessibility**: Clear labels, keyboard navigation
- **User-friendly**: Intuitive navigation, clear CTAs

### Color Scheme
- **Primary**: #667eea (Purple-Blue)
- **Secondary**: #764ba2 (Deep Purple)
- **Success**: #28a745 (Green)
- **Error**: #dc3545 (Red)
- **Background**: #f5f5f5 (Light Gray)

---

## 🧪 Testing the Application

### Test User Workflow
1. **Login** → Use `user / user123`
2. **Book Parcel** → Fill form with test data
3. **View Cost** → Should calculate ₹5/kg
4. **Track Parcel** → Use generated tracking ID
5. **View Orders** → See all your parcels
6. **Submit Feedback** → Rate the delivery

### Test Admin Workflow
1. **Login** → Use `admin / admin123`
2. **View Dashboard** → See statistics
3. **Manage Orders** → View all parcels
4. **Update Status** → Change order status
5. **Book for User** → Create parcel for another user

### Test Payment Validation
**Valid Test Cards:**
- `4532015112830366` (Visa)
- `5425233010103442` (Mastercard)
- CVV: Any 3 digits (100-999)
- Expiry: Any future date (MM/YY)

**Valid Test UPI:**
- `user@okhdfcbank`
- `admin@ybl`

---

## 🐛 Common Issues & Solutions

### Issue: "java.lang.ExceptionInInitializerError"
**Solution:** Ensure Java 21 is installed and properly configured

### Issue: "MySQL connection refused"
**Solution:** 
```bash
# Start MySQL service
mysql.server start  # macOS
sudo systemctl start mysql  # Linux
# Check credentials in application.yml
```

### Issue: "Port 8080 already in use"
**Solution:** Change port in `application.yml`
```yaml
server:
  port: 8081  # Changed from 8080
```

### Issue: "Angular module not found"
**Solution:**
```bash
cd parcel-management-frontend
npm install
```

---

## 📚 Learning Resources

### Backend (Spring Boot)
- Entities → ORM mapping
- Repositories → Database queries
- Services → Business logic
- Controllers → REST endpoints
- Security → Authentication & authorization

### Frontend (Angular)
- Components → Standalone components
- Routing → Route guards, navigation
- Services → HTTP calls, state management
- Forms → FormsModule, validation
- Pipes → Custom data transformation
- Interceptors → Request/response handling

---

## 📝 Code Quality

### Best Practices Implemented
- ✅ Clean Architecture (separation of concerns)
- ✅ SOLID Principles
- ✅ DRY (Don't Repeat Yourself)
- ✅ Meaningful naming conventions
- ✅ Proper error handling
- ✅ Input validation on both ends
- ✅ Responsive design
- ✅ Accessibility compliance

---

## 🚀 Deployment

### Backend Deployment (Docker)
```dockerfile
FROM openjdk:21
COPY target/parcel-app.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

### Frontend Deployment (Nginx)
```bash
npm run build
# Deploy 'dist' folder to Nginx
```

---

## 🎓 Educational Value

This project demonstrates:
1. **Full-stack Development** - Frontend to backend integration
2. **REST API Design** - RESTful endpoint design
3. **Database Design** - Schema and relationships
4. **Authentication** - User management and security
5. **Validation** - Input validation patterns
6. **UI/UX** - Modern responsive design
7. **Version Control** - Git workflow
8. **Best Practices** - Code organization and structure

---

## 📞 Support

For issues or questions:
1. Check application logs
2. Verify database connectivity
3. Ensure all services are running
4. Check browser console for frontend errors
5. Review network tab in DevTools for API errors

---

## 📄 License
This is a beginner-friendly educational project designed for learning purposes.

---

## ✨ Next Steps

After running the project:
1. Explore the code structure
2. Try all features with demo accounts
3. Modify forms and components
4. Add new features
5. Deploy to a server
6. Learn from the implementation patterns

---

**Happy coding! 🚀**

