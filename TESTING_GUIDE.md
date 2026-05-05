# 🎯 Feature Testing Guide - Parcel Management System

## How to Test Each Feature

This document provides step-by-step instructions to test all implemented features.

---

## 🔐 AUTHENTICATION FEATURES

### Test 1: Login with Valid Credentials
**Steps:**
1. Go to http://localhost:4200/login
2. Click "Use User Demo"
3. Click "Sign In"

**Expected Result:**
- ✅ Redirects to `/user-dashboard`
- ✅ Username displayed in navbar
- ✅ User dashboard visible

### Test 2: Login with Invalid Password
**Steps:**
1. Go to http://localhost:4200/login
2. Enter username: `user`
3. Enter password: `wrongpassword`
4. Click "Sign In"

**Expected Result:**
- ✅ Error message: "Invalid username or password"
- ✅ Stays on login page
- ✅ No redirect

### Test 3: Admin Login
**Steps:**
1. Go to http://localhost:4200/login
2. Click "Use Admin Demo"
3. Click "Sign In"

**Expected Result:**
- ✅ Redirects to `/admin-dashboard`
- ✅ Admin interface shows all orders

### Test 4: Logout
**Steps:**
1. Login as any user
2. Click "Logout" button in navbar

**Expected Result:**
- ✅ Redirects to login page
- ✅ All stored credentials cleared

---

## 📮 BOOK PARCEL FEATURE

### Test 1: Book a Parcel with Valid Data
**Steps:**
1. Login as user
2. Click "Book New Parcel"
3. Fill in all fields:
   - Pickup Address: `123 MyStreet`
   - Pickup City: `Delhi`
   - Pickup Contact: `9876543210`
   - Drop Location: `456 DeliveryRoad`
   - Drop City: `Mumbai`
   - Drop Contact: `8765432109`
   - Weight: `10` kg
   - Pickup Date: (select today)
4. Click "Proceed to Payment"

**Expected Result:**
- ✅ Cost calculated: ₹50 (10 kg × ₹5)
- ✅ Redirect to manage orders
- ✅ Parcel appears in "My Orders" with tracking ID

### Test 2: Cost Calculation
**Steps:**
1. Go to Book Parcel page
2. Enter different weights and observe cost:
   - 5 kg → ₹25
   - 10 kg → ₹50
   - 15.5 kg → ₹77.50

**Expected Result:**
- ✅ Cost updates instantly
- ✅ Formula: weight × 5 = cost

### Test 3: Submit with Empty Fields
**Steps:**
1. Go to Book Parcel page
2. Leave all fields empty
3. Click "Proceed to Payment"

**Expected Result:**
- ✅ Form validation prevents submission
- ✅ Error message appears (browser validation)

---

## 🔍 TRACK PARCEL FEATURE

### Test 1: Track with Valid Tracking ID
**Steps:**
1. Login as user
2. Go to "Track Parcel"
3. Copy a tracking ID from "My Orders" (e.g., TRK-ABC12345)
4. Paste in search box
5. Click "Search"

**Expected Result:**
- ✅ Parcel details displayed
- ✅ Status shows current state
- ✅ Timeline shows progress

### Test 2: Track with Invalid Tracking ID
**Steps:**
1. Go to "Track Parcel"
2. Enter: `INVALID-ID`
3. Click "Search"

**Expected Result:**
- ✅ Error message: "Parcel not found"
- ✅ No results displayed

### Test 3: View Tracking Timeline
**Steps:**
1. Track a parcel successfully
2. Observe the timeline at the bottom

**Expected Result:**
- ✅ Timeline shows: CREATED → PENDING → IN_TRANSIT → OUT_FOR_DELIVERY → DELIVERED
- ✅ Only completed stages are highlighted
- ✅ Icons display for each status

---

## 📋 MANAGE ORDERS FEATURE

### Test 1: View All Parcels
**Steps:**
1. Login as user
2. Click "My Orders"

**Expected Result:**
- ✅ Table shows all user's parcels
- ✅ Columns: Tracking ID, Location, Weight, Cost, Status
- ✅ Pagination works for many parcels

### Test 2: Search by Tracking ID
**Steps:**
1. Go to "My Orders"
2. Type partial tracking ID in search
3. List filters in real-time

**Expected Result:**
- ✅ Only matching parcels shown
- ✅ Search is case-insensitive
- ✅ Clears when search is empty

### Test 3: View Parcel Details
**Steps:**
1. Go to "My Orders"
2. Click "View" button on a parcel

**Expected Result:**
- ✅ Modal popup shows all details
- ✅ Includes: From address, To address, Weight, Cost, Status, Date
- ✅ "Close" button dismisses modal

### Test 4: Download Invoice
**Steps:**
1. Go to "My Orders"
2. Click "View" on a parcel
3. Click "Download Invoice"

**Expected Result:**
- ✅ File downloads as `invoice-TRK-XXXXX.txt`
- ✅ Contains parcel details
- ✅ Formatted nicely

### Test 5: Submit Feedback
**Steps:**
1. Go to "My Orders"
2. Click "Feedback" on any parcel
3. Select rating (1-5)
4. Add comment (optional)
5. Click "Submit"

**Expected Result:**
- ✅ Success message appears
- ✅ Modal closes
- ✅ Feedback saved to database

### Test 6: Cancel Parcel (Only for CREATED status)
**Steps:**
1. Go to "My Orders"
2. Find parcel with status "CREATED"
3. Click "Cancel"
4. Enter reason in popup
5. Click OK

**Expected Result:**
- ✅ Status changes to "CANCELLED"
- ✅ Reason stored in database
- ✅ Cannot cancel delivered/in-transit parcels

---

## 👤 USER PROFILE FEATURE

### Test 1: View Profile
**Steps:**
1. Login as user
2. Click "Profile" in sidebar
3. Observe current information

**Expected Result:**
- ✅ Username and role visible (disabled fields)
- ✅ Email shown
- ✅ Contact info populated (if previously entered)

### Test 2: Update Profile Information
**Steps:**
1. Go to "Profile"
2. Update fields:
   - Email: `newemail@example.com`
   - Phone: `9876543210`
   - Address: `123 New Street`
   - City: `Bangalore`
   - State: `Karnataka`
   - Pin Code: `560001`
3. Click "Save Changes"

**Expected Result:**
- ✅ Success message appears
- ✅ Data persists after page reload
- ✅ Fields show updated values

### Test 3: Email Validation
**Steps:**
1. Go to "Profile"
2. Try to save with invalid email: `notanemail`

**Expected Result:**
- ✅ Backend rejects invalid format
- ✅ Error message displayed

### Test 4: Phone Validation
**Steps:**
1. Go to "Profile"
2. Try to save with invalid phone: `12345` (less than 10 digits)

**Expected Result:**
- ✅ Backend rejects invalid format
- ✅ Error message displayed

---

## 🛠️ ADMIN FEATURES

### Test 1: View Admin Dashboard
**Steps:**
1. Login with: admin / admin123
2. Dashboard should show

**Expected Result:**
- ✅ Four stat cards: Total Parcels, Delivered, In Transit, Pending
- ✅ Numbers update based on parcel statuses
- ✅ Shows at least 1 parcel from demo data

### Test 2: View All Orders
**Steps:**
1. In Admin Dashboard, click "All Orders" tab

**Expected Result:**
- ✅ Table shows ALL parcels in system
- ✅ Includes parcels from all users
- ✅ Sender name visible

### Test 3: Update Parcel Status
**Steps:**
1. Go to "All Orders"
2. Find a parcel
3. Click the status dropdown
4. Select "IN_TRANSIT"
5. (Change should auto-save)

**Expected Result:**
- ✅ Status updates immediately
- ✅ Dashboard stats update
- ✅ User can see change when they track

### Test 4: Search Parcels
**Steps:**
1. Go to "All Orders"
2. Type tracking ID in search box
3. List filters in real-time

**Expected Result:**
- ✅ Only matching parcels shown
- ✅ Search works across all columns

### Test 5: Book Parcel for User
**Steps:**
1. Click "Book for User" tab
2. Fill in complete parcel details:
   - Pickup Address: `Admin Warehouse`
   - All other fields filled
3. Click "Book Parcel"

**Expected Result:**
- ✅ Success message appears
- ✅ Parcel added to system
- ✅ User can track it

---

## 💳 PAYMENT VALIDATION

### Test 1: Valid Card Payment
**Scenario:** Payment with valid credit card

**Card Details:**
- Card Number: `4532015112830366` (Visa test card)
- Cardholder: `John Doe`
- Expiry: `12/25`
- CVV: `123`

**Expected Result:**
- ✅ All fields pass validation
- ✅ Success message
- ✅ Payment recorded

### Test 2: Invalid Card Number (Luhn Check)
**Card Number:** `1234567890123456` (fails Luhn check)

**Expected Result:**
- ✅ Backend rejects with: "Invalid card number"
- ✅ Error message displayed

### Test 3: Invalid CVV
**CVV:** `12` (only 2 digits, needs 3-4)

**Expected Result:**
- ✅ Backend rejects: "Invalid CVV"
- ✅ Error message displayed

### Test 4: Invalid Expiry Date
**Date:** `13/25` (month 13 invalid)

**Expected Result:**
- ✅ Backend rejects: "Invalid expiry date"
- ✅ Error message displayed

### Test 5: Valid UPI Payment
**UPI ID:** `user@okhdfcbank`

**Expected Result:**
- ✅ UPI validation passes
- ✅ Payment recorded with method: CREDIT_CARD/DEBIT_CARD/UPI

### Test 6: Invalid UPI ID
**UPI ID:** `invalidemail` (no @)

**Expected Result:**
- ✅ Backend rejects: "Invalid UPI ID"
- ✅ Error message displayed

---

## ✅ INPUT VALIDATION

### Test 1: Username Validation
| Input | Expected |
|-------|----------|
| `ab` | ❌ Too short (min 3) |
| `user123` | ✅ Valid |
| `user@123` | ❌ Special char not allowed |
| `user_123` | ✅ Valid |
| `123` numbers only | ❌ Must include letters |

### Test 2: Password Validation
| Input | Expected |
|-------|----------|
| `pass123` | ❌ No uppercase |
| `Pass123` | ❌ No special char |
| `Pass@123` | ✅ Valid |
| `Pass@` | ❌ Too short |

### Test 3: Phone Validation
| Input | Expected |
|-------|----------|
| `987654321` | ❌ Only 9 digits |
| `9876543210` | ✅ Valid |
| `98765432101` | ❌ 11 digits |
| `abc1234567` | ❌ Contains letters |

### Test 4: Email Validation
| Input | Expected |
|-------|----------|
| `user@example.com` | ✅ Valid |
| `invalid.email` | ❌ Missing @domain |
| `@example.com` | ❌ Missing local part |
| `user@.com` | ❌ Missing domain |

---

## 🎨 UI/UX FEATURES

### Test 1: Responsive Design
**Steps:**
1. Open the app in browser
2. Resize window to different sizes:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

**Expected Result:**
- ✅ Layout adjusts smoothly
- ✅ All buttons clickable on mobile
- ✅ Text readable on all sizes
- ✅ Navbar collapses on mobile

### Test 2: Dark Gradient Theme
**Steps:**
1. Observe the UI colors

**Expected Result:**
- ✅ Purple-blue gradient theme consistent
- ✅ Good contrast for readability
- ✅ Professional appearance

### Test 3: Error Messages
**Steps:**
1. Try to trigger various errors:
   - Invalid login
   - Network error
   - Invalid input

**Expected Result:**
- ✅ Clear error messages shown
- ✅ Messages are visible and readable
- ✅ Auto-dismiss after 3-5 seconds
- ✅ User knows what went wrong

### Test 4: Success Notifications
**Steps:**
1. Perform successful actions:
   - Login
   - Book parcel
   - Update profile

**Expected Result:**
- ✅ Green success messages appear
- ✅ Clear confirmation of action
- ✅ Auto-dismiss after 3-5 seconds

### Test 5: Loading States
**Steps:**
1. Perform actions that call API

**Expected Result:**
- ✅ Buttons show loading state
- ✅ Spinners appear while loading
- ✅ Disabled to prevent multiple clicks

---

## 🔄 ROLE-BASED ACCESS CONTROL

### Test 1: User Cannot Access Admin Features
**Steps:**
1. Login as user
2. Try to go to: http://localhost:4200/admin-dashboard

**Expected Result:**
- ✅ Access denied
- ✅ Redirected to login or dashboard
- ✅ User menu doesn't show admin options

### Test 2: Admin Can Access All Features
**Steps:**
1. Login as admin
2. Check sidebar menu

**Expected Result:**
- ✅ Admin dashboard visible
- ✅ "All Orders" tab available
- ✅ "Book for User" option visible

### Test 3: Logout and Try Protected Route
**Steps:**
1. Login as user
2. Copy URL from address bar
3. Logout
4. Try to access that URL directly

**Expected Result:**
- ✅ Redirected to login page
- ✅ Session ended
- ✅ Must login again

---

## 📊 DATA PERSISTENCE

### Test 1: Data Survives Page Reload
**Steps:**
1. Book a parcel
2. Go to "My Orders"
3. Refresh the page (Ctrl+R)

**Expected Result:**
- ✅ Parcel still visible
- ✅ All data preserved
- ✅ No data loss

### Test 2: Database Updates Instantly
**Steps:**
1. Book parcel as User (one browser)
2. View as Admin in another browser
3. Refresh admin page

**Expected Result:**
- ✅ Admin sees the new parcel immediately
- ✅ Real-time synchronization

### Test 3: Long Session Persistence
**Steps:**
1. Login and leave app open for 30 minutes
2. Perform action (click button)

**Expected Result:**
- ✅ Session still active
- ✅ Can still perform actions
- ✅ No unexpected logouts

---

## 🚀 PERFORMANCE TESTS

### Test 1: Page Load Time
**Measurement:**
- Dashboard load: Should be < 2 seconds
- List load (many parcels): Should be < 1 second

### Test 2: API Response Time
**Measurement:**
- Login: < 500ms
- Get parcels: < 500ms
- Book parcel: < 1000ms

### Test 3: Large Data Set
**Steps:**
1. Manually insert 100+ test parcels in database
2. Load "All Orders" as admin

**Expected Result:**
- ✅ Page still loads quickly
- ✅ Table is responsive
- ✅ Search/filter works smoothly

---

## 🐛 EDGE CASES

### Test 1: Same Email Registered Twice
**Steps:**
1. Try to register with existing email

**Expected Result:**
- ✅ Rejected with: "Email already registered"

### Test 2: Book Parcel with Zero Weight
**Steps:**
1. Enter weight: `0`
2. Try to submit

**Expected Result:**
- ✅ Cost shows: ₹0
- ✅ Or rejected if validation requires > 0

### Test 3: Future Pickup Date
**Steps:**
1. Select pickup date: 30 days in future
2. Book parcel

**Expected Result:**
- ✅ Accepted
- ✅ Parcel created with future date

### Test 4: Very Long Address (500+ characters)
**Steps:**
1. Enter extremely long address
2. Save

**Expected Result:**
- ✅ Accepted and stored
- ✅ Displays properly in list (truncated if needed)

---

## ✨ COMPLETE TEST SUMMARY

Print this checklist and mark off as you test:

- [ ] Login with correct credentials
- [ ] Login fails with wrong password
- [ ] Admin dashboard shows stats
- [ ] User dashboard shows quick actions
- [ ] Can book a parcel
- [ ] Cost calculates correctly
- [ ] Can track parcel
- [ ] Can view orders
- [ ] Can search orders
- [ ] Can download invoice
- [ ] Can submit feedback
- [ ] Can update profile
- [ ] Admin can view all orders
- [ ] Admin can update status
- [ ] Admin can book for user
- [ ] Card validation works
- [ ] UPI validation works
- [ ] Password validation enforced
- [ ] Email validation enforced
- [ ] Phone validation enforced
- [ ] UI responsive on mobile
- [ ] Logout works
- [ ] Session persists
- [ ] Data survives reload
- [ ] Error messages clear
- [ ] Success messages show

**If all checks pass: ✅ SYSTEM IS FULLY FUNCTIONAL!**

---

## 🎓 Notes for Testers

1. **Demo data** is created automatically on first run
2. **Primary user** is: user / user123
3. **Primary admin** is: admin / admin123
4. **Database** resets when Hibernate ddl-auto is set to "create"
5. **Passwords** are hashed with BCrypt (not reversible)
6. **Validation** happens on both frontend and backend

---

**Thank you for testing! Report any issues found.**

