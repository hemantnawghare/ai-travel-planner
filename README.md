
# AI Travel Planner

An intelligent travel planning application powered by Google Gemini AI. Plan your perfect trip with AI-generated itineraries, hotel recommendations, budget breakdowns, and a smart packing list.

## 🚀 Features

- **AI-Powered Trip Generation**: Generate detailed day-by-day travel plans using Google Gemini
- **Smart Budget Tracking**: See costs in INR with breakdown by category
- **Hotel Recommendations**: Get personalized hotel suggestions for your destination
- **Itinerary Management**: Create, edit, and customize your daily activities
- **Packing Assistant**: AI-generated packing list with category organization
- **User Authentication**: Secure login/registration system
- **Trip Management**: Save, view, update, and delete your itineraries

## 📋 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **AI**: Google Gemini 2.5 Flash API
- **ORM**: Mongoose

### Frontend
- **Framework**: Next.js 16.2.9
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: React 19.2.4

## 🛠️ Installation

### Prerequisites
- Node.js 16+
- MongoDB Atlas account (cloud database)
- Google Gemini API key
- Git

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secret_key_for_jwt
```

4. **Start the server:**
```bash
npm start
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env.local` file:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. **Start development server:**
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🌐 Deployment

### Backend Deployment (Render)
✅ **Already Deployed at**: https://ai-travel-planner-iwrt.onrender.com

### Frontend Deployment (Vercel)

**Follow these steps:**

1. **Push code to GitHub** (if not already done):
```bash
cd d:\AI-travelPlanner\ai-travel-planner
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Select your `ai-travel-planner` GitHub repository
   - Configure:
     - **Framework Preset**: Next.js
     - **Root Directory**: `frontend`
   - Click "Continue"

3. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add variable:
     - **Name**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://ai-travel-planner-iwrt.onrender.com`
   - Click "Add"

4. **Deploy**:
   - Click "Deploy" button
   - Wait for build to complete (3-5 minutes)
   - Your frontend will be live at a Vercel URL

## 🔐 Environment Variables

### Backend `.env` (Render)
| Variable | Description | Example |
|----------|-------------|----------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `JWT_SECRET` | JWT secret key | `your-secret-key` |

### Frontend `.env.local` (Vercel)
| Variable | Description | Example |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://ai-travel-planner-iwrt.onrender.com` |

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Trips
- `GET /api/trips` - Get all user trips
- `GET /api/trips/:tripId` - Get specific trip
- `POST /api/trips/generate` - Generate new trip with AI
- `PUT /api/trips/:tripId` - Update trip
- `DELETE /api/trips/:tripId` - Delete trip
- `POST /api/trips/:tripId/regenerate-day/:dayNumber` - Regenerate specific day

## 🚀 Usage

1. **Register/Login**: Create your account or login
2. **Create Trip**: Fill in destination, duration, budget, and interests
3. **AI Generation**: Let Gemini AI create your itinerary
4. **Customize**: Edit activities, hotels, and packing list
5. **Save**: Your trips are automatically saved

## 📦 Project Structure

```
ai-travel-planner/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── tripController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Trip.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── tripRoutes.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── register/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── src/
│   │   ├── components/
│   │   ├── types/
│   │   └── utils/
│   ├── .env.example
│   ├── .env.local
│   ├── .gitignore
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
├── .gitignore
└── README.md
```

## 🐛 Troubleshooting

### Vercel Deployment Issues
- **Build fails**: Check that `NEXT_PUBLIC_API_URL` is set in Vercel environment variables
- **API calls fail**: Verify the backend URL is correct and backend is running
- **CORS issues**: Ensure backend allows requests from your Vercel domain

### Frontend Build Errors
- Clear `.next/` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `npm install`
- Check `NEXT_PUBLIC_API_URL` is set correctly

### Backend Connection Issues
- Verify MongoDB URI is correct
- Check Gemini API key is valid
- Ensure JWT_SECRET is set
- Backend must be running before frontend API calls

## 📄 License

MIT

## 🤝 Support

For issues and questions, please open a GitHub issue in the repository.

---

**Made with ❤️ by AI Travel Planner Team**


Navigate to the backend directory:

```bash
cd backend
```

#### Install dependencies:
```bash
npm install
```

#### Set up environment variables:

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with:
```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-travel-planner?retryWrites=true&w=majority

# JWT Secret Key (use a strong random string)
JWT_SECRET=your_super_secure_jwt_secret_key_here_change_this_in_production

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

#### Start the backend server:

```bash
npm start
```

The API will be running at `http://localhost:5000`

**Health check**: Visit `http://localhost:5000/health` in your browser or use:
```bash
curl http://localhost:5000/health
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

#### Install dependencies:
```bash
npm install
```

#### Set up environment variables:

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
=======

# AI Travel Planner

## Overview

AI Travel Planner is a full-stack web application that helps users generate personalized travel itineraries using Artificial Intelligence. Users can create trips by providing details such as destination, duration, budget preference, and interests. The application generates a complete day-by-day itinerary, estimates travel costs, recommends hotels, and provides a smart packing checklist.

The application supports multiple users with secure authentication and strict data isolation, ensuring that users can only access and manage their own travel plans.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes
* Secure Password Hashing using bcrypt
* User-specific data access and isolation

### AI-Powered Travel Planning

Generate personalized travel plans based on:

* Destination
* Number of Days
* Budget Preference

  * Low
  * Medium
  * High
* Travel Interests

  * Food
  * Culture
  * Adventure
  * Shopping
  * Nature
  * History

### Budget Estimation

The AI provides an estimated trip budget including:

* Accommodation
* Food
* Transportation
* Activities
* Total Estimated Cost

### Hotel Recommendations

AI-generated hotel recommendations based on:

* Destination
* Budget Tier
* Traveler Preferences

### Editable Itinerary

Users can:

* Add Activities
* Remove Activities
* Update Activities
* Regenerate Specific Days

### Custom Feature: AI Packing Assistant

A smart packing checklist generated using destination, weather patterns, and planned activities.

Examples:

* Passport
* Travel Documents
* Walking Shoes
* Rain Jacket
* Power Bank
* Sunscreen

Users can mark items as packed and track their preparation progress.

---

## Tech Stack

### Frontend

* Next.js 15
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MongoDB Atlas
* Mongoose ODM

### Authentication

* JWT (JSON Web Tokens)
* bcryptjs

### AI Integration

* Google Gemini 2.5 Flash

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## System Architecture

User → Next.js Frontend → Express API → Gemini AI + MongoDB

1. User submits travel preferences.
2. Backend validates the request.
3. Gemini generates a structured travel plan.
4. The generated itinerary is stored in MongoDB.
5. User can edit and manage trips from the dashboard.

---

## Project Structure

```text
ai-travel-planner/

├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── types/
│   ├── .env.local
│   └── package.json
│
└── README.md
```

---

## Database Schema

### User

```javascript
{
  _id,
  name,
  email,
  password,
  createdAt
}
```

### Trip

```javascript
{
  _id,
  userId,
  destination,
  durationDays,
  budgetTier,
  interests,
  itinerary,
  hotels,
  budget,
  packingList,
  createdAt,
  updatedAt
}
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Trips

```http
POST   /api/trips
GET    /api/trips
GET    /api/trips/:id
DELETE /api/trips/:id
```

### Itinerary Operations

```http
POST   /api/trips/regenerate-day
POST   /api/trips/add-activity
DELETE /api/trips/remove-activity
```

---

## Environment Variables

### Backend

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

### Frontend

>>>>>>> e774a4c72737834df0fc27deac4af539c98f7286
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Start the frontend development server:

```bash
npm run dev
```

The frontend will be running at `http://localhost:3000`

## 🧪 Testing the Application

### 1. Register a New User

- Open `http://localhost:3000/register`
- Fill in email, password, and optional first/last name
- Click "Create Account"

### 2. Login

- Navigate to `http://localhost:3000/login`
- Use your registered credentials
- You'll be redirected to the dashboard

### 3. Create a Trip

- Click "+ New Trip" button
- Fill in:
  - **Destination**: e.g., "Tokyo"
  - **Duration**: e.g., "5" days
  - **Budget Tier**: Choose "Low", "Medium", or "High"
  - **Interests**: e.g., "culture, food, hiking" (comma-separated)
- Click "✈️ Generate My Trip"
- Wait for AI to generate your itinerary

### 4. Customize Your Trip

- View the generated itinerary with activities for each day
- **Add Activities**: Type a new activity and click "Add"
- **Remove Activities**: Hover over an activity and click "Remove"
- **Update Packing List**: Click checkboxes to mark items as packed
- **View Budget**: Check the financial ledger on the sidebar

## 🔐 Security Architecture

### User Data Isolation

The system implements strict user isolation through:

1. **Authentication Middleware**: Every request to protected routes must include a valid JWT token
2. **User ID Binding**: All trips are explicitly linked to their owner via `userId` field
3. **Database Queries**: All trip queries filter by authenticated user's ID
4. **Access Control**: Endpoints verify that the requesting user owns the resource before allowing modifications

### Password Security

- Passwords are hashed using **bcryptjs** with 10 salt rounds
- Plain-text passwords are never stored
- Password validation uses secure comparison

### API Token Security

- JWT tokens expire after 7 days
- Tokens are validated on every protected request
- Invalid or expired tokens return HTTP 401 Unauthorized

## 📚 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Trip Routes (All require authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/trips/generate` | Generate new AI trip |
| GET | `/api/trips` | Get all user trips |
| GET | `/api/trips/:tripId` | Get single trip by ID |
| PUT | `/api/trips/:tripId` | Update trip (itinerary, packing list, etc.) |
| DELETE | `/api/trips/:tripId` | Delete trip |
| POST | `/api/trips/:tripId/regenerate-day/:dayNumber` | Regenerate specific day with feedback |

## 🏗️ Project Structure

```
ai-travel-planner/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Trip.js               # Trip schema
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── tripController.js     # Trip logic with AI integration
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── tripRoutes.js         # Trip endpoints
│   ├── server.js                 # Express app entry point
│   ├── package.json
│   ├── .env.example
│   └── tsconfig.json
│
└── frontend/
    ├── app/
    │   ├── page.tsx              # Landing page
    │   ├── layout.tsx            # Root layout
    │   ├── globals.css
    │   ├── login/
    │   │   └── page.tsx          # Login page
    │   ├── register/
    │   │   └── page.tsx          # Register page
    │   └── dashboard/
    │       └── page.tsx          # Main dashboard
    ├── src/
    │   ├── components/
    │   │   ├── CreateTripForm.tsx    # Trip creation form
    │   │   ├── ItineraryCard.tsx     # Itinerary display & editor
    │   │   └── PackingList.tsx       # Packing checklist
    │   ├── utils/
    │   │   └── api.ts               # API client
    │   └── types/
    │       └── index.ts             # TypeScript definitions
    ├── package.json
    ├── .env.example
    ├── next.config.ts
    ├── tailwind.config.js
    └── tsconfig.json
```

## 🚀 Deployment

### Backend Deployment (Render or Railway)

1. **Push to GitHub**
   - Create a GitHub repository
   - Push the `/backend` folder
   - Add `.env` to `.gitignore` (never commit secrets)

2. **Deploy to Render or Railway**
   - Connect your GitHub repo
   - Set environment variables in the provider dashboard:
     ```
     PORT=5000
     MONGO_URI=mongodb+srv://...
     JWT_SECRET=your_secure_key
     GEMINI_API_KEY=your_key
     ```
   - Deploy

3. **Get your backend URL** (e.g., `https://your-app.onrender.com`)

### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)

2. **Deploy Frontend**
   - Select your frontend repository
   - Set environment variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
     ```
   - Deploy

3. **Your app is live!**

## ⚠️ Troubleshooting

### "Cannot find module 'express'"

```bash
cd backend
npm install
```

### "MONGO_URI is not defined"

Check that your `.env` file exists and has the `MONGO_URI` variable set.

### "GEMINI_API_KEY not found"

Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey) and add it to `.env`.

### Frontend can't connect to backend

Ensure:
- Backend is running on port 5000
- `NEXT_PUBLIC_API_URL` in frontend `.env.local` matches backend URL
- CORS is enabled (it is by default in this project)

### AI response is not valid JSON

This sometimes happens with rate limiting. The backend retries automatically up to 5 times with exponential backoff.

## 📖 API Request/Response Examples

### Register User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secure123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Generate Trip

**Request:**
```bash
curl -X POST http://localhost:5000/api/trips/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "destination": "Tokyo",
    "durationDays": 5,
    "budgetTier": "Medium",
    "interests": ["culture", "food", "hiking"]
  }'
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "destination": "Tokyo",
  "durationDays": 5,
  "budgetTier": "Medium",
  "interests": ["culture", "food", "hiking"],
  "itinerary": [
    {
      "dayNumber": 1,
      "activities": [
        {
          "title": "Arrival & Hotel Check-in",
          "description": "Arrive at Narita Airport and transfer to hotel",
          "estimatedCostUSD": 30,
          "timeOfDay": "Afternoon"
        }
      ]
    }
  ],
  "estimatedBudget": {
    "transport": 150,
    "accommodation": 400,
    "food": 200,
    "activities": 250,
    "total": 1000
  }
}
```

## 🎯 Next Steps

1. **Customize Styling**: Modify Tailwind classes in components
2. **Add More Features**: 
   - Flight search integration
   - User avatar upload
   - Collaborative trip planning
   - Mobile app version
3. **Optimize Performance**: Add caching, pagination, image optimization
4. **Analytics**: Track user trips, popular destinations
5. **Notifications**: Email confirmation for trip creation

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For issues, questions, or feature requests, please open an issue in the GitHub repository.

---

**Built with ❤️ using Node.js, Next.js, and Google Gemini AI**
=======
---

## Local Setup

### Clone Repository

```bash
git clone <repository-url>

cd ai-travel-planner
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

---

## Deployment

### Frontend

Deploy using Vercel.

### Backend

Deploy using Render.

### Database

Host MongoDB using MongoDB Atlas.

---

## Security Measures

* JWT Authentication
* Password Hashing with bcrypt
* Protected API Routes
* User Data Isolation
* Environment Variable Protection
* Input Validation
* Secure MongoDB Access

---

## AI Agent Design

The AI Agent is powered by Google Gemini 2.5 Flash.

The backend constructs a structured prompt using user preferences and requests a JSON response from Gemini.

The AI returns:

* Day-by-Day Itinerary
* Budget Estimation
* Hotel Recommendations
* Packing Checklist

The response is validated and stored in MongoDB for future modifications.

---

## Design Decisions

### Why Gemini?

* Fast response times
* Cost-effective
* Excellent JSON generation capabilities
* Easy API integration

### Why Next.js?

* Modern React framework
* Better performance
* SEO-friendly
* Excellent developer experience

### Why MongoDB?

* Flexible schema
* Easy storage of nested itinerary structures
* Rapid development

---

## Future Improvements

* Real-time Weather Integration
* Flight Recommendations
* Interactive Maps

---

## Known Limitations

* Budget estimates may vary from actual market prices.
* Hotel recommendations are AI-generated and not real-time.
* Flight pricing is not integrated.
* Weather information is estimated unless external APIs are connected.

---

## Author

Hemant Nawghare

Built as part of an AI Travel Planner Assessment demonstrating:

* Full Stack Development
* Secure Authentication
* AI Agent Integration
* System Design
* Cloud Deployment
* Production-Oriented Engineering Practices