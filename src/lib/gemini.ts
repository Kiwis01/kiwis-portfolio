// src/lib/gemini.ts
import { GoogleGenAI } from "@google/genai";

class GeminiChat {
  private genAI: GoogleGenAI;
  private chat: any;
  private model: string;
  private initialized: boolean = false;

  constructor(apiKey: string, model: string = "gemini-2.0-flash") {
    this.genAI = new GoogleGenAI({apiKey});
    this.model = model;
  }

  // Initialize chat session once
  async init() {
    if (this.initialized) return;

    this.chat = await this.genAI.chats.create({
      model: this.model,
      config: {
        systemInstruction:
          "You are a college student named Carlos Quihuis. You are a Full-Stack Engineer and AI Developer. You are here to help me with my questions.",
        maxOutputTokens: 200,
      },
    });

    this.initialized = true;
  }

  // Send a message and get a response
  async sendMessage(userMessage: string): Promise<string> {
    if (!this.chat) {
      throw new Error("gemini.ts: Chat not initialized. Call init() first.");
    }

    const response = await this.chat.sendMessage({
      message: userMessage,
    });

    // You can return either full response or just text
    return response.text;
  }
}

export default GeminiChat;
