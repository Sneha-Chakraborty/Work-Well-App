
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ResourcesModal from "./ResourcesModal";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How often do you find yourself unable to control the important things in your life?",
    options: ["Never", "Almost Never", "Sometimes", "Fairly Often", "Very Often"]
  },
  {
    id: 2,
    text: "How often do you feel overwhelmed by your responsibilities at work?",
    options: ["Never", "Almost Never", "Sometimes", "Fairly Often", "Very Often"]
  },
  {
    id: 3,
    text: "How often do you feel confident about your ability to handle personal problems?",
    options: ["Very Often", "Fairly Often", "Sometimes", "Almost Never", "Never"]
  },
  {
    id: 4,
    text: "How often have you felt that things were going your way?",
    options: ["Very Often", "Fairly Often", "Sometimes", "Almost Never", "Never"]
  },
  {
    id: 5,
    text: "How often do you find that you could not cope with all the things you had to do?",
    options: ["Never", "Almost Never", "Sometimes", "Fairly Often", "Very Often"]
  },
  {
    id: 6,
    text: "How often do you have trouble sleeping because of work-related stress?",
    options: ["Never", "Almost Never", "Sometimes", "Fairly Often", "Very Often"]
  },
  {
    id: 7,
    text: "How often do you experience physical symptoms like headaches, muscle tension, or stomach issues due to stress?",
    options: ["Never", "Almost Never", "Sometimes", "Fairly Often", "Very Often"]
  },
  {
    id: 8,
    text: "How often do you feel irritable or anxious due to work pressure?",
    options: ["Never", "Almost Never", "Sometimes", "Fairly Often", "Very Often"]
  },
  {
    id: 9,
    text: "How easily can you detach from work during your personal time?",
    options: ["Very Easily", "Easily", "Somewhat", "With Difficulty", "Cannot Detach"]
  },
  {
    id: 10,
    text: "How would you rate your overall work-life balance?",
    options: ["Excellent", "Good", "Fair", "Poor", "Very Poor"]
  }
];

const StressQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [stressLevel, setStressLevel] = useState<string>("");
  const [resourcesModalOpen, setResourcesModalOpen] = useState(false);
  const { toast } = useToast();

  const handleOptionSelect = (value: string) => {
    const optionIndex = questions[currentQuestion].options.indexOf(value);
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === -1) {
      toast({
        title: "Please select an option",
        description: "You need to select an answer to continue.",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1]);
    } else {
      // Calculate stress level
      const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0);
      const maxScore = (questions.length * 4); // 4 is max score per question (0-4)
      const percentage = (totalScore / maxScore) * 100;
      
      let level = "";
      if (percentage < 30) {
        level = "Low";
      } else if (percentage < 60) {
        level = "Moderate";
      } else if (percentage < 80) {
        level = "High";
      } else {
        level = "Severe";
      }
      
      setStressLevel(level);
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(-1));
    setSelectedOption(-1);
    setQuizCompleted(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {!quizCompleted ? (
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-center">Workplace Stress Assessment</CardTitle>
            <div className="mt-2">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{questions[currentQuestion].text}</p>
            <RadioGroup value={selectedOption !== -1 ? questions[currentQuestion].options[selectedOption] : undefined}>
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem id={`option-${index}`} value={option} onClick={() => handleOptionSelect(option)} />
                  <Label htmlFor={`option-${index}`} className="text-base cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={handleNext}>
              {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
              {currentQuestion !== questions.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-center">Your Stress Assessment Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg mb-2">Your stress level is:</p>
              <p className={`text-3xl font-bold ${
                stressLevel === "Low" 
                  ? "text-green-500" 
                  : stressLevel === "Moderate" 
                  ? "text-yellow-500" 
                  : stressLevel === "High" 
                  ? "text-orange-500" 
                  : "text-red-500"
              }`}>
                {stressLevel}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">What this means:</h3>
              {stressLevel === "Low" ? (
                <p>You're managing workplace stress well. Continue your current practices and consider exploring mindfulness to maintain this positive state.</p>
              ) : stressLevel === "Moderate" ? (
                <p>You're experiencing a moderate level of stress. This is common among professionals, but it's a good time to implement stress management techniques.</p>
              ) : stressLevel === "High" ? (
                <p>Your stress levels are high. It's important to take immediate steps to manage your stress, including regular breaks and possibly speaking with a counselor.</p>
              ) : (
                <p>Your stress levels are severe. We strongly recommend speaking with a mental health professional as soon as possible and considering adjustments to your workload.</p>
              )}
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Recommended next steps:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {stressLevel === "Low" ? (
                  <>
                    <li>Explore our mindfulness exercises to enhance your well-being</li>
                    <li>Check out our productivity tools to maintain your effective work habits</li>
                    <li>Consider joining our community to share your positive strategies</li>
                  </>
                ) : stressLevel === "Moderate" ? (
                  <>
                    <li>Try our guided breathing exercises for quick stress relief</li>
                    <li>Implement the Pomodoro technique for better work-break balance</li>
                    <li>Explore our articles on setting healthy boundaries at work</li>
                  </>
                ) : (
                  <>
                    <li>Begin one of our structured stress reduction programs</li>
                    <li>Consider booking a session with one of our counselors</li>
                    <li>Implement daily mindfulness practices from our collection</li>
                    <li>Review our resources on communicating workplace concerns</li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleRestart} variant="outline" className="mr-2">Retake Assessment</Button>
            <Button onClick={() => setResourcesModalOpen(true)}>View Recommended Resources</Button>
          </CardFooter>
        </Card>
      )}
      
      <ResourcesModal 
        open={resourcesModalOpen} 
        onOpenChange={setResourcesModalOpen}
        stressLevel={stressLevel}
      />
    </div>
  );
};

export default StressQuiz;
