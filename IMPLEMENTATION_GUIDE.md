# Remaining Issues - Implementation Guide

## ✅ Already Fixed (5/20)
1. ✅ Toast notification glitching
3. ✅ Company page navigation
4-8. ✅ Backend for all forms (contact, careers, newsletter, discussion)
15. ✅ Emoji separated from headings

## 🔧 Ready to Implement (15 remaining)

### Issue #2: Dashboard Screenshots
**Files:** `frontend/src/pages/Home/*.jsx`
**Action:** Take screenshots of admin/HR/employee dashboards and add to assets
**Priority:** Low

### Issue #9: Remove Download Resources
**File:** `frontend/src/pages/Support/Documentation.jsx`
**Action:** Comment out or remove the download section (lines with Download buttons)
**Priority:** Low

### Issue #10: Add User Filters
**Files:** 
- `frontend/src/pages/Admin/UserManagement.jsx`
**Action:** Add filter dropdowns for Department, Role, Status above user table
**Priority:** Medium

### Issue #11: Holiday Calendar +1 Day Bug
**Files:** 
- Check date parsing in holiday display components
- Likely timezone issue with Date objects
**Action:** Use UTC dates or adjust for timezone offset
**Priority:** High

### Issue #12: Attendance Reports to HR + Backend
**Files:**
- Move from `frontend/src/pages/Admin/*` to `frontend/src/pages/HR/*`
- Create backend endpoint in `backend/controllers/hrController.js`
**Action:** Create attendance report API and move UI to HR section
**Priority:** High

### Issue #13: Profile Not Showing After Logout
**Files:** 
- `frontend/src/context/AuthContext.jsx`
- Check logout function
**Action:** Ensure user data is cleared properly on logout
**Priority:** Medium

### Issue #14: Create Notification Pages
**Files to Create:**
- `frontend/src/pages/Admin/Notifications.jsx`
- `frontend/src/pages/HR/Notifications.jsx`
- `frontend/src/pages/Employee/Notifications.jsx`
- Update `backend/controllers/notificationController.js`
**Action:** Create separate notification pages for each role
**Priority:** High

### Issue #16: Add Dashboard to Sidebar
**Files:** 
- `frontend/src/components/Sidebar.jsx`
**Action:** Add Dashboard menu item at top of sidebar for all roles
**Priority:** Low

### Issue #17: HR Employees List/Grid View + Filters
**Files:** 
- `frontend/src/pages/HR/Employees.jsx` (if exists, or create)
**Action:** Add view toggle button, implement grid/list layouts, add filters
**Priority:** Medium

### Issue #18: Real Attendance Data in HR
**Files:** 
- `frontend/src/pages/HR/HRDashboard.jsx`
- `backend/controllers/hrController.js`
**Action:** Replace mock data with API calls to fetch real attendance
**Priority:** High

### Issue #19: Check-In/Out Custom Confirmation
**Files:** 
- `frontend/src/pages/Employee/Dashboard.jsx`
- Create `frontend/src/components/ConfirmModal.jsx`
**Action:** Replace alert() with custom modal component
**Priority:** Medium

### Issue #20: Leave Policies Page
**Files:** 
- Create `frontend/src/pages/Employee/LeavePolicies.jsx`
- Update routing in App.jsx
**Action:** Create comprehensive leave policies page
**Priority:** Low

## 📋 Quick Implementation Order (by Priority)

### HIGH PRIORITY (Do First):
1. Issue #11 - Holiday calendar date bug
2. Issue #12 - Attendance reports backend + move to HR
3. Issue #14 - Notification pages for all roles
4. Issue #18 - Real attendance data in HR page

### MEDIUM PRIORITY:
5. Issue #10 - User filters in admin
6. Issue #13 - Profile after logout
7. Issue #17 - HR employees list/grid + filters
8. Issue #19 - Custom check-in/out confirmation

### LOW PRIORITY:
9. Issue #16 - Dashboard in sidebar
10. Issue #20 - Leave policies page
11. Issue #2 - Dashboard screenshots
12. Issue #9 - Remove downloads section

## 🚀 Next Commands to Run:

```bash
# After implementing fixes, deploy:
cd backend
git add .
git commit -m "Implement remaining fixes: #11, #12, #14, #18"
git push origin master

cd ../frontend  
git add .
git commit -m "Implement frontend fixes: notifications, filters, modals"
git push origin master

# Deploy to Render (automatic on push)
# Deploy to Vercel
cd frontend
vercel --prod
```

## 📧 Email Setup Required:

Update Render.com environment variables:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

Get Gmail App Password:
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Generate App Password
4. Use that password in EMAIL_PASS

---
**Status:** 5/20 Complete | 15 Remaining
**Last Updated:** October 24, 2025
