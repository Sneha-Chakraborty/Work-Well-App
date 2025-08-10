
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PomodoroTimer from "@/components/tasks/PomodoroTimer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, Clock, List, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [newTask, setNewTask] = useState("");

  const saveTasksToLocalStorage = (updatedTasks: Task[]) => {
    localStorage.setItem('todoTasks', JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      createdAt: new Date(),
    };
    
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Task & Time Management</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Increase your productivity and focus with our Pomodoro timer and task management tools.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <PomodoroTimer />
            </div>
            
            <div className="md:col-span-2">
              <Card className="h-full border border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle>Task Manager</CardTitle>
                  <CardDescription>Manage your daily tasks and priorities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex gap-2">
                    <Input 
                      placeholder="Add a new task..." 
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addTask();
                        }
                      }}
                    />
                    <Button onClick={addTask}>
                      <Plus className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>

                  <Tabs defaultValue="active">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="active" className="flex items-center">
                        <List className="h-4 w-4 mr-2" /> Active ({activeTasks.length})
                      </TabsTrigger>
                      <TabsTrigger value="completed" className="flex items-center">
                        <Check className="h-4 w-4 mr-2" /> Completed ({completedTasks.length})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="active">
                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {activeTasks.length > 0 ? (
                          activeTasks
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((task) => (
                              <div key={task.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center">
                                  <button 
                                    onClick={() => toggleTask(task.id)}
                                    className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600 mr-3 flex-shrink-0"
                                  ></button>
                                  <span>{task.title}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => deleteTask(task.id)}
                                  className="text-gray-500 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))
                        ) : (
                          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                            <p>No active tasks. Add a task to get started!</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="completed">
                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {completedTasks.length > 0 ? (
                          completedTasks
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((task) => (
                              <div key={task.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center">
                                  <button 
                                    onClick={() => toggleTask(task.id)}
                                    className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600 mr-3 flex-shrink-0 bg-zenith-purple flex items-center justify-center"
                                  >
                                    <Check className="h-3 w-3 text-white" />
                                  </button>
                                  <span className="line-through text-gray-500">{task.title}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => deleteTask(task.id)}
                                  className="text-gray-500 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))
                        ) : (
                          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                            <p>No completed tasks yet.</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tasks;
