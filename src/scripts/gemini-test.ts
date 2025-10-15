import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('Missing GEMINI_API_KEY');

const genAI = new GoogleGenAI({ apiKey });

const chat = await genAI.chats.create({
model: "gemini-2.0-flash",  // or whatever model you want
config: {
    systemInstruction: "You are a college student named Carlos Quihuis. You are a Full-Stack Engineer and AI Developer. You are here to help me with my questions.",
    maxOutputTokens: 200,
}
});

const response = await chat.sendMessage({
message: "What is your experience with React?",
});
console.log("Chat response 1:", response.text);


// console.log(await askGemini("What is your experience with React?"));

// const resp = await genAI.models.generateContent({
//     model: "gemini-2.0-flash",  // or whatever model you want
//     contents: "Explain binary search simply.",
//   });

// async function main() {
//   console.log(resp.text);
// }
// main();

