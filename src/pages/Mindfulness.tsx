
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MeditationPlayer from "@/components/mindfulness/MeditationPlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const meditations = [
  {
    id: 1,
    title: "Quick Stress Relief",
    duration: 300, // 5 minutes in seconds
    audioSrc: "https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41c.mp3?filename=lofi-study-112191.mp3",
    coverImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "stress-relief",
    description: "A quick 5-minute meditation to help you relieve stress during your workday."
  },
  {
    id: 2,
    title: "Focus & Concentration",
    duration: 600, // 10 minutes in seconds
    audioSrc: "https://cdn.pixabay.com/download/audio/2021/10/25/audio_dbd5a11351.mp3?filename=ambient-piano-amp-strings-10711.mp3",
    coverImage: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "focus",
    description: "Enhance your concentration and focus with this 10-minute guided meditation."
  },
  {
    id: 3,
    title: "Evening Wind Down",
    duration: 900, // 15 minutes in seconds
    audioSrc: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_2a7c055b58.mp3?filename=floating-abstract-142819.mp3",
    coverImage: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "sleep",
    description: "Prepare your mind for restful sleep with this calming 15-minute meditation."
  },
  {
    id: 4,
    title: "Morning Energy",
    duration: 480, // 8 minutes in seconds
    audioSrc: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_dbc069950d.mp3?filename=cinematic-documentary-115669.mp3",
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "energy",
    description: "Start your day with clarity and positive energy with this 8-minute meditation."
  },
  {
    id: 5,
    title: "Deep Relaxation",
    duration: 1200, // 20 minutes in seconds
    audioSrc: "https://cdn.pixabay.com/download/audio/2022/04/27/audio_243da4d7ce.mp3?filename=ambient-forest-music-125573.mp3",
    coverImage: "https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "relaxation",
    description: "Experience deep relaxation with this 20-minute guided meditation."
  },
  {
    id: 6,
    title: "Work Break Reset",
    duration: 180, // 3 minutes in seconds
    audioSrc: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d16360bfe8.mp3?filename=relaxing-mountains-rivers-streams-running-water-118464.mp3",
    coverImage: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "stress-relief",
    description: "Take a quick 3-minute break to reset your mind during a busy workday."
  }
];

const breathingExercises = [
  {
    title: "4-7-8 Breathing",
    instructions: [
      "Exhale completely through your mouth, making a whoosh sound.",
      "Close your mouth and inhale quietly through your nose to a mental count of 4.",
      "Hold your breath for a count of 7.",
      "Exhale completely through your mouth, making a whoosh sound to a count of 8.",
      "This is one breath. Now inhale again and repeat the cycle three more times for a total of four breaths."
    ],
    benefits: "Reduces anxiety, helps manage stress responses, and aids sleep."
  },
  {
    title: "Box Breathing",
    instructions: [
      "Slowly exhale all of your air.",
      "Inhale through your nose to a count of 4.",
      "Hold your breath for a count of 4.",
      "Exhale through your mouth for a count of 4.",
      "Hold your breath for a count of 4.",
      "Repeat for at least 5 minutes to experience the full benefits."
    ],
    benefits: "Improves concentration, manages stress, and controls emotional responses."
  },
  {
    title: "Alternate Nostril Breathing",
    instructions: [
      "Sit comfortably with your back straight.",
      "Place your left hand on your knee and your right thumb against your right nostril.",
      "Exhale completely, then close your right nostril with your thumb and inhale through your left nostril.",
      "Close your left nostril with your ring finger, release your thumb, and exhale through your right nostril.",
      "Inhale through your right nostril, then close it with your thumb and exhale through your left nostril.",
      "This completes one cycle. Continue for 5-10 cycles."
    ],
    benefits: "Balances the mind, reduces stress and anxiety, and promotes mental clarity."
  }
];

const Mindfulness = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredMeditations = selectedCategory === "all" 
    ? meditations 
    : meditations.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mindfulness & Meditation</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Take a moment to pause, breathe, and center yourself with our collection of guided meditations and mindfulness exercises.
            </p>
          </div>
          
          <Tabs defaultValue="meditations" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="meditations">Guided Meditations</TabsTrigger>
              <TabsTrigger value="breathing">Breathing Exercises</TabsTrigger>
            </TabsList>
            
            <TabsContent value="meditations">
              <div className="mb-8">
                <div className="flex overflow-x-auto py-2 space-x-4 mb-6 scrollbar-none">
                  <button 
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      selectedCategory === "all" 
                        ? "bg-zenith-purple text-white" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    All Meditations
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      selectedCategory === "stress-relief" 
                        ? "bg-zenith-purple text-white" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedCategory("stress-relief")}
                  >
                    Stress Relief
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      selectedCategory === "focus" 
                        ? "bg-zenith-purple text-white" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedCategory("focus")}
                  >
                    Focus
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      selectedCategory === "sleep" 
                        ? "bg-zenith-purple text-white" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedCategory("sleep")}
                  >
                    Sleep
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      selectedCategory === "energy" 
                        ? "bg-zenith-purple text-white" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedCategory("energy")}
                  >
                    Energy
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      selectedCategory === "relaxation" 
                        ? "bg-zenith-purple text-white" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedCategory("relaxation")}
                  >
                    Relaxation
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMeditations.map((meditation) => (
                    <div key={meditation.id} className="flex flex-col h-full">
                      <MeditationPlayer 
                        title={meditation.title} 
                        duration={meditation.duration} 
                        audioSrc={meditation.audioSrc}
                        coverImage={meditation.coverImage}
                      />
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{meditation.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="breathing">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {breathingExercises.map((exercise, index) => (
                  <Card key={index} className="border border-gray-200 dark:border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">{exercise.title}</h3>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Instructions:</h4>
                      <ol className="list-decimal pl-4 mb-4 space-y-2">
                        {exercise.instructions.map((step, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">{step}</li>
                        ))}
                      </ol>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Benefits:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.benefits}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mindfulness;
