import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="text-6xl font-bold mb-4">✈️</div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            AI Travel Planner
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Create, customize, and save interactive travel itineraries using AI.
            Get day-by-day plans, budget estimates, hotel recommendations, and an AI-powered packing assistant.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/login"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition border border-slate-700"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-2">AI-Generated Itineraries</h3>
          <p className="text-slate-400">
            Powered by Google Gemini, create detailed day-by-day travel plans tailored to your interests and budget.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-bold mb-2">Smart Budget Tracking</h3>
          <p className="text-slate-400">
            Get realistic cost estimates broken down by accommodation, food, activities, and transport.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <div className="text-4xl mb-4">🎒</div>
          <h3 className="text-xl font-bold mb-2">Weather-Aware Packing</h3>
          <p className="text-slate-400">
            Get an AI-generated packing list tailored to your destination's climate and planned activities.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="space-y-6">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Sign Up & Login</h3>
              <p className="text-slate-400">Create a secure account to save your travel plans and access them anytime.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Describe Your Trip</h3>
              <p className="text-slate-400">Enter your destination, duration, budget tier, and interests.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Get AI Recommendations</h3>
              <p className="text-slate-400">Our AI generates a complete itinerary with hotels, activities, and packing list.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold">4</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Customize & Save</h3>
              <p className="text-slate-400">Edit activities, mark items as packed, and regenerate days as needed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Next Adventure?</h2>
          <p className="text-lg mb-8 opacity-90">Start creating your AI-powered travel itinerary today.</p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-slate-100 transition"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
