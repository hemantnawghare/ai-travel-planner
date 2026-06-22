# AI Travel Planner

A comprehensive, production-ready multi-user web application where users can create, customize, and save interactive travel itineraries using an AI LLM (Google Gemini). The application dynamically generates structured day-by-day itineraries, estimates realistic budgets, suggests hotels based on budget profiles, permits real-time editing, and includes an innovative AI Weather-Aware Packing Assistant.

## 🚀 Features

- **AI-Powered Itinerary Generation**: Uses Google Gemini 2.5 Flash to create detailed day-by-day travel plans
- **Budget Tracking**: Breaks down costs by accommodation, food, activities, and transport
- **Hotel Recommendations**: AI suggests hotels based on destination and budget tier
- **Dynamic Editing**: Add, remove, or regenerate specific activities on any day
- **Weather-Aware Packing Assistant**: AI-generated packing list tailored to climate and activities
- **Multi-User Support**: Secure authentication with JWT tokens and user data isolation
- **Responsive Design**: Fully responsive UI built with Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (v18+ or v20+ LTS)
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT + bcryptjs
- **AI/LLM**: Google Gemini 2.5 Flash API
- **Language**: JavaScript/TypeScript

### Frontend
- **Framework**: Next.js (App Router)
- **UI Library**: React.js
- **Styling**: Tailwind CSS
- **HTTP Client**: Fetch API
- **Language**: TypeScript

## 📋 Prerequisites

Before you start, ensure you have:
- **Node.js**: v18.x or v20.x LTS
- **npm**: Bundled with Node.js
- **MongoDB Atlas Account**: Free cloud-hosted cluster from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Google Gemini API Key**: Free API key from [Google AI Studio](https://aistudio.google.com/apikey)
- **Code Editor**: VS Code with ESLint & Prettier extensions (recommended)

## ⚙️ Installation & Setup

### 1. Clone or Extract the Project

```bash
cd ai-travel-planner
```

### 2. Backend Setup

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
