import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, ThumbsUp, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  topic: string;
  comments: number;
  likes: number;
  liked: boolean;
  date: string;
}

const samplePosts: Post[] = [
  {
    id: "1",
    title: "Tips for dealing with tight deadlines without burning out?",
    content: "I'm currently juggling multiple projects with overlapping deadlines. Any advice on how to manage the stress and avoid burning out? I've tried breaking tasks down, but still feeling overwhelmed.",
    author: {
      name: "AlexSmith",
      avatar: "",
    },
    topic: "work-stress",
    comments: 8,
    likes: 12,
    liked: false,
    date: "2025-04-30",
  },
  {
    id: "2",
    title: "Morning routine that improved my work day significantly",
    content: "I wanted to share a morning routine that has transformed my workday productivity. I now wake up 45 minutes earlier to include meditation, quick exercise, and planning before diving into emails. The difference in my stress levels and focus has been remarkable.",
    author: {
      name: "MeditationPro",
      avatar: "",
    },
    topic: "productivity",
    comments: 15,
    likes: 24,
    liked: false,
    date: "2025-04-29",
  },
  {
    id: "3",
    title: "How do you handle difficult colleagues?",
    content: "I'm struggling with a colleague who constantly undermines me in meetings and takes credit for my work. I've tried speaking directly with them, but nothing has changed. Any advice on how to handle this situation professionally?",
    author: {
      name: "ProfessionalGrowth",
      avatar: "",
    },
    topic: "workplace-relations",
    comments: 21,
    likes: 18,
    liked: false,
    date: "2025-04-28",
  },
  {
    id: "4",
    title: "Success story: How I overcame burnout",
    content: "After experiencing severe burnout last year that led to a 2-month leave, I wanted to share the strategies that helped me recover and build resilience. The biggest change was setting firm boundaries between work and personal life, including turning off notifications after hours.",
    author: {
      name: "BurnoutSurvivor",
      avatar: "",
    },
    topic: "burnout",
    comments: 32,
    likes: 47,
    liked: false,
    date: "2025-04-26",
  },
  {
    id: "5",
    title: "Mindfulness practice for busy professionals",
    content: "I've compiled a list of quick 5-minute mindfulness exercises that can be done at your desk. These have been game-changers for me in high-stress moments. Would anyone be interested if I shared them here?",
    author: {
      name: "MindfulManager",
      avatar: "",
    },
    topic: "mindfulness",
    comments: 26,
    likes: 39,
    liked: false,
    date: "2025-04-25",
  },
];

const topics = [
  { value: "all", label: "All Topics" },
  { value: "work-stress", label: "Work Stress" },
  { value: "burnout", label: "Burnout" },
  { value: "productivity", label: "Productivity" },
  { value: "workplace-relations", label: "Workplace Relations" },
  { value: "mindfulness", label: "Mindfulness" },
  { value: "work-life-balance", label: "Work-Life Balance" },
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [activeTopic, setActiveTopic] = useState("all");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("work-stress");
  const { toast } = useToast();

  const handleCreatePost = () => {
    if (newPostTitle.trim() === "" || newPostContent.trim() === "") {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your post.",
        variant: "destructive",
      });
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: {
        name: "CurrentUser",
        avatar: "",
      },
      topic: selectedTopic,
      comments: 0,
      likes: 0,
      liked: false,
      date: new Date().toISOString().split("T")[0],
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    
    toast({
      title: "Post created successfully",
      description: "Your post has been published to the community.",
    });
  };

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.likes ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const filteredPosts = activeTopic === "all" 
    ? posts 
    : posts.filter(post => post.topic === activeTopic);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Community Forum</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Connect with like-minded professionals, share experiences, and find support in our community forums.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="browse" className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="browse">Browse Posts</TabsTrigger>
                <TabsTrigger value="create">Create Post</TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse">
                <div className="mb-6 overflow-x-auto py-2">
                  <div className="flex space-x-2">
                    {topics.map((topic) => (
                      <button
                        key={topic.value}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
                          activeTopic === topic.value
                            ? "bg-zenith-purple text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => setActiveTopic(topic.value)}
                      >
                        {topic.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {filteredPosts.length > 0 ? (
                  <div className="space-y-6">
                    {filteredPosts.map((post) => (
                      <Card key={post.id} className="border border-gray-200 dark:border-gray-800">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl hover:text-zenith-purple cursor-pointer">
                                {post.title}
                              </CardTitle>
                              <CardDescription className="flex items-center mt-2">
                                <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                                  {topics.find(t => t.value === post.topic)?.label || post.topic}
                                </span>
                                <span className="text-gray-500 text-xs ml-2">{post.date}</span>
                              </CardDescription>
                            </div>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-zenith-purple-light text-white">
                                  {post.author.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                                {post.author.avatar && <AvatarImage src={post.author.avatar} alt={post.author.name} />}
                              </Avatar>
                              <span className="ml-2 text-sm font-medium">{post.author.name}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex space-x-4">
                              <button 
                                className={`flex items-center space-x-1 ${
                                  post.liked ? "text-zenith-purple" : "hover:text-zenith-purple"
                                }`}
                                onClick={() => toggleLike(post.id)}
                              >
                                <ThumbsUp className="h-4 w-4" />
                                <span>{post.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 hover:text-zenith-purple">
                                <MessageCircle className="h-4 w-4" />
                                <span>{post.comments}</span>
                              </button>
                            </div>
                            <Button variant="outline" size="sm">Read More</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No posts found in this category.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="create">
                <Card className="border border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle>Create a New Post</CardTitle>
                    <CardDescription>
                      Share your thoughts, questions, or insights with the community.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Title</label>
                      <Input 
                        placeholder="Enter a descriptive title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Topic</label>
                      <div className="flex flex-wrap gap-2">
                        {topics.filter(t => t.value !== "all").map((topic) => (
                          <button
                            key={topic.value}
                            className={`px-3 py-1 rounded-full text-xs ${
                              selectedTopic === topic.value
                                ? "bg-zenith-purple text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => setSelectedTopic(topic.value)}
                          >
                            {topic.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Content</label>
                      <Textarea 
                        placeholder="Share your thoughts, questions, or insights..."
                        className="min-h-[200px]"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        Posts are public and can be seen by all community members.
                      </p>
                      <Button onClick={handleCreatePost}>
                        Post to Community
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;

// Helper function for typescript
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />;
}
