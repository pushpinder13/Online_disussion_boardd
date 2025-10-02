import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-fade-in-up">
            Welcome to <span className="text-yellow-300">ForumHub</span>
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Where conversations spark innovation and communities thrive
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link 
              to="/create" 
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-2xl"
            >
              🚀 Start Discussion
            </Link>
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all border border-white/30">
              📚 Explore Topics
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-yellow-300">{stats?.discussions || 0}</div>
            <div className="text-blue-100">Active Discussions</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-green-300">{stats?.categories || 0}</div>
            <div className="text-blue-100">Categories</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-pink-300">{stats?.replies || 0}</div>
            <div className="text-blue-100">Total Replies</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-orange-300">{stats?.views || 0}</div>
            <div className="text-blue-100">Total Views</div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Why Choose ForumHub?</h2>
          </div>
          
          <div className="relative h-40 overflow-hidden">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${
                  index === currentSlide 
                    ? 'translate-x-0 opacity-100' 
                    : index < currentSlide 
                      ? '-translate-x-full opacity-0' 
                      : 'translate-x-full opacity-0'
                }`}
              >
                <div className="text-center w-full">
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-blue-100 text-lg px-4">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-2 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-yellow-300' : 'bg-white/30'
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