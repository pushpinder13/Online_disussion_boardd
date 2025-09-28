import { useState, useEffect } from 'react';

const ReportsManagement = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock data for reports
    const mockReports = [
      {
        id: 1,
        type: 'spam',
        reportedContent: 'Inappropriate thread content',
        reportedBy: 'user123',
        reportedUser: 'spammer456',
        status: 'pending',
        createdAt: '2024-01-15T10:30:00Z',
        description: 'This thread contains spam content'
      },
      {
        id: 2,
        type: 'harassment',
        reportedContent: 'Offensive comment',
        reportedBy: 'user789',
        reportedUser: 'baduser123',
        status: 'resolved',
        createdAt: '2024-01-14T15:45:00Z',
        description: 'User was harassing other members'
      }
    ];
    
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, []);

  const handleResolveReport = (id) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: 'resolved' } : report
    ));
  };

  const filteredReports = reports.filter(report => 
    filterStatus === 'all' || report.status === filterStatus
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports Management</h1>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Reports</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  report.type === 'spam' ? 'bg-red-100 text-red-800' :
                  report.type === 'harassment' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.type}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {report.status}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(report.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-gray-900">Reported Content</h3>
                <p className="text-gray-600 text-sm">{report.reportedContent}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Reported by:</span>
                  <span className="text-sm text-gray-600 ml-2">{report.reportedBy}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Reported user:</span>
                  <span className="text-sm text-gray-600 ml-2">{report.reportedUser}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900">Description</h4>
                <p className="text-gray-600 text-sm">{report.description}</p>
              </div>
            </div>

            {report.status === 'pending' && (
              <div className="flex space-x-3 mt-4 pt-4 border-t">
                <button
                  onClick={() => handleResolveReport(report.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Resolve
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Dismiss
                </button>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Warn User
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsManagement;