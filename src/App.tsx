import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/contexts/DataContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

// Public Pages
import { HomePage } from "./pages/public/HomePage";
import { DestinationsPage } from "./pages/public/DestinationsPage";
import { DestinationDetailPage } from "./pages/public/DestinationDetailPage";
import { StayEatPage } from "./pages/public/StayEatPage";
import { StayEatDetailPage } from "./pages/public/StayEatDetailPage";
import { MapPage } from "./pages/public/MapPage";
import { AboutPage } from "./pages/public/AboutPage";
import { ContactPage } from "./pages/public/ContactPage";

// Admin Pages
import { AdminLoginPage } from "./pages/admin/Login";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminDestinations } from "./pages/admin/Destinations";
import { AdminHotels } from "./pages/admin/Hotels";
import { AdminRestaurants } from "./pages/admin/Restaurants";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    {children}
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
                <Route path="/destinations" element={<PublicLayout><DestinationsPage /></PublicLayout>} />
                <Route path="/destinations/:id" element={<PublicLayout><DestinationDetailPage /></PublicLayout>} />
                <Route path="/stay-eat" element={<PublicLayout><StayEatPage /></PublicLayout>} />
                <Route path="/stay-eat/:type/:id" element={<PublicLayout><StayEatDetailPage /></PublicLayout>} />
                <Route path="/map" element={<PublicLayout><MapPage /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/destinations" element={<ProtectedRoute><AdminDestinations /></ProtectedRoute>} />
                <Route path="/admin/hotels" element={<ProtectedRoute><AdminHotels /></ProtectedRoute>} />
                <Route path="/admin/restaurants" element={<ProtectedRoute><AdminRestaurants /></ProtectedRoute>} />
                
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;