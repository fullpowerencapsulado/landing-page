import { GoogleGenAI, Chat } from "@google/genai";
import { MASTER_SYSTEM_INSTRUCTION } from '../ia-modules/00-master';

// Assume process.env.API_KEY is set in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

let chat: Chat | null = null;

export const initChat = (): void => {
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: MASTER_SYSTEM_INSTRUCTION,
      },
    });
  }
};

export const getChat = (): Chat => {
  if (!chat) {
    initChat();
  }
  return chat!;
};

export const sendMessageStream = async (message: string) => {
  const currentChat = getChat();
  return currentChat.sendMessageStream({ message });
};
