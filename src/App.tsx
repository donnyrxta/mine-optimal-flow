import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/dashboard-layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Production from "./pages/Production";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/dashboard/production" element={
            <DashboardLayout>
              <Production />
            </DashboardLayout>
          } />
          {/* Redirect /dashboard/* to dashboard modules when they're ready */}
          <Route path="/dashboard/equipment" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard/inventory" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard/financial" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard/users" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard/safety" element={<Navigate to="/dashboard" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;