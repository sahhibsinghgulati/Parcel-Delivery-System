# System Architecture & Flow Diagrams

## User Registration & Login Flow

```
┌────────────────────────────────────────────────────────────────┐
│                    PARCEL MANAGEMENT SYSTEM                     │
└────────────────────────────────────────────────────────────────┘

NEW USER JOURNEY:
================

   [ Visit App ]
         ↓
   [ Login Page ]
         ↓
   [ NO Account ]
    Click "Sign Up"
         ↓
   [ Registration Page ]
         ↓
   [ Fill 7 Fields ]
   ├─ Full Name
   ├─ Email
   ├─ Phone (10 digits)
   ├─ Address
   ├─ Username (3-20 chars)
   ├─ Password (strong)
   └─ Confirm Password
         ↓
   [ Frontend Validates ]
   ├─ All fields filled?
   ├─ Valid email?
   ├─ Phone = 10 digits?
   ├─ Username pattern OK?
   ├─ Password strong?
   └─ Passwords match?
         ↓
   [ Show errors or enable Submit ]
         ↓
   [ Click "Create Account" ]
         ↓
   [ POST /api/auth/register ]
         ↓
   [ Backend Validates ]
   ├─ Phone validation
   ├─ Username not taken?
   ├─ Email not taken?
   └─ Password rules OK?
         ↓
   [ Backend Processes ]
   ├─ Encode password with BCrypt
   ├─ Create new User entity
   └─ Save to database
         ↓
   [ Return Success ]
         ↓
   [ Redirect to Login ]
         ↓
   [ Try with New Account ]
         ↓
   [ Login Success → Dashboard ]


EXISTING USER JOURNEY:
======================

   [ Visit App ]
         ↓
   [ Login Page ]
         ↓
   [ Click Demo Button ] OR [ Enter Credentials ]
         ↓
   [ Frontend encodes to Base64 ]
         ↓
   [ POST /api/auth/login ]
   {
     username: "admin",
     password: "admin123"
   }
         ↓
   [ Backend finds User by username ]
         ↓
   [ Backend compares password with BCrypt ]
         ↓
   [ Password matches? ]
    ├─ YES → Return role (ROLE_ADMIN/ROLE_USER)
    └─ NO → Return error "Invalid credentials"
         ↓
   [ Frontend stores token and role ]
         ↓
   [ Redirect based on role ]
    ├─ ROLE_ADMIN → /admin-dashboard
    └─ ROLE_USER → /user-dashboard
         ↓
   [ Dashboard loads with auth guard ]
         ↓
   [ User can access features ]
```

---

## Database Schema

```
┌─────────────────────────────────────────────┐
│              DATABASE: parcel_db             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│                users TABLE                   │
├─────────────────────────────────────────────┤
│ id               │ BIGINT (Primary Key)     │
│ username         │ VARCHAR (Unique)         │
│ password         │ VARCHAR (Hashed)         │
│ email            │ VARCHAR (Unique)         │
│ name             │ VARCHAR (NEW)            │
│ phone            │ VARCHAR                  │
│ address          │ VARCHAR                  │
│ city             │ VARCHAR                  │
│ state            │ VARCHAR                  │
│ zipCode          │ VARCHAR                  │
│ role             │ VARCHAR (ENUM)           │
│                  │ ROLE_USER / ROLE_ADMIN  │
│ created_at       │ DATETIME                 │
│ updated_at       │ DATETIME                 │
└─────────────────────────────────────────────┘

SAMPLE DATA:
1. id=1
   username=admin
   password=[hashed: admin123]
   email=admin@parcel.com
   name=Admin User (NEW)
   phone=9876543210
   address=123 Admin Street (NEW)
   city=Delhi (NEW)
   state=Delhi (NEW)
   zipCode=110001 (NEW)
   role=ROLE_ADMIN
   created_at=2026-05-05 10:00:00

2. id=2
   username=user
   password=[hashed: user123]
   email=user@parcel.com
   name=Test User (NEW)
   phone=9123456789
   address=456 User Avenue (NEW)
   city=Mumbai (NEW)
   state=Maharashtra (NEW)
   zipCode=400001 (NEW)
   role=ROLE_USER
   created_at=2026-05-05 10:00:00

3. id=3 (Example registered user)
   username=john_doe99
   password=[hashed: MyPass@2024]
   email=john@example.com
   name=John Doe
   phone=9876543210
   address=123 Main Street
   city=Delhi
   state=Delhi
   zipCode=110001
   role=ROLE_USER
   created_at=2026-05-05 15:30:00
```

---

## Component Architecture

```
┌────────────────────────────────────────────────┐
│         FRONTEND (Angular)                      │
│         http://localhost:4200                  │
└────────────────────────────────────────────────┘

app.component (Root)
│
├── routes (app.routes.ts)
│
├── /login
│   └── LoginComponent
│       ├── Template: Login form + Demo buttons
│       ├── Styles: Gradient theme
│       └── Logic: Basic Auth encryption, redirect
│
├── /register (NEW)
│   └── RegisterComponent (NEW)
│       ├── Template: 7-field registration form
│       ├── Styles: Matching theme
│       ├── Validation: Real-time error display
│       └── Logic: Form submission to /api/auth/register
│
├── /user-dashboard
│   └── UserDashboardComponent
│
├── /user/book-parcel
│   └── BookParcelComponent
│       └── Uses: FilterPipe, CountByStatusPipe
│
├── /user/track-parcel
│   └── TrackParcelComponent
│
├── /user/manage-orders
│   └── ManageOrdersComponent
│       └── Uses: FilterPipe
│
├── /user/profile
│   └── UserProfileComponent
│
├── /admin-dashboard
│   └── AdminDashboardComponent
│       └── Uses: FilterPipe, CountByStatusPipe
│
├── core/
│   ├── auth.guard.ts - Route protection
│   ├── auth.interceptor.ts - Request authentication
│   ├── filter.pipe.ts (NEW) - Search functionality
│   └── count-by-status.pipe.ts (NEW) - Statistics
│
└── services/
    └── (HTTP calls to backend)


┌────────────────────────────────────────────────┐
│         BACKEND (Spring Boot)                   │
│         http://localhost:8080                  │
└────────────────────────────────────────────────┘

ParcelApplication (Main)
│
├── ✓ AuthController
│   ├── @PostMapping /auth/register - NEW ENDPOINT
│   │   └── Body: RegisterRequest (with name, phone, address)
│   │   └── Response: "User registered successfully"
│   │
│   └── @PostMapping /auth/login
│       └── Body: AuthRequest
│       └── Response: User role + username
│
├── ✓ AuthService
│   ├── registerUser() - ENHANCED
│   │   ├─ Validate username, password, email, phone
│   │   ├─ Check uniqueness
│   │   ├─ Encode password
│   │   └─ Save complete user profile (name, phone, address)
│   │
│   └── validateLogin()
│       └─ Find user, check password
│
├── ✓ UserRepository
│   ├─ findByUsername(String)
│   └─ findByEmail(String)
│
├── ✓ User Entity
│   ├─ id
│   ├─ username (unique)
│   ├─ password (hashed)
│   ├─ email (unique)
│   ├─ name (NEW FIELD)
│   ├─ phone
│   ├─ address
│   ├─ city
│   ├─ state
│   ├─ zipCode
│   ├─ role (ENUM)
│   ├─ created_at
│   └─ updated_at
│
├── ✓ RegisterRequest (DTO) - ENHANCED
│   ├─ username
│   ├─ password
│   ├─ email
│   ├─ name (NEW)
│   ├─ phone (NEW)
│   ├─ address (NEW)
│   └─ role
│
├── ✓ ValidationUtil
│   ├─ isValidUsername()
│   ├─ isValidPassword()
│   ├─ isValidEmail()
│   ├─ isValidPhone() ← Used in registration
│   └─ (+ other validators)
│
├── ✓ DemoDataConfig - ENHANCED
│   ├─ Seeds admin user (auto on startup)
│   │   └─ Now with name, address, city, state, zip
│   │
│   └─ Seeds test user (auto on startup)
│       └─ Now with name, address, city, state, zip
│
└── (Other controllers & services for parcels, payments, etc.)


┌────────────────────────────────────────────────┐
│         DATABASE (MySQL)                        │
│         jdbc:mysql://localhost:3306/parcel_db  │
└────────────────────────────────────────────────┘

users table ← MAIN TABLE FOR REGISTRATION
```

---

## Data Flow: Registration

```
┌─ FRONTEND ─────────────────────────────────────────────────────┐
│                                                                 │
│  User fills 7 fields:                                          │
│  ├─ Full Name:       John Doe                                  │
│  ├─ Email:           john@example.com                          │
│  ├─ Phone:           9876543210                                │
│  ├─ Address:         123 Main Street                           │
│  ├─ Username:        john_doe99                                │
│  ├─ Password:        MyPass@2024                               │
│  └─ Confirm Pass:    MyPass@2024                               │
│                                                                 │
│  ↓ Frontend validates ↓                                         │
│                                                                 │
│  POST /api/auth/register                                       │
│  Content-Type: application/json                                │
│  Body: {                                                        │
│    "username": "john_doe99",                                   │
│    "password": "MyPass@2024",                                  │
│    "email": "john@example.com",                                │
│    "name": "John Doe",                                         │
│    "phone": "9876543210",                                      │
│    "address": "123 Main Street",                               │
│    "role": "ROLE_USER"                                         │
│  }                                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─ BACKEND ─────────────────────────────────────────────────────┐
│                                                                 │
│  AuthController receives request                              │
│  ↓                                                             │
│  AuthService.registerUser(RegisterRequest):                   │
│  ├─ Validate username format ✓                               │
│  ├─ Validate password strength ✓                             │
│  ├─ Validate email format ✓                                  │
│  ├─ Validate phone format ✓                                  │
│  ├─ Check username not taken ✓                               │
│  │  └─ Query: findByUsername("john_doe99") → Optional.empty  │
│  ├─ Check email not taken ✓                                  │
│  │  └─ Query: findByEmail("john@example.com") → Optional.empty
│  │                                                             │
│  ├─ Create User entity                                        │
│  │  └─ User.builder()                                         │
│  │     .username("john_doe99")                                │
│  │     .password(BCrypt.encode("MyPass@2024"))               │
│  │     .email("john@example.com")                             │
│  │     .name("John Doe") ← NEW                                │
│  │     .phone("9876543210") ← NEW                             │
│  │     .address("123 Main Street") ← NEW                      │
│  │     .role(ROLE_USER)                                       │
│  │     .createdAt(LocalDateTime.now())                        │
│  │     .build()                                               │
│  │                                                             │
│  ├─ Save to database                                          │
│  │  └─ userRepository.save(user)                              │
│  │     ↓ Hibernate INSERT                                     │
│  │     INSERT INTO users 
│  │     (username, password, email, name, phone, ...)
│  │     VALUES ('john_doe99', '...hashed...', ...)
│  │                                                             │
│  └─ Return success response                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─ DATABASE ─────────────────────────────────────────────────────┐
│                                                                 │
│  INSERT new row in users table:                                │
│                                                                 │
│  id             3                                              │
│  username       john_doe99                                     │
│  password       $2a$10$... (BCrypt hashed)                    │
│  email          john@example.com                              │
│  name           John Doe                      ← NEW FIELD     │
│  phone          9876543210                    ← NEW FIELD     │
│  address        123 Main Street               ← NEW FIELD     │
│  city           NULL (not provided)                            │
│  state          NULL (not provided)                            │
│  zipCode        NULL (not provided)                            │
│  role           ROLE_USER                                      │
│  created_at     2026-05-05 15:30:00.000                       │
│  updated_at     NULL                                           │
│                                                                 │
│  Status: ✓ RECORD CREATED                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─ FRONTEND ─────────────────────────────────────────────────────┐
│                                                                 │
│  Response: {"message": "User registered successfully"}        │
│                                                                 │
│  ✓ Success message displayed                                  │
│  ✓ Browser redirects to /login (auto after 2 seconds)        │
│                                                                 │
│  User can now:                                                 │
│  Login with: john_doe99 / MyPass@2024                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Validation Rules Visualization

```
REGISTRATION VALIDATION RULES:
══════════════════════════════

┌─── USERNAME ───────────────┐
│ Pattern: ^[a-zA-Z0-9_]{3,20}$
│ ✓ john_doe99      (10 chars)
│ ✓ admin_2024      (10 chars)
│ ✓ u_s_e_r         (8 chars)
│ ✗ ab              (too short)
│ ✗ john@email      (special char @)
│ ✗ user-name       (special char -)
└────────────────────────────┘

┌─── PASSWORD ───────────────┐
│ Pattern: 
│ ^(?=.*[a-z])              (lowercase)
│ (?=.*[A-Z])               (uppercase)
│ (?=.*[@#$%^&+=!])         (special)
│ .{8,}                     (8+ chars)
│
│ ✓ MyPass@123
│ ✓ Secure#Pass99
│ ✓ P@ssw0rd_123
│
│ ✗ password        (no uppercase/special)
│ ✗ MYPASSWORD      (no lowercase/special)
│ ✗ Pass@1          (too short)
│ ✗ mypass@         (no uppercase)
└────────────────────────────┘

┌─── EMAIL ──────────────────┐
│ Pattern: Standard email
│ ✓ user@gmail.com
│ ✓ john.doe@company.org
│ ✓ email+tag@domain.co.uk
│ ✗ user@
│ ✗ @domain.com
│ ✗ user domain.com
└────────────────────────────┘

┌─── PHONE ──────────────────┐
│ Pattern: ^[0-9]{10}$
│ ✓ 9876543210      (exactly 10)
│ ✓ 1234567890      (exactly 10)
│ ✗ 123456789       (only 9)
│ ✗ 98765432100     (11 digits)
│ ✗ 987654321a      (has letter)
└────────────────────────────┘

┌─── NAME & ADDRESS ─────────┐
│ • Required (not empty)
│ • No length limit
│ • Can contain any characters
│ • Examples:
│   - Name: "John Doe", "राज कुमार"
│   - Address: "123 Main St #4B"
└────────────────────────────┘
```

---

## Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│              SECURITY IMPLEMENTATION                             │
└─────────────────────────────────────────────────────────────────┘

LAYER 1: FRONTEND VALIDATION
════════════════════════════════
User fills registration form
    ↓
JavaScript validates locally:
├─ All fields required?
├─ Email format valid?
├─ Phone = 10 digits?
├─ Username matches pattern?
├─ Password strong enough?
└─ Passwords match?
    ↓
Before sending to server:
├─ Show error if validation fails
└─ Only send if ALL valid

BENEFIT: Better UX, faster feedback
LIMITATION: Can be bypassed by hacker


LAYER 2: BACKEND VALIDATION
════════════════════════════════
Server receives POST /api/auth/register
    ↓
Backend validates again:
├─ Validate username syntax
├─ Validate password strength
├─ Validate email format
├─ Validate phone format
├─ Check username not taken (database query)
└─ Check email not taken (database query)
    ↓
If ANY validation fails:
├─ Reject request
└─ Return error message

BENEFIT: Security! Can't bypass frontend
REASON: Even if hacker intercepts and modifies request


LAYER 3: DATABASE CONSTRAINTS
════════════════════════════════
MySQL enforces:
├─ username UNIQUE → Can't have 2 usernames
├─ email UNIQUE → Can't have 2 emails
└─ NOT NULL → Required fields can't be empty

BENEFIT: Last-line defense against bad data


LAYER 4: PASSWORD HASHING
════════════════════════════════
User enters: "MyPass@2024"
    ↓
Backend uses BCrypt to hash:
├─ One-way function (can't reverse)
├─ Different hash every time (salt)
├─ Slow by design (prevents brute force)

Stored in database: "$2a$10$..."
    ↓
During login:
├─ User enters: "MyPass@2024"
├─ BCrypt compares with stored hash
├─ If match → Login success
└─ If no match → Login fail

BENEFIT: Even if database stolen, passwords safe


COMBINED SECURITY:
═══════════════════════════════════════════════════════════════════
Frontend ↔ Backend ↔ Database = DEFENSE IN DEPTH

✓ Hacker can't bypass frontend (backend validates)
✓ Hacker can't bypass backend (database validates)
✓ Hacker can't hack password (BCrypt hashes)
✓ Hacker can't use stolen password (one-way hash)
```

---

## Startup Sequence

```
WHEN YOU RUN: mvn spring-boot:run
═════════════════════════════════════════════════════════════

1. Maven loads dependencies
   ├─ Spring Boot framework
   ├─ Hibernate ORM
   ├─ MySQL JDBC driver
   └─ (and 50+ others)

2. Spring Context initializes
   ├─ Load @Configuration classes
   ├─ Create Spring beans
   ├─ Initialize component scanning
   └─ Set up dependency injection

3. Hibernate initializes
   ├─ Parse @Entity classes (User, Parcel, Payment, etc.)
   ├─ Generate SQL
   ├─ Connect to MySQL
   └─ Check table structure

4. Database Schema Migration
   ├─ Check: Does 'users' table exist?
   │  └─ NO → Create it
   │  └─ YES → Check columns
   │
   ├─ Check: Does 'name' column exist?
   │  └─ NO → Add it with: ALTER TABLE users ADD COLUMN name VARCHAR(255)
   │  └─ YES → Continue
   │
   └─ Check: Do other tables exist?
      ├─ parcels → Create if missing
      ├─ payments → Create if missing
      └─ feedback → Create if missing

5. DemoDataConfig runs (CommandLineRunner)
   ├─ Check: Does 'admin' user exist?
   │  └─ NO → Create: User(username=admin, password=hashed, ...)
   │  └─ YES → Skip (already exists)
   │
   ├─ Check: Does 'user' exist?
   │  └─ NO → Create: User(username=user, password=hashed, ...)
   │  └─ YES → Skip (already exists)
   │
   └─ Check: Any parcels exist?
      └─ NO → Create sample parcel → YES → Skip

6. Server starts
   ├─ Tomcat servlet container starts
   ├─ Listen on port 8080
   ├─ Load all @RestController
   ├─ Register all @RequestMapping endpoints
   └─ Ready to accept requests

7. Console output:
   "Tomcat started on port(s): 8080 (http)"
   "Started ParcelApplication in X.XXX seconds"

DONE! ✓ Backend ready


WHEN YOU RUN: ng serve
═════════════════════════════════════════════════════════════

1. Angular CLI initializes
   ├─ Load angular.json configuration
   ├─ Load project settings
   └─ Set up webpack

2. Webpack bundles application
   ├─ Bundle vendor code (Angular, RxJS, etc.)
   ├─ Bundle polyfills (browser compatibility)
   ├─ Bundle main application code
   ├─ Bundle styles (CSS)
   └─ Create source maps (for debugging)

3. Dev server starts
   ├─ Serve files from memory (fast)
   ├─ Watch for file changes
   ├─ Auto-rebuild on change
   ├─ Live reload browser
   └─ Listen on port 4200

4. Console output:
   "✓ Application bundle generation complete"
   "Angular Live Development Server is listening on localhost:4200"

DONE! ✓ Frontend ready

Now visit: http://localhost:4200/login
```

---

## Communication Diagram

```
BROWSER (Frontend)          SPRING BOOT (Backend)        MYSQL (Database)
───────────────────        ──────────────────            ─────────────────

User fills form
    │
    ├─ POST /api/auth/register ──────────────────→ AuthController
    │  (JSON body with all 7 fields)              receives request
    │                                              │
    │                                              AuthService
    │                                              ├─ Validate
    │                                              ├─ Check unique
    │                                              └─ Hash password
    │                                                   │
    │                                                   ├─ Save User ─────────→ users table
    │                                                   │                       INSERT
    │                                                   │  
    │  Response 200 OK ←────────────────────────────────┤
    │  {                                                │
    │    "message": "User registered successfully"     │
    │  }                                                │
    │
    └─ Redirect to /login
    
    
Later... User tries login:

    ├─ POST /api/auth/login ────────────────────→ AuthController
    │  {                                           receives request
    │    "username": "john_doe99",                │
    │    "password": "MyPass@2024"                AuthService
    │  }                                           ├─ Find by username
    │                                              │
    │                                              └─ Query database ──────→ SELECT * WHERE username
    │  ←────────────────────────────────────────────────┤                  FROM users
    │                                                    │ ←──────────────────
    │                                                    User record returned
    │                                                    │
    │                                                    Compare password
    │                                                    (using BCrypt)
    │                                                    │
    │  Response 200 OK ←────────────────────────────────┤
    │  {                                                │
    │    "username": "john_doe99",                      │
    │    "role": "ROLE_USER",                          │
    │    "message": "Login Successful"                 │
    │  }                                                │
    │
    └─ Redirect to /user-dashboard
```

---

**All diagrams show how the registration and login systems work together with proper validation, security, and database integration.**

