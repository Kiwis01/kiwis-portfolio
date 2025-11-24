import { useState, useRef, useEffect } from "react";
import { Send, Mic, X, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GeminiChatService from '@/lib/gemini';

interface GeminiChatProps {
    isOpen: boolean;
    onClose: () => void;
    initialPrompt?: string;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export function GeminiChat({ isOpen, onClose, initialPrompt = "" }: GeminiChatProps) {
    const [prompt, setPrompt] = useState(initialPrompt);
    const [conversation, setConversation] = useState<Message[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const chatRef = useRef<GeminiChatService | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        chatRef.current = new GeminiChatService();
        if (initialPrompt) {
            handleSend(initialPrompt);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Focus input when opened
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [conversation, isThinking]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async (text: string) => {
        if (!text.trim() || !chatRef.current || isThinking) return;

        const userMessage: Message = { role: 'user', content: text, timestamp: new Date() };
        setConversation(prev => [...prev, userMessage]);
        setPrompt("");
        setIsThinking(true);

        try {
            const reply = await chatRef.current.sendMessage(text);
            const assistantMessage: Message = { role: 'assistant', content: reply, timestamp: new Date() };
            setConversation(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = { role: 'assistant', content: "I'm having trouble connecting right now. Please try again later.", timestamp: new Date() };
            setConversation(prev => [...prev, errorMessage]);
        } finally {
            setIsThinking(false);
        }
    };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     handleSend(prompt);
    // };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(prompt);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-[#131314] text-[#E3E3E3] font-sans flex flex-col md:flex-row"
            >
                {/* Main Content */}
                <div className="flex-1 flex flex-col h-full relative bg-[#131314]">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 md:p-5">
                        <div className="flex items-center gap-2 text-[#E3E3E3]">
                            <span className="text-xl font-medium">Gemini</span>
                            <span className="text-xs bg-[#1E1F20] px-2 py-0.5 rounded text-[#E3E3E3]/70">1.5 Flash</span>
                            <span className="text-xl font-medium">Qdrant</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-[#282A2C] rounded-full transition-colors text-[#E3E3E3]"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto px-4 md:px-0">
                        <div className="max-w-3xl mx-auto w-full pb-32 pt-4 md:pt-10">
                            {conversation.length === 0 ? (
                                <div className="flex flex-col items-start justify-center min-h-[50vh] px-4 md:px-12 animate-in fade-in duration-500">
                                    <h1 className="text-5xl md:text-6xl font-medium mb-2 bg-gradient-to-r from-[#4285F4] via-[#9B72CB] to-[#D96570] text-transparent bg-clip-text pb-2">
                                        Hey there I'm Carlos 👋
                                    </h1>
                                    <h2 className="text-4xl md:text-5xl font-medium text-[#444746] mb-12">
                                        Ask me anything!
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                                        {[
                                            { icon: <Sparkles className="w-5 h-5 text-yellow-400" />, text: "Describe a challenging software project you worked on and what your role was." },
                                            { icon: <MessageSquare className="w-5 h-5 text-blue-400" />, text: "What excites you about software engineering, and where do you see yourself in this field in the future?" },
                                            { icon: <Sparkles className="w-5 h-5 text-purple-400" />, text: "Can you explain a complex AI concept (like neural networks or RAG) in simple terms?" },
                                            { icon: <MessageSquare className="w-5 h-5 text-green-400" />, text: "Describe a time you had to optimize code or a system for better performance" },
                                        ].map((suggestion, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSend(suggestion.text)}
                                                className="bg-[#1E1F20] hover:bg-[#282A2C] p-4 rounded-xl text-left transition-colors flex flex-col justify-between h-40 group"
                                            >
                                                <span className="text-[#E3E3E3] text-sm group-hover:text-white">{suggestion.text}</span>
                                                <div className="bg-[#131314] p-2 rounded-full w-fit self-end group-hover:bg-[#1E1F20] transition-colors">
                                                    {suggestion.icon}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8 px-4 md:px-8">
                                    {conversation.map((msg, idx) => (
                                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            {msg.role === 'assistant' && (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4285F4] to-[#D96570] flex items-center justify-center flex-shrink-0 mt-1">
                                                    <Sparkles className="w-5 h-5 text-white" />
                                                </div>
                                            )}

                                            <div className={`max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'bg-[#282A2C] rounded-2xl rounded-tr-sm px-5 py-3' : 'text-[#E3E3E3] pt-1'}`}>
                                                <div className="prose prose-invert max-w-none text-[15px] md:text-[16px] leading-relaxed whitespace-pre-wrap">
                                                    {msg.content}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {isThinking && (
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4285F4] to-[#D96570] flex items-center justify-center flex-shrink-0 mt-1 animate-pulse">
                                                <Sparkles className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex items-center gap-1 pt-3">
                                                <div className="w-2 h-2 bg-[#E3E3E3]/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-2 h-2 bg-[#E3E3E3]/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-2 h-2 bg-[#E3E3E3]/50 rounded-full animate-bounce"></div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[#131314] p-4 pb-6">
                        <div className="max-w-3xl mx-auto relative">
                            <motion.div
                                layoutId="gemini-input-bar"
                                className="bg-[#1E1F20] rounded-3xl flex flex-col border border-white/5 focus-within:bg-[#282A2C] transition-colors"
                            >
                                <div className="flex items-center px-4 py-3 gap-3">
                                    {/* <button className="p-2 rounded-full hover:bg-[#37393B] text-[#E3E3E3] transition-colors">
                                        <Plus className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 rounded-full hover:bg-[#37393B] text-[#E3E3E3] transition-colors">
                                        <ImageIcon className="w-5 h-5" />
                                    </button> */}
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter a prompt here"
                                        className="flex-1 bg-transparent border-none focus:outline-none text-[#E3E3E3] placeholder:text-[#E3E3E3]/50 text-base py-2"
                                    />
                                    {prompt.trim() ? (
                                        <button
                                            onClick={() => handleSend(prompt)}
                                            className="p-2 rounded-full bg-[#E3E3E3] text-[#131314] hover:bg-white transition-colors"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    ) : (
                                        <button className="p-2 rounded-full hover:bg-[#37393B] text-[#E3E3E3] transition-colors">
                                            <Mic className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                            <p className="text-center text-xs text-[#E3E3E3]/40 mt-3">
                                Gemini may display inaccurate info, including about people, so double-check its responses.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
