v
# System Verification & Troubleshooting Guide

## Pre-Flight Checklist ✓

Before starting, verify you have:

- [ ] MySQL Server running locally
- [ ] Java 21 or later installed: `java -version`
- [ ] Maven installed: `mvn -version`
- [ ] Node.js v18+ installed: `node -v`
- [ ] npm installed: `npm -v`
- [ ] Database `parcel_db` exists
- [ ] Database user `root` with password `root` can connect

**Quick Check Commands:**
```bash
# Test MySQL connection
mysql -u root -p -e "SELECT 1;" 

# Test Java
java -version

# Test Maven
mvn -version

# Test Node.js
node -v
npm -v
```

---

## Step-by-Step Startup Verification

### Phase 1: Backend Startup (Port 8080)

**Command:**
```bash
cd E:\Code\Parcel\ Management\ System\parcel-management-backend
mvn spring-boot:run
```

**Expected Output (in order):**

1. **Maven Building:**
   ```
   [INFO] Scanning for projects...
   [INFO] BUILD SUCCESS
   ```

2. **Spring Boot Starting:**
   ```
   Starting ParcelApplication v2.0.0 using Java 21.X.X...
   ```

3. **Database Connection:**
   ```
   HikariPool-1 - Starting...
   HikariPool-1 - Added connection conn0
   ```

4. **Hibernate Schema Update:**
   ```
   [WARN] GenerationTarget encountered exception accepting command
   Executing: alter table users add column name varchar(255)
   ```
   (This warning is normal - it means schema was updated)

5. **Demo Data Seeding:**
   ```
   Inserting demo admin user...
   Inserting demo test user...
   Demo data loaded successfully
   ```

6. **Server Ready:**
   ```
   Tomcat started on port(s): 8080 (http)
   Started ParcelApplication in 5.952 seconds
   ```

**✓ Success Indicator:** Last line should show "Started ParcelApplication"

**✗ Failure Indicators:**
- "BUILD FAILURE" → Maven issue
- "Connection refused" → MySQL not running
- "Password authentication failed" → Wrong MySQL credentials
- Port 8080 already in use → Kill process on 8080

---

### Phase 2: Frontend Startup (Port 4200)

**Command (in new PowerShell window):**
```bash
cd E:\Code\Parcel\ Management\ System\parcel-management-frontend
npm start
```

**Expected Output (in order):**

1. **Angular CLI Loading:**
   ```
   Node.js version v23.6.0 detected...
   ```

2. **Webpack Bundling:**
   ```
   Initial chunk files   | Names         |  Raw size
   vendor.js             | vendor        |   2.80 MB
   polyfills.js          | polyfills     | 262.60 kB
   main.js               | main          | 162.24 kB
   styles.css, styles.js | styles        | 156.80 kB
   runtime.js            | runtime       |   6.53 kB
   ```

3. **Build Success:**
   ```
   ✓ Browser application bundle generation complete
   Build at: 2026-05-05T10:XX:XX.000Z
   Hash: xxxxxxxxxxxxxxxx
   Time: 4475ms
   ```

4. **Server Ready:**
   ```
   ** Angular Live Development Server is listening on localhost:4200 **
   open your browser on http://localhost:4200/
   ```

**✓ Success Indicator:** "Angular Live Development Server is listening"

**✗ Failure Indicators:**
- Compilation errors listed
- "Cannot find module" → Missing dependencies
- Port 4200 already in use

---

## Functional Verification

### Test 1: Access Login Page

**URL:** http://localhost:4200/login

**Expected:**
- [ ] Page loads with gradient purple-blue background
- [ ] "📦 Parcel Management System" heading visible
- [ ] "Sign In" form with username/password fields
- [ ] "User Demo" and "Admin Demo" buttons visible
- [ ] "Don't have an account? Sign Up" link visible
- [ ] Demo credentials shown:
  - User: user / user123
  - Admin: admin / admin123

**Issues:**
- Blank page → Frontend not starting
- 404 error → Route not configured
- Can't click demo buttons → JavaScript not loading

---

### Test 2: Quick Login with Demo

**Steps:**
1. Go to http://localhost:4200/login
2. Click "👤 User Demo" button
3. Username field should populate with "user"
4. Password field should populate with "user123"
5. Click "Sign In"

**Expected:**
- [ ] "Login successful" message appears
- [ ] Page redirects to /user-dashboard
- [ ] Dashboard shows "Welcome, user" or similar
- [ ] Menu items visible (Book Parcel, Track Parcel, etc.)

**If Login Fails:**
- Check backend console for authentication errors
- Verify MySQL users table has admin/user entries:
  ```sql
  USE parcel_db;
  SELECT username, email, name FROM users;
  ```

---

### Test 3: Registration Page

**URL:** http://localhost:4200/register

**Expected:**
- [ ] Page loads with "Create Account" heading
- [ ] 7 form fields visible:
  1. Full Name
  2. Email
  3. Phone Number
  4. Address (textarea)
  5. Username
  6. Password
  7. Confirm Password
- [ ] "Create Account" button visible
- [ ] "Already have an account? Sign In" link visible
- [ ] Hints shown for username and password requirements

**Issues:**
- Route not found → Routes not updated
- Form fields missing → Component not loaded correctly

---

### Test 4: Test Validation

**Test 4a: Phone Validation**
- Enter Name: "John Doe"
- Enter Email: "john@example.com"
- Enter Phone: "123" (only 3 digits)
- Expected: Error message "Phone must be exactly 10 digits"
- Enter Phone: "9876543210" (10 digits)
- Expected: Error clears

**Test 4b: Username Validation**
- Enter Username: "ab" (only 2 chars)
- Expected: Error "Username must be 3-20 characters..."
- Enter Username: "john_doe99" (valid)
- Expected: Error clears

**Test 4c: Password Validation**
- Enter Password: "short1@" (7 chars, too short)
- Expected: Error "Password must be at least 8 characters..."
- Enter Password: "simple123" (no special char)
- Expected: Error about special character
- Enter Password: "MyPass@123" (valid)
- Expected: Error clears

**Test 4d: Password Confirmation**
- Enter Password: "MyPass@123"
- Enter Confirm Password: "MyPass@124" (different)
- Expected: Error "Passwords do not match"
- Enter Confirm Password: "MyPass@123" (matching)
- Expected: Error clears

---

### Test 5: Complete Registration

**Form Entry:**
```
Full Name:       John Doe
Email:           john.doe@example.com
Phone Number:    9876543210
Address:         123 Main Street, Apt 4B
Username:        john_doe99
Password:        MyPassword@2024
Confirm Password: MyPassword@2024
```

**Steps:**
1. Fill all fields as above
2. Click "Create Account"

**Expected:**
- [ ] "Account created successfully!" message
- [ ] Page redirects to login page (automatic)
- [ ] Can login with: john_doe99 / MyPassword@2024

**If Registration Fails:**
- Check error message:
  - "Username already taken" → Enter different username
  - "Email already registered" → Use new email
  - "Validation failed" → Check field formats
- Check backend console for stack trace

---

### Test 6: Verify Database Entry

**Command:**
```bash
mysql -u root -p parcel_db
```

**Then run:**
```sql
SELECT id, username, email, name, phone, address, role FROM users ORDER BY id DESC LIMIT 3;
```

**Expected Output:**
```
+----+----------+---------------------+---------+----------+------------------+-----------+
| id | username | email               | name    | phone    | address          | role      |
+----+----------+---------------------+---------+----------+------------------+-----------+
|  3 | john_doe99 | john.doe@example.com | John Doe | 9876543210 | 123 Main Street | ROLE_USER |
|  2 | user     | user@parcel.com     | Test User | 9123456789 | 456 User Avenue | ROLE_USER |
|  1 | admin    | admin@parcel.com    | Admin User | 9876543210 | 123 Admin Street | ROLE_ADMIN |
+----+----------+---------------------+---------+----------+------------------+-----------+
3 rows in set (0.00 sec)
```

**Verification:**
- [ ] New user exists in database
- [ ] All fields populated correctly
- [ ] Name field is not NULL (new feature working)
- [ ] Role defaults to ROLE_USER

---

## Common Issues & Solutions

### Issue 1: "Port 8080 already in use"

**symptoms:**
```
Address already in use: bind
```

**Solution:**
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill process (replace nnnn with PID)
taskkill /PID nnnn /F

# OR change port in application.yml:
server:
  port: 8081  # Use different port
```

---

### Issue 2: "Port 4200 already in use"

**Symptoms:**
```
Port 4200 is already in use. Would you like to use a different port?
```

**Solution:**
```bash
# Option 1: Kill existing process
netstat -ano | findstr :4200
taskkill /PID nnnn /F

# Option 2: Use different port
ng serve --port 4201
```

---

### Issue 3: "Cannot connect to MySQL"

**Symptoms:**
```
No operating system threads available to fulfill create new native thread
Communications link failure
```

**Solution:**
```bash
# Check MySQL is running
# Windows: Check Services (services.msc) for MySQL80 or similar

# Test connection:
mysql -u root -p

# If password prompt appears, MySQL is running
# Enter password: root

# If connection refused, MySQL isn't running
# Start MySQL:
net start MySQL80  # Replace 80 with your version
```

---

### Issue 4: "Database parcel_db doesn't exist"

**Symptoms:**
```
Unknown database 'parcel_db'
```

**Solution:**
```bash
# Login to MySQL
mysql -u root -p

# Create database:
CREATE DATABASE parcel_db;
CREATE DATABASE IF NOT EXISTS parcel_db;

# Verify:
SHOW DATABASES;
```

---

### Issue 5: "Module not found" error in frontend

**Symptoms:**
```
ERROR: Cannot find package 'some-package' required by '@angular/...'
```

**Solution:**
```bash
# In frontend directory:
npm install

# Or clean install:
rm -r node_modules package-lock.json
npm install
```

---

### Issue 6: "Cannot find 'FilterPipe' or 'CountByStatusPipe'"

**Symptoms:**
```
Cannot find name 'FilterPipe'
Cannot resolve 'CountByStatusPipe'
```

**Solution:**
This should be fixed by the imports module has added. If still seeing error:
1. Clear browser cache: Ctrl+Shift+Delete
2. Clear node_modules: `rm -r node_modules`, then `npm install`
3. Restart ng serve

---

### Issue 7: "Login fails with valid credentials"

**Symptoms:**
```
✗ Invalid username or password
(even though credentials are correct)
```

**Possible Causes & Solutions:**

1. **Backend not running:**
   ```bash
   # Check if backend console shows errors
   # Restart backend: mvn spring-boot:run
   ```

2. **Demo data not seeded:**
   ```sql
   -- Check users in database:
   USE parcel_db;
   SELECT * FROM users;
   
   -- Should see admin and user entries
   -- If empty, backend startup might have failed
   ```

3. **Password hash mismatch:**
   ```sql
   -- Verify user exists:
   SELECT username, email FROM users WHERE username='admin';
   ```

4. **Authentication service issue:**
   - Check backend console for errors during login attempt
   - Look for validation or encryption errors

---

### Issue 8: "CORS error when registering"

**Symptoms:**
```
Access to XMLHttpRequest at 'http://localhost:8080/...' from origin 'http://localhost:4200' 
has been blocked by CORS policy
```

**Solution:**
Add CORS configuration to backend. Check if CorsConfig exists in:
```java
// parcel-management-backend/src/main/java/com/example/parcel/config/
```

If missing, create CorsConfig.java:
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:4200")
                    .allowedMethods("*")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

---

## Performance Monitoring

### Backend Performance

**Check startup time:**
```
Started ParcelApplication in X.XXX seconds
```
- X < 10 seconds = Good
- X > 20 seconds = Possible issue with database

**Check memory usage:**
```bash
# In Windows Task Manager
# Look for "java.exe" process
# Memory should be 300-600 MB
```

### Frontend Performance

**Check bundle sizes in ng serve output:**
```
vendor.js        2.80 MB  ← Should be 2-3 MB
polyfills.js     262 KB   ← Should be <300 KB
main.js          162 KB   ← Should be <200 KB
```

---

## Success Indicators Checklist

### Backend Running
- [ ] No error messages in console
- [ ] "Tomcat started on port 8080"
- [ ] Can access http://localhost:8080 (shows error page, which is OK)
- [ ] Demo users created in database
- [ ] Logs show successful startup

### Frontend Running
- [ ] No build errors
- [ ] "Angel Live Development Server is listening"
- [ ] Can access http://localhost:4200/login
- [ ] Login page styled correctly with gradient

### Database Ready
- [ ] parcel_db database exists
- [ ] users table has admin and user entries
- [ ] Table has columns: id, username, password, email, name, phone, address, role, created_at, updated_at

### Features Working
- [ ] Demo login works (admin/admin123)
- [ ] Demo login works (user/user123)
- [ ] Registration page accessible
- [ ] Can create new account
- [ ] Can login with newly created account
- [ ] Dashboard loads after successful login
- [ ] Admin dashboard shows all orders
- [ ] User dashboard shows user features

---

## Performance Optimization Tips

1. **Faster Backend Startup:**
   - Ensure MySQL has enough memory
   - Check for large existing data
   - Consider increasing Java heap: `export MAVEN_OPTS="-Xmx512m"`

2. **Faster Frontend Compilation:**
   - Close browser dev tools (F12)
   - Restart npm if slow: `npm start`
   - Clear browser cache

3. **Smoother Login:**
   - Ensure stable network connection
   - Clear browser cache before testing
   - Check backend logs for errors

---

## Diagnostic Commands

### View Backend Logs
```bash
# If backend still running, check terminal output
# Look for errors or warnings
# Filter for keywords: ERROR, Exception, Failed
```

### View Latest Logs
```bash
# Windows Event Viewer for Java exceptions
eventvwr.msc
```

### Test API Directly
```bash
# Test if backend is responding
curl http://localhost:8080/api/auth/login

# Should return 405 Method Not Allowed (expected for POST-only endpoint)
# If connection refused, backend not running
```

### Check MySQL
```bash
# Connect to MySQL
mysql -u root -p

# Password: root

# Check database
USE parcel_db;

# Check table
DESCRIBE users;

# Should show columns including 'name' (the new one)

# Check data
SELECT COUNT(*) FROM users;

# Should show 2 or more (admin, user, + any registered users)
```

---

## Support Information

**If you encounter issues:**

1. **Check the logs** - Frontend console (F12) and Backend terminal
2. **Read error messages** - They usually tell you what's wrong
3. **Verify prerequisites** - MySQL running, ports free, dependencies installed
4. **Try isolation** - Test backend alone, then frontend alone
5. **Clear cache** - Sometimes browser/npm cache causes issues
6. **Restart services** - Stop and start backend/frontend fresh

**Common Pattern for Debugging:**

1. Backend error? 
   - Stop backend
   - Restart backend: `mvn spring-boot:run`
   - Check MySQL connection

2. Frontend error?
   - Stop frontend: `Ctrl+C` in npm terminal
   - Restart frontend: `npm start`
   - Clear browser cache: `Ctrl+Shift+Delete`

3. Login error?
   - Verify backend running: Check port 8080
   - Verify users in database: `SELECT * FROM users;`
   - Check credentials: admin/admin123

---

**Last Updated:** 2026-05-05
**Version:** 2.0 - with Registration Support
**Status:** Ready for Testing

