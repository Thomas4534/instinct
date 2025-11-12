// src/components/Network.tsx
import React from "react"
import { useNavigate } from "react-router-dom"
import FloatingHeader from "./FloatingHeader"
import { ArrowLeft, Users, Eye, TrendingUp } from "lucide-react"

const Network: React.FC = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate("/")
  }

  const networkUsers = [
    {
      id: 1,
      name: "Ben Aratame",
      followers: "12.4K",
      totalViews: "200 000 000",
      image: "/images/image (1).jpg",
      trend: "up"
    },
    {
      id: 2,
      name: "Yuki's Garden",
      followers: "8.7K",
      totalViews: "700 000 000",
      image: "/images/image (2).jpg",
      trend: "up"
    },
    {
      id: 3,
      name: "Prosper Chiu",
      followers: "15.2K",
      totalViews: "350 000 000",
      image: "/images/image (3).jpg",
      trend: "up"
    },
    {
      id: 4,
      name: "Katie Xu",
      followers: "6.9K",
      totalViews: "100 000 000",
      image: "/images/image (4).jpg",
      trend: "steady"
    },
    {
      id: 5,
      name: "Remy Zee",
      followers: "21.1K",
      totalViews: "850 000 000",
      image: "/images/image (5).jpg",
      trend: "up"
    },
    {
      id: 6,
      name: "Daniel Mints",
      followers: "9.3K",
      totalViews: "100 000 000",
      image: "/images/image (6).png",
      trend: "steady"
    },
    {
      id: 7,
      name: "Cluely",
      followers: "18.6K",
      totalViews: "2 000 000 000",
      image: "/images/image (7).jpg",
      trend: "up"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24">
      {/* ✅ Floating Header */}
      <FloatingHeader />

      <div className="max-w-4xl mx-auto">
        {/* Minimal Header */}
        <div className="text-center mb-12">
          <h1 className="text-instinct font-light text-white mb-3">
            Network
          </h1>
          <p className="text-white/60 text-instinct-small max-w-md mx-auto">
            Connect with top creators in our ecosystem
          </p>
        </div>

        {/* Simple Network List */}
        <div className="space-y-4">
          {networkUsers.map((user) => (
            <div
              key={user.id}
              className="group flex items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              {/* Left Side - User Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/20">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name and Stats */}
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-white text-instinct-small font-normal mb-1">
                      {user.name}
                    </div>
                    <div className="flex items-center gap-4 text-white/40 text-sm">
                      {/* Followers with Person Icon */}
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{user.followers}</span>
                      </div>

                      {/* Views with Eye Icon */}
                      <div className="flex items-center gap-2 py-1">
                        <Eye className="w-4 h-4" />
                        <span>{user.totalViews}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Action and Trend */}
              <div className="flex items-center gap-4">
                {/* Trend Indicator */}
                <TrendingUp className={`w-4 h-4 ${
                  user.trend === 'up' ? 'text-white' : 'text-white/40'
                }`} />

                {/* Connect Button */}
                <button className="text-instinct-small px-4 py-2 bg-white !text-black rounded-lg hover:bg-white/90 transition-colors duration-200 font-medium">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 text-instinct-small"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default Network
