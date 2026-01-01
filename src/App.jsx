import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./admin/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./admin/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import VerifyCertificate from "./components/Verificationcertficate";
import Login from "./components/Login";
import PublicRoute from './admin/PublicRoute';
import Register from "./components/SignUp";
import Reachus from "./components/Reachus";
import Maincourse from "./components/Maincourse";
import Whoweare from "./pages/Whoweare";
import DashboardLayout from './pages/DashboardLayout';
import ProfileHome from './pages/ProfileHome';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Intern from "./components/Intern ";
import Challenges from "./components/ChallengeCard";
import CommunityGrid from "./components/CommunityCard";
import CourseCard from "./components/CourseCard";
import Profile from "./components/Profile";
import ChallengesProcess from "./components/ChallengesProcess";
import AdminPage from "./admin/AddDetailsbyAdmin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import AdminNavigation from "./admin/AdminNavigation";
import AdminModelManager from "./admin/AdminModelManager";
import CreateClan from "./pages/CreateClan";
import ClanDetail from "./pages/ClanDetail";
import Leaderboard from "./pages/Leaderboard";
import Notifications from "./pages/Notifications";
import Projects from "./pages/Projects";
import Resources from "./pages/Resources";
import Certificates from "./pages/Certificates";
import './App.css';

const NavbarWrapper = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 780);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Hide navbar on login, register, admin pages, and all dashboard pages
  const hideNavbarRoutes = ['/login', '/register'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  // Show navbar only on public pages (not login/register, not admin, not dashboard)
  const showNavbar = !hideNavbarRoutes.includes(location.pathname) &&
    !isAdminRoute &&
    !isDashboardRoute;

  return showNavbar ? <Navbar /> : null;
};

const FooterWrapper = () => {
  const location = useLocation();

  // Hide footer on login, register, admin pages, and all dashboard pages
  const hideFooterRoutes = ['/login', '/register'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  // Show footer only on public pages
  const showFooter = !hideFooterRoutes.includes(location.pathname) &&
    !isAdminRoute &&
    !isDashboardRoute;

  return showFooter ? <Footer /> : null;
};

// Admin Navigation Wrapper
const AdminNavigationWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminLogin = location.pathname === '/admin/login';

  return (isAdminRoute && !isAdminLogin) ? <AdminNavigation /> : null;
};

// Admin Layout Component
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminNavigationWrapper />
      <div className="admin-content" style={{
        flex: 1,
        marginLeft: window.innerWidth > 1024 ? '280px' : '0',
        marginTop: window.innerWidth <= 1024 ? '60px' : '0',
        transition: 'margin-left 0.3s ease'
      }}>
        {children}
      </div>
    </div>
  );
};

// Dashboard Page Wrapper - wraps content with consistent styling
const DashboardPage = ({ children }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

// Main App Component
const AppContent = () => {
  return (
    <>
      <NavbarWrapper />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/courses" element={<PublicRoute><Maincourse /></PublicRoute>} />
        <Route path="/certificate" element={<PublicRoute><VerifyCertificate /></PublicRoute>} />
        <Route path="/who" element={<PublicRoute><Whoweare /></PublicRoute>} />
        <Route path="/reach" element={<PublicRoute><Reachus /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Protected Dashboard Routes - All wrapped with DashboardLayout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage>
              <ProfileHome />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/challenges" element={
          <ProtectedRoute>
            <DashboardPage>
              <Challenges />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/community" element={
          <ProtectedRoute>
            <DashboardPage>
              <CommunityGrid />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/coursecard" element={
          <ProtectedRoute>
            <DashboardPage>
              <CourseCard />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/intern" element={
          <ProtectedRoute>
            <DashboardPage>
              <Intern />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/resume" element={
          <ProtectedRoute>
            <DashboardPage>
              <ResumeAnalyzer />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/profile" element={
          <ProtectedRoute>
            <DashboardPage>
              <Profile />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/challengesprocess" element={
          <ProtectedRoute>
            <DashboardPage>
              <ChallengesProcess />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/resources" element={
          <ProtectedRoute>
            <DashboardPage>
              <Resources />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/projects" element={
          <ProtectedRoute>
            <DashboardPage>
              <Projects />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/certificates" element={
          <ProtectedRoute>
            <DashboardPage>
              <Certificates />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/create-clan" element={
          <ProtectedRoute>
            <DashboardPage>
              <CreateClan />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/community/:id" element={
          <ProtectedRoute>
            <DashboardPage>
              <ClanDetail />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/leaderboard" element={
          <ProtectedRoute>
            <DashboardPage>
              <Leaderboard />
            </DashboardPage>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/notifications" element={
          <ProtectedRoute>
            <DashboardPage>
              <Notifications />
            </DashboardPage>
          </ProtectedRoute>
        } />

        {/* Admin Login (Public) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes (Protected - Require Admin Role) */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminPage />
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* Admin Model Management Routes */}
        <Route path="/admin/manage" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminModelManager />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/manage/:modelName" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminModelManager />
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* Legacy Admin Routes */}
        <Route path="/admin/users" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminModelManager />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/courses" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminModelManager />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/challenges" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminModelManager />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/communities" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminModelManager />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/internships" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminModelManager />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
      <FooterWrapper />
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;