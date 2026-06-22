# AI Travel Planner - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Setup MongoDB Atlas (2 minutes)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" and choose "Drivers"
5. Copy the connection string (looks like: `mongodb+srv://username:password@...`)

### Step 2: Setup Google Gemini API (1 minute)

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Click "Get API Key"
3. Copy your API key

### Step 3: Setup Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add:
- Your MongoDB URI
- A random string for JWT_SECRET (e.g., use `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Your Gemini API key

```bash
npm install
npm start
```

✅ Backend running on `http://localhost:5000`

### Step 4: Setup Frontend (New Terminal)

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

✅ Frontend running on `http://localhost:3000`

### Step 5: Test It!

1. Open `http://localhost:3000` in your browser
2. Click "Create Account"
3. Register with any email/password
4. Create a trip: "Paris, 3 days, Medium budget, food, culture"
5. Watch AI generate your itinerary! 🎉

## 📝 Environment Variables Quick Reference

### Backend `.env`
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your_random_secret_here
GEMINI_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🆘 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Cannot connect to MongoDB" | Check MONGO_URI is correct and cluster allows your IP |
| "API key invalid" | Get a fresh key from Google AI Studio |
| "Cannot GET /api/trips" | Make sure backend is running on 5000 |
| "Blank page on localhost:3000" | Run `npm install` in frontend folder |

## 📚 API Endpoints to Test

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Login (copy the token from response)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get user trips (replace TOKEN with your token)
curl -X GET http://localhost:5000/api/trips \
  -H "Authorization: Bearer TOKEN"
```

## 🎓 Next Steps

1. **Understand the Code**: Read comments in controllers and components
2. **Customize**: Change colors in Tailwind config
3. **Deploy**: Follow README.md deployment section
4. **Add Features**: Extend Trip model with new fields

## 📞 Need Help?

- Check the main README.md for full documentation
- Review code comments in backend/controllers/tripController.js
- Check browser console for frontend errors (F12 → Console)

---

**You're all set! Happy traveling with AI! ✈️**
