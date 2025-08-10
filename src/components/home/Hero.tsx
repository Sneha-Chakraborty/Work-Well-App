
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-zenith-purple-light/10 to-transparent">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-zenith-purple-light/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-zenith-purple-dark/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your journey to <span className="bg-clip-text text-transparent bg-gradient-to-r from-zenith-purple to-zenith-purple-dark">mental wellness</span> starts here
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
              Designed for working professionals, ZenithMind provides comprehensive tools to manage stress, improve focus, and achieve work-life harmony.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-zenith-purple hover:bg-zenith-purple-dark text-white px-8 py-6" size="lg" asChild>
                <Link to="/assessment">Take Stress Assessment</Link>
              </Button>
              <Button variant="outline" className="group" size="lg" asChild>
                <Link to="/mindfulness" className="flex items-center">
                  Explore Mindfulness
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="aspect-square md:aspect-[4/3] relative">
              {/* Floating elements */}
              <div className="absolute top-0 left-[10%] w-24 h-24 bg-zenith-yellow rounded-2xl rotate-12 shadow-lg animate-float"></div>
              <div className="absolute top-[20%] right-[5%] w-32 h-32 bg-zenith-orange rounded-full shadow-lg animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-[15%] left-[15%] w-28 h-28 bg-zenith-green rounded-lg -rotate-6 shadow-lg animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-[5%] right-[20%] w-20 h-20 bg-zenith-blue rounded-3xl rotate-45 shadow-lg animate-float" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Main image */}
              <div className="absolute inset-0 m-auto w-[70%] h-[70%] bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-2xl">
                <div className="relative w-4/5 h-4/5 rounded-full overflow-hidden bg-gradient-to-br from-zenith-purple-light to-zenith-purple-dark p-1">
                  <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full m-1.5 flex items-center justify-center text-5xl font-bold font-serif text-zenith-purple">
                    ZM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-3xl font-bold text-zenith-purple">15k+</p>
            <p className="text-gray-600 dark:text-gray-400">Active Users</p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-3xl font-bold text-zenith-purple">89%</p>
            <p className="text-gray-600 dark:text-gray-400">Report Reduced Stress</p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <p className="text-3xl font-bold text-zenith-purple">28%</p>
            <p className="text-gray-600 dark:text-gray-400">Productivity Increase</p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <p className="text-3xl font-bold text-zenith-purple">50+</p>
            <p className="text-gray-600 dark:text-gray-400">Mindfulness Sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
