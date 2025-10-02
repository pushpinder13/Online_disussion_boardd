import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold text-lg animate-float">
                F
              </div>
              <span className="text-2xl font-bold text-gradient-enhanced">ForumHub</span>
            </div>
            <p className="text-gray-300 text-lg mb-6 max-w-md">
              Building communities through meaningful conversations. Join thousands of users sharing ideas, solving problems, and connecting worldwide.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                <span className="text-xl">📘</span>
              </button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                <span className="text-xl">🐦</span>
              </button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                <span className="text-xl">💼</span>
              </button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110">
                <span className="text-xl">📸</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-300">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">🏠</span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">✍️</span>
                  Create Thread
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">👤</span>
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/my-threads" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">💬</span>
                  My Threads
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-purple-300">Community</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">📋</span>
                  Guidelines
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">🛡️</span>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">📞</span>
                  Contact Us
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">❓</span>
                  Help Center
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © {currentYear} ForumHub. Made with ❤️ for the community.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                All systems operational
              </span>
              <span>Version 2.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/20 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            🚀 Powered by modern web technologies • Built for the future of online communities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;