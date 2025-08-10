
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "ZenithMind has transformed how I manage workplace stress. The meditations are perfect for quick breaks between meetings, and the task management tools help me stay focused.",
    author: "Sarah J.",
    title: "Marketing Director",
    image: "/lovable-uploads/dec6dc07-a00c-4ab4-8878-3b6789907d88.png",
    initials: "SJ"
  },
  {
    quote: "After using the stress assessment tool, I finally understood my triggers. The personalized recommendations have made a huge difference in my daily anxiety levels.",
    author: "Michael T.",
    title: "Software Engineer",
    image: "/lovable-uploads/5c8b7a82-854c-4ece-ab51-cdc779bf4de7.png",
    initials: "MT"
  },
  {
    quote: "The community forums helped me realize I wasn't alone in my struggles. Connecting with others facing similar challenges has been incredibly empowering.",
    author: "Ellie K.",
    title: "Project Manager",
    image: "/lovable-uploads/050a449a-125b-47c4-a9b5-5faebc09ffdf.png",
    initials: "EK"
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-zenith-purple/5 dark:from-gray-900 dark:to-zenith-purple-dark/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover how ZenithMind is helping professionals worldwide improve their mental wellbeing and work-life balance.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5">
                  <div className="h-64 md:h-full bg-gray-300 relative">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].author}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-zenith-purple-dark/30"></div>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center mb-6">
                    <Quote className="text-zenith-purple-light h-10 w-10 mr-4" />
                    <Avatar className="h-12 w-12 border-2 border-zenith-purple-light">
                      <AvatarImage src={testimonials[currentIndex].image} alt={testimonials[currentIndex].author} />
                      <AvatarFallback>{testimonials[currentIndex].initials}</AvatarFallback>
                    </Avatar>
                  </div>
                  <blockquote className="text-lg md:text-xl mb-6 text-gray-700 dark:text-gray-300">
                    {testimonials[currentIndex].quote}
                  </blockquote>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100">{testimonials[currentIndex].author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonials[currentIndex].title}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
