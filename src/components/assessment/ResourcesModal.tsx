import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Heart, Users, Clock, Video, FileText } from "lucide-react";

interface ResourcesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stressLevel: string;
}

const ResourcesModal = ({ open, onOpenChange, stressLevel }: ResourcesModalProps) => {
  const getResourcesByStressLevel = () => {
    const commonResources = [
      {
        title: "Breathing Techniques",
        description: "5-minute guided breathing exercises for immediate stress relief",
        type: "exercise",
        duration: "5 min",
        icon: Heart,
        difficulty: "Beginner"
      },
      {
        title: "Mindfulness Meditation",
        description: "Daily meditation practices to build resilience",
        type: "meditation",
        duration: "10-20 min",
        icon: Video,
        difficulty: "All levels"
      }
    ];

    if (stressLevel === "Low") {
      return [
        ...commonResources,
        {
          title: "Productivity Optimization",
          description: "Advanced techniques to maintain your effective work habits",
          type: "guide",
          duration: "15 min read",
          icon: Clock,
          difficulty: "Intermediate"
        },
        {
          title: "Wellness Community",
          description: "Connect with others who maintain healthy work-life balance",
          type: "community",
          duration: "Ongoing",
          icon: Users,
          difficulty: "All levels"
        }
      ];
    } else if (stressLevel === "Moderate") {
      return [
        ...commonResources,
        {
          title: "Pomodoro Technique Guide",
          description: "Structured work-break intervals for better focus",
          type: "technique",
          duration: "10 min setup",
          icon: Clock,
          difficulty: "Beginner"
        },
        {
          title: "Setting Boundaries at Work",
          description: "Practical strategies for maintaining work-life balance",
          type: "article",
          duration: "8 min read",
          icon: FileText,
          difficulty: "Intermediate"
        }
      ];
    } else {
      return [
        ...commonResources,
        {
          title: "Stress Reduction Program",
          description: "Comprehensive 21-day program for managing high stress",
          type: "program",
          duration: "21 days",
          icon: BookOpen,
          difficulty: "All levels"
        },
        {
          title: "Professional Counseling",
          description: "Connect with licensed mental health professionals",
          type: "counseling",
          duration: "50 min sessions",
          icon: Users,
          difficulty: "All levels"
        },
        {
          title: "Crisis Support Resources",
          description: "Immediate support and emergency contacts",
          type: "support",
          duration: "24/7 available",
          icon: Heart,
          difficulty: "All levels"
        }
      ];
    }
  };

  const resources = getResourcesByStressLevel();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "exercise": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "meditation": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "guide": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "community": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "technique": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      case "article": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "program": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "counseling": return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
      case "support": return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Recommended Resources</DialogTitle>
          <p className="text-muted-foreground">
            Based on your {stressLevel.toLowerCase()} stress level, here are personalized resources to help you.
          </p>
        </DialogHeader>
        
        <div className="grid gap-4 mt-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className={getTypeColor(resource.type)}>
                        {resource.type}
                      </Badge>
                      <Badge variant="outline">
                        {resource.duration}
                      </Badge>
                      <Badge variant="outline">
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <Button size="sm">
                      Access Resource
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {stressLevel === "High" || stressLevel === "Severe" ? (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="font-medium text-red-800 dark:text-red-300 mb-2">
              Important Notice
            </h3>
            <p className="text-sm text-red-700 dark:text-red-400">
              Given your stress level, we strongly recommend speaking with a mental health professional. 
              If you're experiencing thoughts of self-harm, please contact emergency services immediately 
              or call the National Suicide Prevention Lifeline at 988.
            </p>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ResourcesModal;