import { Link } from 'react-router-dom';

const ThreadCard = ({ thread }) => {
  return (
    <div className="glass-effect border border-white/20 rounded-2xl p-6 card-hover group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Link 
            to={`/thread/${thread._id}`}
            className="text-lg sm:text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 group-hover:text-blue-600 block mb-3"
          >
            {thread.title}
          </Link>
          <p className="text-gray-600 mt-2 line-clamp-3 leading-relaxed">{thread.content}</p>
        </div>
        <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-white/50">
              {thread.author?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-sm font-medium text-gray-900">{thread.author?.username}</span>
              <div className="text-xs text-gray-500">{new Date(thread.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>
          
          {thread.category && (
            <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-200">
              {thread.category.name}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="font-medium">{thread.replies?.length || 0}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="font-medium">{thread.views || 0}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span className="font-bold">{thread.votes?.filter(v => v.type === 'upvote').length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;