
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const CallToAction = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-16 md:py-24 bg-zenith-purple text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your mental wellbeing?</h2>
          <p className="text-lg mb-8 text-white/90">
            Join thousands of professionals who have taken control of their mental health and improved their work-life balance with ZenithMind.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/assessment">Take Free Assessment</Link>
            </Button>
            {isAuthenticated ? (
              <Button size="lg" className="bg-white text-zenith-purple hover:bg-white/90" asChild>
                <Link to="/mindfulness">Explore Mindfulness</Link>
              </Button>
            ) : (
              <Button size="lg" className="bg-white text-zenith-purple hover:bg-white/90" asChild>
                <Link to="/signup">Create Free Account</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
