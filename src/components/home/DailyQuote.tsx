
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const quotes = [
  {
    text: "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
    author: "Unknown"
  },
  {
    text: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James"
  },
  {
    text: "It's not the load that breaks you down, it's the way you carry it.",
    author: "Lou Holtz"
  },
  {
    text: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott"
  },
  {
    text: "Self-care is not self-indulgence, it is self-preservation.",
    author: "Audre Lorde"
  },
  {
    text: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.",
    author: "Oprah Winfrey"
  },
  {
    text: "Take a deep breath. It's just a bad day, not a bad life.",
    author: "Unknown"
  }
];

const DailyQuote = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Use the current date to select a quote that will stay consistent throughout the day
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % quotes.length;
    setQuote(quotes[quoteIndex]);
    
    // Check if the user has liked today's quote
    const storedLike = localStorage.getItem(`liked_quote_${today.toDateString()}`);
    setLiked(storedLike === 'true');
  }, []);

  const handleLike = () => {
    const today = new Date().toDateString();
    const newLikedState = !liked;
    setLiked(newLikedState);
    localStorage.setItem(`liked_quote_${today}`, newLikedState.toString());
  };

  if (!quote.text) return null;

  return (
    <section className="py-16 bg-zenith-purple/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Daily Inspiration</h2>
        </div>
        <Card className="max-w-3xl mx-auto border-0 shadow-lg">
          <CardContent className="p-8 flex flex-col items-center">
            <blockquote className="text-xl md:text-2xl font-serif text-center mb-6 italic text-gray-700 dark:text-gray-300">
              "{quote.text}"
            </blockquote>
            <cite className="text-right text-gray-600 dark:text-gray-400 block mb-6">— {quote.author}</cite>
            
            <button 
              onClick={handleLike} 
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={liked ? 'fill-current' : ''} size={20} />
              <span>{liked ? 'Liked' : 'Like'}</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DailyQuote;
