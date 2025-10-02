import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import CreateThread from './pages/CreateThread';
import ThreadDetail from './pages/ThreadDetail';
import Profile from './pages/Profile';
import MyThreads from './pages/MyThreads';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersManagement from './pages/admin/UsersManagement';
import ThreadsManagement from './pages/admin/ThreadsManagement';
import CategoriesManagement from './pages/admin/CategoriesManagement';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
          <ScrollToTop />
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            } />
            <Route path="/thread/:id" element={
              <>
                <Header />
                <ThreadDetail />
                <Footer />
              </>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <Header />
                <CreateThread />
                <Footer />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <UsersManagement />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/threads" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <ThreadsManagement />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/categories" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <CategoriesManagement />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            {/* User Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Header />
                <Profile />
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/my-threads" element={
              <ProtectedRoute>
                <Header />
                <MyThreads />
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Header />
                <Settings />
                <Footer />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;