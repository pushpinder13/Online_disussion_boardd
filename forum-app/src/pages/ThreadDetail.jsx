import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { threadsAPI } from '../api/threads';
import { repliesAPI } from '../api/replies';
import { votesAPI } from '../api/votes';
import { useAuth } from '../context/AuthContext';

const ThreadDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [userVote, setUserVote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSuggestions, setMentionSuggestions] = useState([]);
  const [mentionQuery, setMentionQuery] = useState('');

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await threadsAPI.getById(id);
        setThread(response.data);
        setEditTitle(response.data.title);
        setEditContent(response.data.content);
        // Check if user has voted
        if (isAuthenticated && response.data.votes) {
          const vote = response.data.votes.find(v => v.user === user?._id);
          setUserVote(vote?.type || null);
        }
      } catch (error) {
        console.error('Failed to fetch thread:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [id]);

  const handleVote = async (voteType) => {
    if (!isAuthenticated) return;
    
    try {
      await votesAPI.voteThread(id, voteType);
      setUserVote(userVote === voteType ? null : voteType);
      // Update vote count locally instead of refetching
      const newVotes = thread.votes || [];
      const existingVoteIndex = newVotes.findIndex(v => v.user === user._id);
      
      if (existingVoteIndex >= 0) {
        if (userVote === voteType) {
          newVotes.splice(existingVoteIndex, 1);
        } else {
          newVotes[existingVoteIndex].type = voteType;
        }
      } else {
        newVotes.push({ user: user._id, type: voteType });
      }
      
      setThread({ ...thread, votes: newVotes });
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim() || !isAuthenticated) return;
    
    setSubmittingReply(true);
    try {
      const response = await repliesAPI.create(id, { content: replyContent });
      setReplyContent('');
      setReplyingTo(null);
      // Add reply locally instead of refetching
      const newReply = {
        _id: Date.now().toString(),
        content: replyContent,
        author: { _id: user._id, username: user.username },
        createdAt: new Date().toISOString()
      };
      setThread({ ...thread, replies: [...(thread.replies || []), newReply] });
    } catch (error) {
      console.error('Failed to post reply:', error);
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleReplyToUser = (username) => {
    setReplyingTo(username);
    setReplyContent(`@${username} `);
    document.querySelector('textarea').focus();
  };

  const handleReplyContentChange = (e) => {
    const value = e.target.value;
    setReplyContent(value);
    
    // Check for @ mentions
    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const afterAt = value.substring(lastAtIndex + 1);
      const spaceIndex = afterAt.indexOf(' ');
      
      if (spaceIndex === -1) {
        // Still typing mention
        const query = afterAt.toLowerCase();
        setMentionQuery(query);
        
        // Get unique users from thread author and replies
        const users = new Set();
        if (thread.author?.username) users.add(thread.author.username);
        thread.replies?.forEach(reply => {
          if (reply.author?.username) users.add(reply.author.username);
        });
        
        // Filter users based on query and exclude current user
        const filtered = Array.from(users)
          .filter(username => 
            username.toLowerCase().includes(query) && 
            username !== user?.username
          )
          .slice(0, 5);
        
        setMentionSuggestions(filtered);
        setShowMentions(filtered.length > 0);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const selectMention = (username) => {
    const lastAtIndex = replyContent.lastIndexOf('@');
    const beforeAt = replyContent.substring(0, lastAtIndex);
    setReplyContent(`${beforeAt}@${username} `);
    setShowMentions(false);
    document.querySelector('textarea').focus();
  };

  const handleEdit = async () => {
    try {
      await threadsAPI.update(id, { title: editTitle, content: editContent });
      setThread({ ...thread, title: editTitle, content: editContent, isEdited: true });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update thread:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this thread?')) return;
    try {
      await threadsAPI.delete(id);
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to delete thread:', error);
    }
  };

  const isOwner = user && thread && thread.author?._id === user._id;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thread not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Discussions
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8">
          <div className="flex items-center mb-6">
            {thread.category && (
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mr-4">
                {thread.category.name}
              </span>
            )}
          </div>

          {isEditing ? (
            <input 
              type="text" 
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 border border-gray-300 rounded-lg px-3 py-2"
            />
          ) : (
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{thread.title}</h1>
              {isOwner && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 hover:text-blue-700 px-3 py-1 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-700 px-3 py-1 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
              {thread.author?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{thread.author?.username}</p>
              <p className="text-gray-500 text-sm">{new Date(thread.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            {isEditing ? (
              <div>
                <textarea 
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-32 mb-4"
                />
                <div className="flex space-x-2">
                  <button 
                    onClick={handleEdit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setEditTitle(thread.title);
                      setEditContent(thread.content);
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{thread.content}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-6 text-gray-500">
              <span>{thread.views || 0} views</span>
              <span>{thread.replies?.length || 0} replies</span>
            </div>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleVote('upvote')}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    userVote === 'upvote' 
                      ? 'bg-green-100 text-green-600' 
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                  }`}
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  {thread.votes?.filter(v => v.type === 'upvote').length || 0}
                </button>
                <button
                  onClick={() => handleVote('downvote')}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    userVote === 'downvote' 
                      ? 'bg-red-100 text-red-600' 
                      : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {thread.votes?.filter(v => v.type === 'downvote').length || 0}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Replies Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Replies ({thread.replies?.length || 0})
          </h2>

          {thread.replies?.map((reply) => (
            <div key={reply._id} className="border-b border-gray-200 pb-6 mb-6 last:border-b-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {reply.author?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{reply.author?.username}</p>
                    <p className="text-gray-500 text-sm">{new Date(reply.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                {isAuthenticated && reply.author?.username !== user?.username && (
                  <button 
                    onClick={() => handleReplyToUser(reply.author.username)}
                    className="text-blue-600 hover:text-blue-700 text-sm px-2 py-1 rounded"
                  >
                    Reply
                  </button>
                )}
              </div>
              <div className="ml-13">
                <p className="text-gray-700">
                  {reply.content.split(' ').map((word, index) => {
                    if (word.startsWith('@')) {
                      return (
                        <span key={index} className="text-blue-600 font-medium">
                          {word}{' '}
                        </span>
                      );
                    }
                    return word + ' ';
                  })}
                </p>
              </div>
            </div>
          ))}

          {isAuthenticated ? (
            <form onSubmit={handleReplySubmit} className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {replyingTo ? `Replying to @${replyingTo}` : 'Add a Reply'}
                </h3>
                {replyingTo && (
                  <button 
                    type="button"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContent('');
                    }}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Cancel Reply
                  </button>
                )}
              </div>
              <div className="relative">
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={replyingTo ? `Reply to @${replyingTo}...` : "Write your reply..."}
                  value={replyContent}
                  onChange={handleReplyContentChange}
                  required
                />
                {showMentions && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                    {mentionSuggestions.map((username) => (
                      <button
                        key={username}
                        type="button"
                        onClick={() => selectMention(username)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold mr-2">
                          {username.charAt(0).toUpperCase()}
                        </div>
                        @{username}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Tip: Type @ to mention someone who has participated in this thread
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={!replyContent.trim() || submittingReply}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
                >
                  {submittingReply ? 'Posting...' : 'Post Reply'}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 mb-4">Please log in to reply to this thread.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;