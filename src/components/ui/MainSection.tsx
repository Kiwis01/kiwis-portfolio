import { Button } from "@/components/ui/button"
import { Download, Search, Mic, Send, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import resumePdf from '@/assets/Carlos_Quihuis_SWE.pdf';
import { useState, useRef, useEffect } from "react";
import GeminiChat from '@/lib/gemini';

interface MainSectionProps {
  onConversationToggle?: (isOpen: boolean) => void;
}

function MainSection({ onConversationToggle }: MainSectionProps) {
  const [prompt, setPrompt] = useState("");
  const [showConversation, setShowConversation] = useState(false);
  const [conversation, setConversation] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<GeminiChat | null>(null);

  useEffect(() => {
    const initializeChat = async () => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        console.error("VITE_GEMINI_API_KEY is not set.");
        return;
      }
      const chat = new GeminiChat(apiKey);
      await chat.init();
      chatRef.current = chat;
    };
    initializeChat();
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || !chatRef.current || isThinking) return;

    const userMessage = { role: 'user' as const, content: prompt };
    setConversation(prev => [...prev, userMessage]);
    setShowConversation(true);
    setIsThinking(true);
    setPrompt("");

    try {
      const reply = await chatRef.current.sendMessage(prompt);
      const assistantMessage = { role: 'assistant' as const, content: reply };
      setConversation(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { role: 'assistant' as const, content: "Sorry, I ran into an error. Please try again." };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation, isThinking]);

  useEffect(() => {
    onConversationToggle?.(showConversation);
    if (showConversation) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [showConversation, onConversationToggle]);

  const closeConversation = () => {
    setShowConversation(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto pb-20">
        
        <Badge variant="secondary" className="mb-6" style={{ backgroundColor: "#34eb77"}}>
            Available for Work
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6">
            Full-Stack Engineer
            <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent block">
              & AI Developer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            I build intelligent web applications by merging high-performance backends with intuitive UIs and cutting-edge AI.
          </p>
          
          {/* Gemini-style Prompt Bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <form onSubmit={handleSubmit} className="flex items-center bg-background border border-input/10 rounded-full shadow-sm hover:shadow-md transition-shadow px-4 py-2">
              <Search className="w-5 h-5 text-muted-foreground mr-2" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <div className="flex gap-2 ml-2">
                <button type="button" className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
                  <Mic className="w-5 h-5 text-muted-foreground" />
                </button>
                {/* <button type="button" className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
                  <Camera className="w-5 h-5 text-muted-foreground" />
                </button> */}
                <button 
                  type="submit" 
                  className="p-2 rounded-full hover:bg-primary/90 bg-primary transition-colors"
                >
                  <Send className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>
            </form>
          </div>

          {/* Conversation Overlay */}
          {showConversation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Semi-transparent backdrop */}
              <div 
                className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
                onClick={closeConversation}
                onTouchMove={(e) => e.preventDefault()}
                onWheel={(e) => e.preventDefault()}
                style={{ position: 'fixed', touchAction: 'none' }}
              ></div>
    
    {/* Conversation box with fixed height */}
    <div 
      className="relative bg-background border border-border rounded-xl shadow-lg w-full max-w-4xl h-[70vh] z-10 flex flex-col m-4"
      onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the modal
      style={{ position: 'fixed', maxHeight: '70vh' }} // Ensure it stays fixed
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-border">
        <h3 className="text-lg font-medium">AI Assistant</h3>
        <button 
          onClick={closeConversation}
          className="p-1 rounded-full hover:bg-secondary/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Conversation content - fixed height with scrolling */}
        <div 
          ref={conversationRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{ overflowY: 'auto', height: 'calc(100% - 130px)', touchAction: 'pan-y' }} // Explicit height calculation
        >
          {conversation.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-secondary text-secondary-foreground rounded-tl-none'
                  }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-4 rounded-lg bg-secondary text-secondary-foreground rounded-tl-none">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          {conversation.length === 0 && !isThinking && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Start a conversation by typing a message below.</p>
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="p-4 border-t border-border">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-secondary/30 border border-input rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              type="submit" 
              className="p-2 rounded-full bg-primary hover:bg-primary/90 transition-colors"
            >
              <Send className="w-5 h-5 text-primary-foreground" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )}

          {/* Download CV button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href={resumePdf} download="Carlos_Quihuis_SWE.pdf">
              <Button variant="outline" size="lg" className="cursor-pointer">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </a>
          </div>
          
          {/* <div className="flex justify-center space-x-6 mb-8">
            <a 
              href="https://github.com/Kiwis01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/carlos-quihuis-190b431aa/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:carlos.quihuis.dev@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div> */}

          {/* About section integrated */}
          {/* <div className="max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground">
              With 5+ years of experience at the intersection of full-stack development and AI, I am passionate about building scalable, high-impact solutions that solve real-world problems. I thrive on complex challenges and am driven to use technology to make a meaningful difference.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default MainSection