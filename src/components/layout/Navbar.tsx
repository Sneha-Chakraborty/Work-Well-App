
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, User, LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
    toggleMenu(); // Close mobile menu if open
  };

  return (
    <nav className="w-full py-4 border-b border-gray-200 dark:border-gray-800 glass-effect">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zenith-purple-light to-zenith-purple-dark flex items-center justify-center">
            <span className="text-white font-bold">Z</span>
          </div>
          <span className="text-xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-zenith-purple-light to-zenith-purple-dark">
            ZenithMind
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light">Home</Link>
          <Link to="/assessment" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light">Stress Assessment</Link>
          <Link to="/mindfulness" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light">Mindfulness</Link>
          <Link to="/tasks" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light">Tasks</Link>
          <Link to="/community" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light">Community</Link>
          <Link to="/counseling" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light">Counseling</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User size={16} />
                <span>{user?.name}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2" asChild>
                <Link to="/signin">
                  <User size={16} />
                  <span>Sign In</span>
                </Link>
              </Button>
              <Button size="sm" className="bg-zenith-purple hover:bg-zenith-purple-dark" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50 py-4 px-6 border-b border-gray-200 dark:border-gray-800 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light" onClick={toggleMenu}>Home</Link>
            <Link to="/assessment" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light" onClick={toggleMenu}>Stress Assessment</Link>
            <Link to="/mindfulness" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light" onClick={toggleMenu}>Mindfulness</Link>
            <Link to="/tasks" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light" onClick={toggleMenu}>Tasks</Link>
            <Link to="/community" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light" onClick={toggleMenu}>Community</Link>
            <Link to="/counseling" className="text-sm font-medium text-gray-700 hover:text-zenith-purple dark:text-gray-300 dark:hover:text-zenith-purple-light" onClick={toggleMenu}>Counseling</Link>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <User size={16} />
                    <span>{user?.name}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full justify-center" onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="w-full justify-center" asChild>
                    <Link to="/signin" onClick={toggleMenu}>
                      <User size={16} className="mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button size="sm" className="w-full justify-center bg-zenith-purple hover:bg-zenith-purple-dark" asChild>
                    <Link to="/signup" onClick={toggleMenu}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
