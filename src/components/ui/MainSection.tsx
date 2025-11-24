import { Button } from "@/components/ui/button"
import { Download, Search, Mic, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import resumePdf from '@/assets/Carlos_Quihuis_SWE.pdf';
import { useState, useEffect } from "react";
import { GeminiChat } from '@/components/ui/GeminiChat';
import { motion, AnimatePresence } from "framer-motion";

interface MainSectionProps {
  onConversationToggle?: (isOpen: boolean) => void;
}

function MainSection({ onConversationToggle }: MainSectionProps) {
  const [prompt, setPrompt] = useState("");
  const [chatPrompt, setChatPrompt] = useState("");
  const [showConversation, setShowConversation] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setChatPrompt(prompt);
    setShowConversation(true);
    setPrompt(""); // Clear the input after sending
  };

  useEffect(() => {
    onConversationToggle?.(showConversation);
  }, [showConversation, onConversationToggle]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto pb-20">

          <Badge variant="secondary" className="mb-6" style={{ backgroundColor: "#34eb77" }}>
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
          <div className="max-w-2xl mx-auto mb-10 h-[56px] relative z-20">
            <AnimatePresence>
              {!showConversation && (
                <motion.form
                  layoutId="gemini-input-bar"
                  onSubmit={handleSubmit}
                  className="flex items-center bg-background border border-input/10 rounded-full shadow-sm hover:shadow-md transition-shadow px-4 py-2 absolute w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Search className="w-5 h-5 text-muted-foreground mr-2" />
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onClick={() => setShowConversation(true)}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                  <div className="flex gap-2 ml-2">
                    <button type="button" className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
                      <Mic className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button
                      type="submit"
                      className="p-2 rounded-full hover:bg-primary/90 bg-primary transition-colors"
                    >
                      <Send className="w-5 h-5 text-primary-foreground" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <GeminiChat
            isOpen={showConversation}
            onClose={() => setShowConversation(false)}
            initialPrompt={chatPrompt}
          />

          {/* Download CV button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href={resumePdf} download="Carlos_Quihuis_SWE.pdf">
              <Button variant="outline" size="lg" className="cursor-pointer">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainSection