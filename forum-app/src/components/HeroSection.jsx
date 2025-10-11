import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from './StatsCard';

const HeroSection = ({ stats }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const features = [
    {
      icon: "💬",
      title: "Join Discussions",
      description: "Connect with like-minded people and share your thoughts"
    },
    {
      icon: "🚀",
      title: "Share Ideas",
      description: "Bring your innovative ideas to life with community support"
    },
    {
      icon: "🌟",
      title: "Get Featured",
      description: "Quality content gets recognized and highlighted"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-black/30 backdrop-blur-xl text-white border-b border-white/10">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-2xl">💬</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              ForumHub
            </h1>
          </div>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            The ultimate destination for meaningful discussions, innovative ideas, and thriving communities
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Link 
              to="/create" 
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-3"
            >
              <span className="text-2xl group-hover:animate-bounce">🚀</span>
              <span>Start Discussion</span>
            </Link>
            <button className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 hover:border-white/40 flex items-center space-x-3">
              <span className="text-2xl">🌟</span>
              <span>Explore Topics</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatsCard 
            icon="💬"
            title="Active Discussions"
            value={stats?.discussions || 0}
            trend={12}
            color="orange"
          />
          <StatsCard 
            icon="📚"
            title="Categories"
            value={stats?.categories || 0}
            trend={5}
            color="green"
          />
          <StatsCard 
            icon="💭"
            title="Total Replies"
            value={stats?.replies || 0}
            trend={-2}
            color="purple"
          />
          <StatsCard 
            icon="👀"
            title="Total Views"
            value={stats?.views || 0}
            trend={18}
            color="blue"
          />
        </div>

        <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-white/20 transition-all">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Why Choose ForumHub?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="relative h-48 overflow-hidden rounded-2xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${
                  index === currentSlide 
                    ? 'translate-x-0 opacity-100 scale-100' 
                    : index < currentSlide 
                      ? '-translate-x-full opacity-0 scale-95' 
                      : 'translate-x-full opacity-0 scale-95'
                }`}
              >
                <div className="text-center w-full px-8">
                  <div className="text-7xl mb-6 animate-bounce">{feature.icon}</div>
                  <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-3 mt-10">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;