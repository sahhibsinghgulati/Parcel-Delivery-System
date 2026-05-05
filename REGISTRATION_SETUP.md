# Parcel Management System - Login & Registration Fix Guide

## Summary of Changes Made

### 1. Frontend - New Registration Component
**Created:** `parcel-management-frontend/src/app/auth/register.component.ts`

Features:
- Complete user registration form with the following fields:
  - Full Name
  - Email
  - Phone Number (10 digits)
  - Address (textarea)
  - Username (3-20 alphanumeric + underscore)
  - Password (8+ chars, uppercase, lowercase, special char)
  - Confirm Password (must match)
- Real-time validation with error messages
- Professional styling matching the login page
- Auto-redirect to login after successful registration

### 2. Frontend - Updated Routes
**Updated:** `parcel-management-frontend/src/app/app.routes.ts`

- Added route: `{ path: 'register', component: RegisterComponent }`
- Now users can navigate to /register page

### 3. Frontend - Updated Login Component
**Updated:** `parcel-management-frontend/src/app/auth/login.component.ts`

- Added link: "Don't have an account? Sign Up"
- Added method: `goToRegister()` to navigate to registration
- Users can now click the link to create a new account

### 4. Backend - User Entity Enhancement
**Updated:** `parcel-management-backend/src/main/java/com/example/parcel/entity/User.java`

- Added field: `private String name;`
- Now stores user's full name in the database

### 5. Backend - RegisterRequest DTO
**Updated:** `parcel-management-backend/src/main/java/com/example/parcel/dto/RegisterRequest.java`

- Added fields: `name`, `phone`, `address`
- These fields are now captured during registration

### 6. Backend - AuthService Enhancement
**Updated:** `parcel-management-backend/src/main/java/com/example/parcel/service/AuthService.java`

- Added phone validation: `ValidationUtil.isValidPhone(request.getPhone())`
- Now saves all user details: name, phone, address
- Validates before saving to database

### 7. Backend - Demo Data Config
**Updated:** `parcel-management-backend/src/main/java/com/example/parcel/config/DemoDataConfig.java`

- Updated demo users to include all new fields:
  - Admin User: admin / admin123 (email: admin@parcel.com)
  - Test User: user / user123 (email: user@parcel.com)

## How to Use

### Step 1: Start the Backend
The demo data configuration will automatically create the demo users when the backend starts:

```bash
cd "E:\Code\Parcel Management System\parcel-management-backend"
mvn spring-boot:run
```

The backend will:
1. Create/update the database schema
2. Add a `name` column to the users table
3. Automatically seed demo users (admin and user)
4. Start on http://localhost:8080

### Step 2: Start the Frontend
```bash
cd "E:\Code\Parcel Management System\parcel-management-frontend"
npm start
```

Frontend will start on http://localhost:4200

### Step 3: Login or Register

**Option A: Quick Login (Demo Users)**
1. Go to http://localhost:4200/login
2. Click "User Demo" or "Admin Demo" button
3. Credentials shown:
   - Admin: admin / admin123
   - User: user / user123

**Option B: Register New Account**
1. Go to http://localhost:4200/login
2. Click "Sign Up" link below the login form
3. Or navigate to http://localhost:4200/register
4. Fill in all fields:
   - Full Name: Your name
   - Email: valid@email.com
   - Phone: 10 digits (e.g., 9876543210)
   - Address: Your address
   - Username: 3-20 chars, alphanumeric + underscore
   - Password: 8+ chars with uppercase, lowercase, special char (e.g., @#$%^&+=!)
   - Confirm Password: Must match password
5. Click "Create Account"
6. You'll be redirected to login
7. Login with your new credentials

## Validation Rules

### Frontend Validation
- All fields are required
- Real-time error messages
- Shows validation hints for each field

### Backend Validation (Double-Layer Security)

**Username:**
- Pattern: `^[a-zA-Z0-9_]{3,20}$`
- 3-20 characters
- Alphanumeric + underscore only
- Must be unique

**Password:**
- Pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$`
- Minimum 8 characters
- Must contain uppercase letter
- Must contain lowercase letter
- Must contain special character (@#$%^&+=!)

**Email:**
- Valid email format
- Must match standard email pattern
- Unique in database

**Phone:**
- Exactly 10 digits
- Pattern: `^[0-9]{10}$`

**Name & Address:**
- Required, no length limit
- Free text input

## Database Schema Update

When the backend starts with these changes:
1. It will attempt to add a `name` column to the `users` table
2. The `users` table schema will be:
   ```
   - id (BIGINT, Primary Key)
   - username (VARCHAR, Unique)
   - password (VARCHAR)
   - email (VARCHAR, Unique)
   - name (VARCHAR)
   - phone (VARCHAR)
   - address (VARCHAR)
   - city (VARCHAR)
   - state (VARCHAR)
   - zipCode (VARCHAR)
   - role (VARCHAR)
   - created_at (DATETIME)
   - updated_at (DATETIME)
   ```

## Troubleshooting

### Issue: Database still shows empty users table

**Solution:**
1. Make sure backend is running: `mvn spring-boot:run`
2. Wait for "Successfully initialized Spring Data JPA..." message
3. Look for "Demo data seeded" or similar message in backend console
4. Check MySQL for table creation: `USE parcel_db; SELECT * FROM users;`

### Issue: Login fails even with demo credentials

**Solutions:**
1. Verify backend is running on port 8080
2. Check MySQL is running and `parcel_db` database exists
3. Verify MySQL connection details in `application.yml`:
   - URL: jdbc:mysql://localhost:3306/parcel_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   - Username: root
   - Password: root

### Issue: Registration fails with error

**Check error message:**
- "Username is already taken" → Choose different username
- "Email is already registered" → Use different email
- "Phone must be exactly 10 digits" → Enter exactly 10 digits
- "Invalid email format" → Use valid email (user@domain.com)
- "Password must be at least 8 characters..." → Follow password rules
- "Passwords do not match" → Ensure both password fields match

### Issue: Port 4200 already in use

**Solution:**
1. Kill existing Angular process
2. Or specify different port: `ng serve --port 4201`

### Issue: Port 8080 already in use

**Solution:**
1. Kill existing Java process
2. Or change port in `application.yml`:
   ```yaml
   server:
     port: 8081  # Change to different port
   ```

## Quick Start (All Steps)

**Complete Setup in 5 minutes:**

1. Open first PowerShell window:
   ```bash
   cd E:\Code\Parcel\ Management\ System\parcel-management-backend
   mvn spring-boot:run
   # Wait for: "Tomcat started on port 8080"
   ```

2. Open second PowerShell window:
   ```bash
   cd E:\Code\Parcel\ Management\ System\parcel-management-frontend
   npm start
   # Wait for: "Application bundle generation complete"
   ```

3. Open browser:
   - Visit http://localhost:4200
   - Click "User Demo" to quick login
   - Or click "Sign Up" to create new account

## Success Indicators

### Backend Started Successfully
```
Started ParcelApplication in X.XXX seconds
Demo data loaded successfully
```

### Frontend Started Successfully
```
✓ Application bundle generation complete
√ Browser application bundle generation complete
```

### Login Successful (Demo User)
- Redirects to /user-dashboard or /admin-dashboard
- Shows user welcome message
- Can navigate to features

### Registration Successful
- Shows "Account created successfully!" message
- Redirects to login page
- Can login with new credentials

## Architecture

```
Frontend (Angular 17)
  ├── Register Component (NEW)
  ├── Login Component (Updated)
  └── Routes (Updated to include /register)
  
Backend (Spring Boot)
  ├── AuthController (/api/auth/register, /api/auth/login)
  ├── AuthService (registerUser, validateLogin)
  ├── User Entity (Added 'name' field)
  ├── RegisterRequest DTO (Added name, phone, address)
  ├── ValidationUtil (Phone validation)
  └── DemoDataConfig (Seeds demo users on startup)

Database (MySQL)
  └── users table (auto-created with all fields)
```

---

**Created:** 2026-05-05  
**System:** Parcel Management System v2.0 with Registration Support

