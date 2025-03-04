
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Layout
import AppLayout from "./components/layout/AppLayout";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public route component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        {/* Add more routes for other pages */}
        <Route path="clients" element={<div className="min-h-[40vh] flex items-center justify-center">صفحة العملاء - قيد التطوير</div>} />
        <Route path="payments" element={<div className="min-h-[40vh] flex items-center justify-center">صفحة المدفوعات - قيد التطوير</div>} />
        <Route path="reminders" element={<div className="min-h-[40vh] flex items-center justify-center">صفحة التذكيرات - قيد التطوير</div>} />
        <Route path="settings" element={<div className="min-h-[40vh] flex items-center justify-center">صفحة الإعدادات - قيد التطوير</div>} />
        <Route path="logout" element={<div className="min-h-[40vh] flex items-center justify-center">جاري تسجيل الخروج...</div>} />
        
        {/* Super Admin Routes */}
        <Route path="agencies" element={<div className="min-h-[40vh] flex items-center justify-center">صفحة الوكالات - قيد التطوير</div>} />
        <Route path="subscriptions" element={<div className="min-h-[40vh] flex items-center justify-center">صفحة الاشتراكات - قيد التطوير</div>} />
        <Route path="statistics" element={<div className="min-h-[40vh] flex items-center justify-center">صفحة الإحصائيات - قيد التطوير</div>} />
      </Route>
      
      {/* Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
