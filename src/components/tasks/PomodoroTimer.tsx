import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

enum TimerMode {
  WORK = 'work',
  SHORT_BREAK = 'shortBreak',
  LONG_BREAK = 'longBreak',
}

interface TimerSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
}

const PomodoroTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>(TimerMode.WORK);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default: 25 minutes in seconds
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [settings, setSettings] = useState<TimerSettings>({
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    // Load completed pomodoros
    const saved = localStorage.getItem('completedPomodoros');
    if (saved) {
      setCompletedPomodoros(parseInt(saved, 10));
    }
  }, []);

  // Reset timer when mode changes
  useEffect(() => {
    switch (mode) {
      case TimerMode.WORK:
        setTimeLeft(settings.work * 60);
        break;
      case TimerMode.SHORT_BREAK:
        setTimeLeft(settings.shortBreak * 60);
        break;
      case TimerMode.LONG_BREAK:
        setTimeLeft(settings.longBreak * 60);
        break;
    }
    setIsRunning(false);
  }, [mode, settings]);

  // Timer logic
  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer finished
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    // Play notification sound
    const audio = new Audio('/notification.mp3');
    audio.play().catch(e => console.log('Audio play error:', e));

    setIsRunning(false);

    if (mode === TimerMode.WORK) {
      // Increment completed pomodoros
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);
      localStorage.setItem('completedPomodoros', newCount.toString());
      
      // After work period, go to break
      if (newCount % 4 === 0) {
        // Every 4th pomodoro, take a long break
        setMode(TimerMode.LONG_BREAK);
      } else {
        // Otherwise take a short break
        setMode(TimerMode.SHORT_BREAK);
      }
    } else {
      // After break, go back to work mode
      setMode(TimerMode.WORK);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    
    switch (mode) {
      case TimerMode.WORK:
        setTimeLeft(settings.work * 60);
        break;
      case TimerMode.SHORT_BREAK:
        setTimeLeft(settings.shortBreak * 60);
        break;
      case TimerMode.LONG_BREAK:
        setTimeLeft(settings.longBreak * 60);
        break;
    }
  };

  const updateSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    localStorage.setItem('pomodoroSettings', JSON.stringify(newSettings));
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get progress percentage
  const getProgress = () => {
    let totalSeconds;
    switch (mode) {
      case TimerMode.WORK:
        totalSeconds = settings.work * 60;
        break;
      case TimerMode.SHORT_BREAK:
        totalSeconds = settings.shortBreak * 60;
        break;
      case TimerMode.LONG_BREAK:
        totalSeconds = settings.longBreak * 60;
        break;
    }
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  return (
    <Card className="max-w-md mx-auto border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-center">Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center">
            <RadioGroup 
              value={mode} 
              onValueChange={(value) => setMode(value as TimerMode)}
              className="flex space-x-2"
            >
              <div className="flex items-center">
                <RadioGroupItem value={TimerMode.WORK} id="work" className="sr-only" />
                <Label 
                  htmlFor="work" 
                  className={`px-4 py-2 rounded-l-md cursor-pointer transition-colors ${
                    mode === TimerMode.WORK 
                      ? 'bg-zenith-purple text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Focus
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value={TimerMode.SHORT_BREAK} id="shortBreak" className="sr-only" />
                <Label 
                  htmlFor="shortBreak" 
                  className={`px-4 py-2 cursor-pointer transition-colors ${
                    mode === TimerMode.SHORT_BREAK 
                      ? 'bg-zenith-purple text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Short Break
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value={TimerMode.LONG_BREAK} id="longBreak" className="sr-only" />
                <Label 
                  htmlFor="longBreak" 
                  className={`px-4 py-2 rounded-r-md cursor-pointer transition-colors ${
                    mode === TimerMode.LONG_BREAK 
                      ? 'bg-zenith-purple text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Long Break
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className={`text-zenith-purple ${
                      mode === TimerMode.SHORT_BREAK 
                        ? 'text-green-400' 
                        : mode === TimerMode.LONG_BREAK 
                        ? 'text-blue-400' 
                        : 'text-zenith-purple'
                    }`}
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={2 * Math.PI * 45 * (1 - getProgress() / 100)}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold">{formatTime(timeLeft)}</span>
                  <span className="text-sm text-gray-500 capitalize">{mode.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Completed today: <span className="font-semibold">{completedPomodoros}</span> pomodoros
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" size="icon" onClick={resetTimer}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        
        <Button 
          onClick={toggleTimer} 
          size="lg" 
          className={`${
            isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-zenith-purple hover:bg-zenith-purple-dark'
          } px-8`}
        >
          {isRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Timer Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="workTime">Work Time (minutes)</Label>
                <Input
                  id="workTime"
                  type="number"
                  defaultValue={settings.work}
                  min="1"
                  max="60"
                  onChange={(e) => updateSettings({...settings, work: parseInt(e.target.value)})}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="shortBreakTime">Short Break (minutes)</Label>
                <Input
                  id="shortBreakTime"
                  type="number"
                  defaultValue={settings.shortBreak}
                  min="1"
                  max="30"
                  onChange={(e) => updateSettings({...settings, shortBreak: parseInt(e.target.value)})}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="longBreakTime">Long Break (minutes)</Label>
                <Input
                  id="longBreakTime"
                  type="number"
                  defaultValue={settings.longBreak}
                  min="1"
                  max="60"
                  onChange={(e) => updateSettings({...settings, longBreak: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PomodoroTimer;
