# Setup Verification Checklist

Use this checklist to verify everything is set up correctly before running the application.

## Pre-Setup Requirements

- [ ] Node.js v18+ or v20+ LTS installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB Atlas account created
- [ ] Google Gemini API key obtained
- [ ] Code editor (VS Code recommended)

## Backend Setup Verification

### Files & Directories
- [ ] `backend/config/db.js` exists (MongoDB connection)
- [ ] `backend/middleware/auth.js` exists (JWT middleware)
- [ ] `backend/models/User.js` exists (User schema)
- [ ] `backend/models/Trip.js` exists (Trip schema)
- [ ] `backend/controllers/authController.js` exists (Auth logic)
- [ ] `backend/controllers/tripController.js` exists (Trip logic + AI)
- [ ] `backend/routes/authRoutes.js` exists (Auth endpoints)
- [ ] `backend/routes/tripRoutes.js` exists (Trip endpoints)
- [ ] `backend/server.js` exists (Main server file)

### Dependencies
- [ ] `cd backend && npm install` completed successfully
- [ ] Check: `npm list | grep express` shows express installed
- [ ] Check: `npm list | grep mongoose` shows mongoose installed
- [ ] Check: `npm list | grep jsonwebtoken` shows jsonwebtoken installed
- [ ] Check: `npm list | grep bcryptjs` shows bcryptjs installed

### Environment Configuration
- [ ] `backend/.env` file created (from .env.example)
- [ ] `MONGO_URI` is set (starts with mongodb+srv://)
- [ ] `JWT_SECRET` is set (random string)
- [ ] `GEMINI_API_KEY` is set (valid API key)
- [ ] `PORT` is set to 5000
- [ ] `NODE_ENV` is set to development

### Server Startup
- [ ] Run `npm start` from backend directory
- [ ] See message: "✅ MongoDB Connected Successfully"
- [ ] See message: "🚀 Server is running on port 5000"
- [ ] Test health check: `curl http://localhost:5000/health`
- [ ] Response is: `{"message":"Server is running"}`

## Frontend Setup Verification

### Files & Directories
- [ ] `frontend/app/page.tsx` exists (landing page)
- [ ] `frontend/app/layout.tsx` exists (root layout)
- [ ] `frontend/app/login/page.tsx` exists (login page)
- [ ] `frontend/app/register/page.tsx` exists (register page)
- [ ] `frontend/app/dashboard/page.tsx` exists (dashboard)
- [ ] `frontend/src/components/CreateTripForm.tsx` exists
- [ ] `frontend/src/components/ItineraryCard.tsx` exists
- [ ] `frontend/src/components/PackingList.tsx` exists
- [ ] `frontend/src/utils/api.ts` exists (API client)
- [ ] `frontend/src/types/index.ts` exists (TypeScript types)

### Dependencies
- [ ] `cd frontend && npm install` completed successfully
- [ ] Check: `npm list | grep next` shows next installed
- [ ] Check: `npm list | grep react` shows react installed
- [ ] Check: `npm list | grep tailwindcss` shows tailwindcss installed

### Environment Configuration
- [ ] `frontend/.env.local` created (from .env.example)
- [ ] `NEXT_PUBLIC_API_URL` is set to `http://localhost:5000`

### Server Startup
- [ ] Run `npm run dev` from frontend directory
- [ ] See message: "Local: http://localhost:3000"
- [ ] Open http://localhost:3000 in browser
- [ ] Landing page loads successfully

## Integration Testing

### Authentication Flow
- [ ] Navigate to http://localhost:3000/register
- [ ] Fill in form and create account
- [ ] See success message
- [ ] Redirected to /dashboard
- [ ] Navigate to /login
- [ ] Login with registered credentials
- [ ] Redirected to /dashboard

### Trip Generation Flow
- [ ] On dashboard, click "+ New Trip"
- [ ] Fill in: Destination, Duration, Budget, Interests
- [ ] Click "Generate My Trip"
- [ ] See loading spinner
- [ ] Wait for AI response (may take 10-30 seconds)
- [ ] Itinerary appears with activities
- [ ] Budget breakdown is displayed
- [ ] Hotels are recommended
- [ ] Packing list is generated

### Trip Editing Flow
- [ ] Click on a trip to view details
- [ ] Add a new activity to a day
- [ ] See "Remove" button appears on hover
- [ ] Click remove on an activity
- [ ] Activity is removed
- [ ] Toggle packing items as packed
- [ ] Changes persist when page reloads

### User Isolation
- [ ] Logout from dashboard
- [ ] Register with different email
- [ ] Login with new account
- [ ] Verify trips list is empty (no other user's trips)
- [ ] Create a new trip
- [ ] Verify only this trip appears
- [ ] Logout and login with first account
- [ ] Verify first account's trips still appear

## API Testing with cURL

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```
- [ ] Returns 201 status
- [ ] Response includes token and user data

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```
- [ ] Returns 200 status
- [ ] Response includes token
- [ ] Note the token for next tests

### Test Protected Route (no token)
```bash
curl -X GET http://localhost:5000/api/trips
```
- [ ] Returns 401 status
- [ ] Response: `{"message":"Access Denied. Missing or malformed Auth Token"}`

### Test Protected Route (with token)
```bash
curl -X GET http://localhost:5000/api/trips \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
- [ ] Returns 200 status
- [ ] Response is array of trips (may be empty)

## Troubleshooting Checklist

### Backend Issues
- [ ] MongoDB connection failing?
  - [ ] Check MONGO_URI format in .env
  - [ ] Verify MongoDB Atlas cluster is running
  - [ ] Check IP whitelist allows your IP
  - [ ] Verify database name is correct

- [ ] Gemini API errors?
  - [ ] Verify API key is correct in .env
  - [ ] Check API key is active in Google Cloud Console
  - [ ] Ensure quota is not exceeded

- [ ] Port 5000 already in use?
  - [ ] Change PORT in .env to different port
  - [ ] Or kill process: `lsof -ti:5000 | xargs kill -9`

### Frontend Issues
- [ ] Blank page on localhost:3000?
  - [ ] Run `npm install` in frontend folder
  - [ ] Clear node_modules and .next: `rm -rf node_modules .next`
  - [ ] Run `npm install` and `npm run dev` again

- [ ] "Cannot reach backend" errors?
  - [ ] Verify backend is running on port 5000
  - [ ] Check NEXT_PUBLIC_API_URL in .env.local
  - [ ] Clear browser cache (Ctrl+Shift+Delete)

- [ ] Build errors with TypeScript?
  - [ ] Check tsconfig.json exists
  - [ ] Verify all imports use correct paths
  - [ ] Run `npm run build` to see full errors

## Security Verification

- [ ] `.env` file is in `.gitignore` (don't commit secrets)
- [ ] `JWT_SECRET` is a long random string (not weak)
- [ ] CORS is configured (allows frontend URL)
- [ ] Passwords are required to be at least 6 characters
- [ ] JWT tokens have 7-day expiry
- [ ] All trips are filtered by userId (user isolation verified)

## Performance Verification

- [ ] AI response returns structured JSON
- [ ] Retry logic works (test with invalid API key)
- [ ] Database queries complete in <1 second
- [ ] Frontend loads in <3 seconds
- [ ] No console errors in browser DevTools

## Deployment Readiness

- [ ] README.md is complete and accurate
- [ ] QUICKSTART.md helps new users get started
- [ ] All environment variables documented
- [ ] .gitignore prevents committing secrets
- [ ] Code has comments explaining complex logic
- [ ] Error messages are user-friendly

## Final Sign-Off

- [ ] All checkboxes above are checked ✅
- [ ] Application runs smoothly locally
- [ ] Ready for testing/deployment
- [ ] Documentation is complete

**Date Completed**: _______________
**Tested By**: _______________
**Notes**: _______________

---

If you encounter any unchecked items, refer to the main README.md for detailed troubleshooting steps.
