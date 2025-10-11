import { useState, useEffect } from 'react';
import { threadsAPI } from '../../api/threads';

const ThreadsManagement = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingThread, setEditingThread] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await threadsAPI.getAll();
        setThreads(response.data.threads || response.data || []);
      } catch (error) {
        console.error('Failed to fetch threads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  const handleDeleteThread = async (id) => {
    if (!confirm('Are you sure you want to delete this thread?')) return;
    try {
      await threadsAPI.adminDelete(id);
      setThreads(threads.filter(thread => thread._id !== id));
    } catch (error) {
      console.error('Failed to delete thread:', error);
    }
  };

  const handlePinThread = async (id) => {
    try {
      const thread = threads.find(t => t._id === id);
      const newPinStatus = !thread.isPinned;
      await threadsAPI.update(id, { isPinned: newPinStatus });
      setThreads(threads.map(t => 
        t._id === id ? { ...t, isPinned: newPinStatus } : t
      ));
    } catch (error) {
      console.error('Failed to pin thread:', error);
    }
  };

  const handleEditThread = async () => {
    try {
      await threadsAPI.update(editingThread._id, { title: editTitle });
      setThreads(threads.map(t => 
        t._id === editingThread._id ? { ...t, title: editTitle } : t
      ));
      setEditingThread(null);
    } catch (error) {
      console.error('Failed to edit thread:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.author?.username?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || (thread.status || 'active') === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Threads Management</h1>
        <div className="flex space-x-2">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
            Pin Thread
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Delete Selected
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-xl shadow-sm border border-white/10">
        <div className="p-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search threads..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pinned">Pinned</option>
              <option value="locked">Locked</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-white/20" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Thread</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredThreads.map((thread) => (
                <tr key={thread._id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-white/20" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{thread.title}</div>
                    <div className="text-sm text-gray-400">{new Date(thread.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {thread.author?.username?.charAt(0).toUpperCase()}
                      </div>
                      <span className="ml-2 text-sm text-white">{thread.author?.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {thread.category?.name || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    <div>{thread.replies?.length || 0} replies</div>
                    <div>{thread.views || 0} views</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      (thread.status || 'active') === 'pinned' ? 'bg-yellow-100 text-yellow-800' :
                      (thread.status || 'active') === 'locked' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {thread.status || 'active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => {
                        setEditingThread(thread);
                        setEditTitle(thread.title);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handlePinThread(thread._id)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      {thread.isPinned ? 'Unpin' : 'Pin'}
                    </button>
                    <button 
                      onClick={() => handleDeleteThread(thread._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingThread && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 backdrop-blur-2xl rounded-lg p-6 w-96 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-white">Edit Thread</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 backdrop-blur-sm"
                placeholder="Thread title"
              />
              <div className="flex space-x-2">
                <button 
                  onClick={handleEditThread}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
                <button 
                  onClick={() => setEditingThread(null)}
                  className="bg-white/10 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/20 border border-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreadsManagement;