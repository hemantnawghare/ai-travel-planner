
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

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

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
