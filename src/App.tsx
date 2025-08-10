
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import Mindfulness from "./pages/Mindfulness";
import Tasks from "./pages/Tasks";
import Community from "./pages/Community";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PhoneLogin from "./pages/PhoneLogin";
import Counseling from "./pages/Counseling";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/mindfulness" element={<Mindfulness />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/community" element={<Community />} />
            <Route path="/counseling" element={<Counseling />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/phone-login" element={<PhoneLogin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
