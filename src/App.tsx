import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/dashboard-layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Production from "./pages/Production";
import Equipment from "./pages/Equipment";
import Inventory from "./pages/Inventory";
import Financial from "./pages/Financial";
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
          <Route path="/dashboard/equipment" element={
            <DashboardLayout>
              <Equipment />
            </DashboardLayout>
          } />
          <Route path="/dashboard/inventory" element={
            <DashboardLayout>
              <Inventory />
            </DashboardLayout>
          } />
          <Route path="/dashboard/financial" element={
            <DashboardLayout>
              <Financial />
            </DashboardLayout>
          } />
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