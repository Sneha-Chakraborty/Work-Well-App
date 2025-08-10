
import { 
  BarChart2, 
  Clock, 
  Headphones, 
  Heart, 
  MessageCircle, 
  Shield,
  Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <BarChart2 className="h-8 w-8 text-zenith-purple" />,
    title: "Stress Assessment",
    description: "Take our comprehensive assessment to understand your stress levels and receive personalized recommendations.",
    link: "/assessment",
    color: "bg-zenith-yellow/20"
  },
  {
    icon: <Headphones className="h-8 w-8 text-zenith-purple" />,
    title: "Mindfulness & Meditation",
    description: "Access guided meditations and mindfulness exercises designed for busy professionals.",
    link: "/mindfulness",
    color: "bg-zenith-green/20"
  },
  {
    icon: <Clock className="h-8 w-8 text-zenith-purple" />,
    title: "Task & Time Management",
    description: "Organize your work with our Pomodoro timer and task management tools for better productivity.",
    link: "/tasks",
    color: "bg-zenith-orange/20"
  },
  {
    icon: <Users className="h-8 w-8 text-zenith-purple" />,
    title: "Community Support",
    description: "Connect with like-minded professionals facing similar challenges in our moderated forums.",
    link: "/community",
    color: "bg-zenith-blue/20"
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-zenith-purple" />,
    title: "Online Counseling",
    description: "Book sessions with licensed therapists specialized in workplace stress and anxiety.",
    link: "/counseling",
    color: "bg-zenith-purple/20"
  },
  {
    icon: <Shield className="h-8 w-8 text-white dark:text-white" />,
    title: "Workplace Wellness",
    description: "Access resources and strategies to navigate workplace challenges and set boundaries.",
    link: "/workplace",
    color: "bg-zenith-green/20"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Wellness Solutions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover our range of tools designed to support mental wellbeing and productivity for working professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className="group">
              <Card className="h-full card-hover border border-gray-200 dark:border-gray-800 overflow-hidden">
                <CardHeader className={`${feature.color} p-6`}>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className={`text-xl ${feature.title === "Workplace Wellness" ? "text-black dark:text-white" : ""}`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
