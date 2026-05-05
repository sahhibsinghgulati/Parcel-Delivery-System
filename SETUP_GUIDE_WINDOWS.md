# 🚀 Parcel Management System - Step-by-Step Setup Guide (Windows)

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- [ ] Java 21 installed
- [ ] MySQL 8.0+ installed and running
- [ ] Node.js 20 LTS installed
- [ ] Git installed (optional)

---

## ✅ Step 1: Verify Java Installation

### Check Java Version
```bash
java -version
```

**Expected Output:**
```
openjdk version "21" 2023-09-19
OpenJDK Runtime Environment (build 21+35-2513)
```

### If Java 21 is NOT installed:
1. Download from: https://www.oracle.com/java/technologies/downloads/
2. Choose **Java SE 21 JDK**
3. Run the installer
4. Follow the installation wizard

### Set JAVA_HOME (if needed):
1. Go to System Properties → Environment Variables
2. Click "New" (System variables)
3. Variable name: `JAVA_HOME`
4. Variable value: `C:\Program Files\Java\jdk-21` (adjust path as needed)
5. Click OK and restart your terminal

---

## ✅ Step 2: Verify Node.js Installation

### Check Node Version
```bash
node --version
npm --version
```

**Expected Output:**
```
v20.x.x (LTS version)
x.x.x
```

### If Node.js is NOT installed:
1. Download from: https://nodejs.org/
2. Choose **LTS** version for Windows
3. Run the installer
4. Follow the installation wizard (accept defaults)
5. Restart your terminal

---

## ✅ Step 3: Setup MySQL Database

### Check MySQL Installation
```bash
mysql --version
```

### If MySQL is NOT installed:
1. Download from: https://dev.mysql.com/downloads/windows/installer/
2. Run the installer
3. Select "MySQL Server 8.0.34" or later
4. Set port to **3306** (default)
5. Set username to **root** and password to **root**
6. Start the MySQL service

### Create Database
```bash
# Open MySQL Command Line Client
mysql -u root -p

# Enter password: root
# Then run:
CREATE DATABASE IF NOT EXISTS parcel_db;
USE parcel_db;

# Exit
exit
```

---

## ✅ Step 4: Setup Backend (Spring Boot)

### Navigate to Backend Directory
```bash
cd "E:\Code\Parcel Management System\parcel-management-backend"
```

### Download Dependencies
```bash
mvn clean install
```

**This may take 3-5 minutes on first run.**

### Verify Setup
- ✅ Should see "BUILD SUCCESS" at the end
- ✅ A `target` folder should be created

### Configure Database (if needed)
Edit: `src/main/resources/application.yml`
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/parcel_db?useSSL=false&serverTimezone=UTC
    username: root
    password: root  # Change if your MySQL password is different
```

---

## ✅ Step 5: Setup Frontend (Angular)

### Navigate to Frontend Directory
```bash
cd "E:\Code\Parcel Management System\parcel-management-frontend"
```

### Install Dependencies
```bash
npm install
```

**This may take 2-3 minutes on first run.**

### Verify Setup
- ✅ A `node_modules` folder should be created
- ✅ Should see no major errors (warnings are OK)

---

## 🚀 Step 6: Start the Application

### Option A: Using the Batch Script (Easiest)
```bash
cd "E:\Code\Parcel Management System"
START.bat
```

This will automatically start both backend and frontend in separate terminals.

### Option B: Manual Startup

**Terminal 1 - Backend:**
```bash
cd "E:\Code\Parcel Management System\parcel-management-backend"
mvn spring-boot:run
```

Wait until you see:
```
o.s.b.a.e.web.TomcatWebServer  : Tomcat started on port(s): 8080
```

**Terminal 2 - Frontend (after backend starts):**
```bash
cd "E:\Code\Parcel Management System\parcel-management-frontend"
npm start
```

Wait until you see:
```
✔ Compiled successfully.
```

---

## 🌐 Step 7: Access the Application

### Open Browser
1. **Frontend:** http://localhost:4200
2. **Backend API:** http://localhost:8080

### Demo Accounts
| Role  | Username | Password   |
|-------|----------|-----------|
| Admin | admin    | admin123  |
| User  | user     | user123   |

### First Login
1. Go to http://localhost:4200
2. Click "Use Admin Demo" or "Use User Demo"
3. Click "Sign In"
4. You should be redirected to the dashboard

---

## 🔍 Troubleshooting

### Issue 1: Port 8080 Already in Use
**Error:** `Address already in use`

**Solution:**
```bash
# Find what's using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change backend port in application.yml
server:
  port: 8081
```

### Issue 2: Port 4200 Already in Use
**Error:** `ERROR in Server address already in use`

**Solution:**
```bash
npm start -- --port 4201
```

### Issue 3: MySQL Connection Error
**Error:** `Access denied for user 'root'@'localhost'`

**Solution:**
1. Verify MySQL is running: `Services` → Look for "MySQL80"
2. Check credentials in `application.yml` match your MySQL setup
3. Restart MySQL service

### Issue 4: npm install fails
**Error:** `npm ERR! code`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Then try again
npm install
```

### Issue 5: Maven Build Fails
**Error:** `BUILD FAILURE`

**Solution:**
```bash
# Clear Maven cache
mvn clean

# Then rebuild
mvn install
```

### Issue 6: Module not found (Angular)
**Error:** `Cannot find module`

**Solution:**
```bash
# Reinstall node_modules
rm -r node_modules
npm install
```

---

## 📊 Verify Everything Works

### Test Backend API
Open in browser: http://localhost:8080
Should show the home page with instructions.

### Test Frontend
Open in browser: http://localhost:4200
Should show the login page.

### Test Login
1. Click "Use User Demo"
2. Click "Sign In"
3. Should see the User Dashboard

### Test Backend Password Validation
Try to login with invalid credentials:
- Username: `test`
- Password: `test`

Should see error: "Invalid username or password"

---

## 📱 Key Endpoints to Test

### Using Postman or curl:

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"user\",\"password\":\"user123\"}"
```

**List Parcels (requires authentication):**
```bash
curl -X GET http://localhost:8080/api/parcels \
  -H "Authorization: Basic dXNlcjp1c2VyMTIz"
```

---

## 🎓 Adding More Users (Optional)

### Via Frontend
1. Go to login page (you'll need to add registration UI manually)

### Via MySQL
```bash
mysql -u root -p
# Password: root

USE parcel_db;

INSERT INTO users (username, password, email, phone, role, created_at, updated_at)
VALUES ('newuser', '$2a$10$...hashed_password...', 'new@email.com', '9876543210', 'ROLE_USER', NOW(), NOW());
```

**Note:** Passwords must be BCrypt hashed. Use an online tool: https://bcrypt-generator.com/

---

## 🔐 Changing Default Credentials

**Edit:** `src/main/java/com/example/parcel/config/DemoDataConfig.java`

Change:
```java
.username("admin")
.password(passwordEncoder.encode("admin123"))
```

To:
```java
.username("admin")
.password(passwordEncoder.encode("YourNewPassword123!"))
```

Then rebuild and restart the backend.

---

## 📈 Performance Tips

1. **Backend startup time:** 30-60 seconds (first time, 10-20 seconds after)
2. **Frontend build time:** 30-60 seconds (first time, 5-10 seconds after)
3. **Database queries:** Should be instant (<100ms)

If things are slow:
- Check available RAM (need at least 4GB)
- Close unnecessary applications
- Check internet connection (for npm install)

---

## 🛑 Stop the Application

**To Stop Backend:**
- Close the backend terminal window, or
- Press `Ctrl+C` in the terminal

**To Stop Frontend:**
- Close the frontend terminal window, or
- Press `Ctrl+C` in the terminal

---

## 🧹 Cleanup

### Remove old builds
```bash
# Backend
mvn clean

# Frontend
npm cache clean --force
rm -r dist
```

### Reset database
```bash
mysql -u root -p
# Password: root

DROP DATABASE parcel_db;
CREATE DATABASE parcel_db;
exit
```

Then restart the backend (it will recreate tables).

---

## ✅ Success Checklist

- [ ] Java 21 installed and working
- [ ] MySQL running with parcel_db created
- [ ] Node.js 20 LTS installed
- [ ] Backend compiles successfully
- [ ] Frontend npm install completes
- [ ] Backend starts on port 8080
- [ ] Frontend starts on port 4200
- [ ] Can login with demo credentials
- [ ] Dashboard loads without errors
- [ ] Can book a parcel
- [ ] Can track a parcel

---

## 🎉 You're All Set!

Everything is now ready to use. Start exploring the features!

For questions, refer to: `COMPLETE_IMPLEMENTATION_GUIDE.md`

**Happy coding! 🚀**

