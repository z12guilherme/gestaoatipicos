import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserRegister from "./pages/UserRegister";
import NotaAdd from "./pages/NotaAdd";
import LaudoAdd from "./pages/LaudoAdd";
import StudentView from "./pages/StudentView";
import UsersManage from "./pages/UsersManage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/:role/register" 
              element={
                <ProtectedRoute>
                  <UserRegister />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/nota/add" 
              element={
                <ProtectedRoute>
                  <NotaAdd />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/laudo/add" 
              element={
                <ProtectedRoute>
                  <LaudoAdd />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/:id/view" 
              element={
                <ProtectedRoute>
                  <StudentView />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/users/manage" 
              element={
                <ProtectedRoute>
                  <UsersManage />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
