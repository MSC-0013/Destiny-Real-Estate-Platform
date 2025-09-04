import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { OrdersProvider } from "./contexts/OrdersContext";
import { ConstructionProvider } from "./contexts/ConstructionContext";
import { useEffect } from "react";
import { initializeDefaultData } from "./utils/localStorage";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import AuthPage from "./pages/AuthPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import DashboardPage from "./pages/DashboardPage";
import TenantDashboard from "./pages/TenantDashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HelpPage from "./pages/HelpPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

// New Pages
import MarketplacePage from "./pages/MarketplacePage";
import ConstructionPage from "./pages/ConstructionPage";
import ConstructionModelDetailPage from "./pages/ConstructionModelDetailPage";
import NeighborhoodsPage from "./pages/NeighborhoodsPage";
import NeighborhoodDetailPage from "./pages/NeighborhoodDetailPage";
import ChatPage from "./pages/ChatPage";
import FavoritesPage from "./pages/FavoritesPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import CareersPage from "./pages/CareersPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConstructionChatbotPage from "./pages/ConstructionChatbotPage";
import AddPropertyPage from "./pages/AddPropertyPage";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize default data on app start
    initializeDefaultData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WishlistProvider>
          <OrdersProvider>
            <ConstructionProvider>
              <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/construction" element={<ConstructionPage />} />
              <Route path="/construction/model/:id" element={<ConstructionModelDetailPage />} />
              <Route path="/construction/chatbot" element={<ConstructionChatbotPage />} />
              <Route path="/neighborhoods" element={<NeighborhoodsPage />} />
              <Route path="/neighborhood/:id" element={<NeighborhoodDetailPage />} />
              <Route path="/forgot-password" element={<h1>Coming Soon...</h1>} />

              
              {/* Property Routes */}
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/add-property" element={
                <ProtectedRoute>
                  <AddPropertyPage />
                </ProtectedRoute>
              } />
              <Route path="/checkout/:id" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              
              {/* User Routes - Protected */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/tenant-dashboard" element={
                <ProtectedRoute>
                  <TenantDashboard />
                </ProtectedRoute>
              } />
              <Route path="/landlord-dashboard" element={
                <ProtectedRoute>
                  <LandlordDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin-dashboard" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              } />
              <Route path="/chat" element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              } />
              
              {/* Auth Routes */}
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPage />
                </ProtectedRoute>
              } />
              
              {/* Help & Info Routes */}
              <Route path="/help" element={<HelpPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/careers" element={<CareersPage />} />
              
              {/* Catch-all route - MUST be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
              </BrowserRouter>
              </TooltipProvider>
            </ConstructionProvider>
          </OrdersProvider>
        </WishlistProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;