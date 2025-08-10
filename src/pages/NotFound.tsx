
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="mb-8 relative">
          <div className="h-32 w-32 mx-auto rounded-full bg-gradient-to-br from-zenith-purple-light to-zenith-purple-dark flex items-center justify-center">
            <span className="text-5xl font-bold text-white">404</span>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-10">
            <div className="bg-zenith-purple rounded-full h-40 w-40 animate-pulse-gentle"></div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We couldn't find the page you were looking for. It might have been moved, deleted, or never existed.
        </p>
        
        <Button className="bg-zenith-purple hover:bg-zenith-purple-dark" asChild>
          <Link to="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
