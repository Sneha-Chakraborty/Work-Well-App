
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StressQuiz from "@/components/assessment/StressQuiz";

const Assessment = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Workplace Stress Assessment</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Take a few moments to assess your current stress levels. This confidential test will help identify areas where you might benefit from our resources.
            </p>
          </div>
          
          <div className="mb-8">
            <StressQuiz />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
