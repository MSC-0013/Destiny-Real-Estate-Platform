import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import { initializeDefaultData } from "./utils/localStorage";

// Pages
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import AuthPage from "./pages/AuthPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import DashboardPage from "./pages/DashboardPage";
import HelpPage from "./pages/HelpPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

// New Pages
import MarketplacePage from "./pages/MarketplacePage";
import ConstructionPage from "./pages/ConstructionPage";
import NeighborhoodsPage from "./pages/NeighborhoodsPage";
import ChatPage from "./pages/ChatPage";
import FavoritesPage from "./pages/FavoritesPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import CareersPage from "./pages/CareersPage";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize default data on app start
    initializeDefaultData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
              <Route path="/neighborhoods" element={<NeighborhoodsPage />} />
              
              {/* Property Routes */}
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              
              {/* User Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/chat" element={<ChatPage />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminPage />} />
              
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
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;