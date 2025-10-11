import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const VoteSystem = ({ threadId, initialUpvotes = 0, initialDownvotes = 0, userVote = null }) => {
  const { isAuthenticated } = useAuth();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [currentVote, setCurrentVote] = useState(userVote);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (voteType) => {
    if (!isAuthenticated || isVoting) return;
    
    setIsVoting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (currentVote === voteType) {
        // Remove vote
        if (voteType === 'up') {
          setUpvotes(prev => prev - 1);
        } else {
          setDownvotes(prev => prev - 1);
        }
        setCurrentVote(null);
      } else {
        // Change or add vote
        if (currentVote === 'up') {
          setUpvotes(prev => prev - 1);
          setDownvotes(prev => prev + 1);
        } else if (currentVote === 'down') {
          setDownvotes(prev => prev - 1);
          setUpvotes(prev => prev + 1);
        } else {
          if (voteType === 'up') {
            setUpvotes(prev => prev + 1);
          } else {
            setDownvotes(prev => prev + 1);
          }
        }
        setCurrentVote(voteType);
      }
    } catch (error) {
      console.error('Vote failed:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const score = upvotes - downvotes;

  return (
    <div className="flex flex-col items-center space-y-1">
      <button
        onClick={() => handleVote('up')}
        disabled={!isAuthenticated || isVoting}
        className={`p-2 rounded-lg transition-all ${
          currentVote === 'up'
            ? 'bg-green-500 text-white'
            : 'bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600'
        } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      <span className={`font-bold text-sm ${
        score > 0 ? 'text-green-600' : score < 0 ? 'text-red-600' : 'text-gray-600'
      }`}>
        {score}
      </span>
      
      <button
        onClick={() => handleVote('down')}
        disabled={!isAuthenticated || isVoting}
        className={`p-2 rounded-lg transition-all ${
          currentVote === 'down'
            ? 'bg-red-500 text-white'
            : 'bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600'
        } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default VoteSystem;