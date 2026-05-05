# ⚡ QUICK REFERENCE GUIDE

## 🚀 Start Application (30 seconds)
```bash
cd "E:\Code\Parcel Management System"
START.bat
```
Opens backend (port 8080) and frontend (port 4200) automatically.

---

## 🔓 Demo Accounts
```
Admin:  admin / admin123
User:   user / user123
```

---

## 🌐 Access URLs
- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:8080
- **Admin Dashboard:** Login as admin, redirects automatically

---

## 📁 Important Files

| Path | Purpose |
|------|---------|
| `app.yml` | Database & port config |
| `app.routes.ts` | URL routing |
| `entity/*.java` | Database models |
| `service/*.java` | Business logic |
| `controller/*.java` | REST endpoints |
| `*component.ts` | UI components |

---

## 📮 Main Features Checklist

### User Features
- [ ] **Login** → Login page with demo
- [ ] **Book** → Create new shipment
- [ ] **Track** → Find parcel by ID
- [ ] **Orders** → View all parcels
- [ ] **Profile** → Update info
- [ ] **Feedback** → Rate delivery
- [ ] **Invoice** → Download receipt

### Admin Features
- [ ] **Stats** → View dashboard
- [ ] **Orders** → Manage all parcels
- [ ] **Status** → Update delivery status
- [ ] **Book** → Create for users

---

## 🛠️ Manual Startup (if START.bat fails)

**Backend Terminal:**
```bash
cd "E:\Code\Parcel Management System\parcel-management-backend"
mvn spring-boot:run
```
Wait for: `Tomcat started on port(s): 8080`

**Frontend Terminal (after backend starts):**
```bash
cd "E:\Code\Parcel Management System\parcel-management-frontend"
npm start
```
Wait for: `✔ Compiled successfully`

---

## 🔑 Key Credentials for Testing

```
Database (MySQL):
  User: root
  Pass: root
  DB: parcel_db
  Port: 3306

App Accounts:
  Admin: admin / admin123
  User: user / user123
```

---

## 💳 Test Payment Cards
```
Visa: 4532015112830366
Mastercard: 5425233010103442
CVV: Any 3 digits (100-999)
Expiry: Any future date (MM/YY)

UPI: user@okhdfcbank
```

---

## 🔧 Troubleshoot Quick Fixes

| Problem | Solution |
|---------|----------|
| Port 8080 in use | Change in `application.yml` |
| MySQL not running | Start MySQL service |
| npm not found | Install Node.js 20 LTS |
| Maven not found | Set `JAVA_HOME` environment variable |
| Slow startup | Close other apps, ensure 4GB RAM |

---

## 📊 Data Models Quick Reference

### Parcel Status Flow
```
CREATED → PENDING → IN_TRANSIT → OUT_FOR_DELIVERY → DELIVERED
                                                      ↓
                                                  CANCELLED
```

### Payment Methods
- Credit Card (validation: Luhn check)
- Debit Card (validation: same as credit)
- UPI (validation: UPI format)

### User Roles
- ROLE_USER (Regular user)
- ROLE_ADMIN (Administrator)

---

## 💻 Code Structure

```
Backend (Spring Boot)
├── Controller (API endpoints)
├── Service (Business logic)
├── Repository (Database)
└── Entity (Database models)

Frontend (Angular)
├── Component (UI pages)
├── Service (API calls)
├── Guard (Route protection)
└── Pipe (Data formatting)
```

---

## 🎯 Common Tasks

### Reset Database
```sql
DROP DATABASE parcel_db;
CREATE DATABASE parcel_db;
-- Restart backend (auto-creates tables)
```

### Add New User (via MySQL)
```sql
-- Hash: BCrypt of "yourPassword1!"
INSERT INTO users (username, password, role, created_at)
VALUES ('newuser', '$2a$10$...hash...', 'ROLE_USER', NOW());
```

### Update Parcel Status (as Admin)
1. Login as admin
2. Go to "All Orders"
3. Find parcel in table
4. Change status dropdown
5. Auto-saves

### View API Endpoints
- Backend logs show all requests
- Check `*Controller.java` files

---

## 🧪 Quick Test

1. **Step 1:** Login with `user/user123`
2. **Step 2:** Click "Book Parcel"
3. **Step 3:** Fill form, set weight 10kg
4. **Step 4:** See cost: ₹50
5. **Step 5:** Copy tracking ID
6. **Step 6:** Go to "Track Parcel"
7. **Step 7:** Paste ID, verify status
8. ✅ **Success!**

---

## 📚 Documentation Map

| File | Purpose |
|------|---------|
| `PROJECT_SUMMARY.md` | What was built |
| `COMPLETE_IMPLEMENTATION_GUIDE.md` | Full feature docs |
| `SETUP_GUIDE_WINDOWS.md` | Installation steps |
| `TESTING_GUIDE.md` | Feature testing |
| `QUICK_REFERENCE.md` | This file |

---

## 🚨 Emergency Stop

To stop applications:
```bash
# Backend: Press Ctrl+C in backend terminal
# Frontend: Press Ctrl+C in frontend terminal
```

Or close the terminal windows.

---

## 📞 Quick Help

**Backend won't start?**
```bash
mvn clean compile
mvn spring-boot:run
```

**Frontend won't start?**
```bash
npm cache clean --force
npm install
npm start
```

**Database issues?**
```bash
mysql -u root -p
# Password: root
SELECT * FROM parcel_db.users;
```

---

## 🎓 Learning Path

1. **Day 1:** Setup & explore UI
2. **Day 2:** Test all features
3. **Day 3:** Read backend code (services)
4. **Day 4:** Read frontend code (components)
5. **Day 5:** Modify & extend

---

## ✨ Pro Tips

1. **Use demo accounts** for quick testing
2. **Check browser console** for errors (F12)
3. **Check backend logs** for API issues
4. **Use MySQL Workbench** to visualize data
5. **Use Postman** to test API directly
6. **Set JAVA_HOME** to avoid "java not found"
7. **Use 'npm cache clean'** if npm is slow

---

## 📈 Performance Tips

| Action | Expected Time |
|--------|----------------|
| Backend start | 30-60 sec |
| Frontend start | 30-60 sec |
| Login | < 1 sec |
| Book parcel | < 1 sec |
| List parcels | < 1 sec |
| Track parcel | < 1 sec |

---

## 🎯 Success Indicators

✅ Backend runs without errors
✅ Frontend loads in browser
✅ Can login with demo account
✅ Can see dashboard
✅ Can click buttons
✅ Forms submit without errors
✅ Data persists after reload

---

## 🔒 Security Checklist

✅ Passwords hashed with BCrypt
✅ Input validated on both ends
✅ CORS configured
✅ Role-based access control
✅ Session management
✅ SQL injection prevention

---

## 📊 Stats

```
Lines of Code: 3000+
Database Tables: 5
API Endpoints: 20+
Components: 6+
Services: 5+
Features: 12+
Test Cases: 50+
Documentation Pages: 4+
```

---

**You're all set! Enjoy the system! 🎉**

