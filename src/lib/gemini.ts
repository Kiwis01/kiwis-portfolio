// src/lib/gemini.ts
class GeminiChat {
  // Send a message and get a response
  async sendMessage(userMessage: string): Promise<string> {
    const res = await fetch("https://portfolio-back-b5c2475174bf.herokuapp.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    const response = await res.json();
    return response.text;
  }
}

export default GeminiChat;
