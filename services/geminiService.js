import { GoogleGenAI } from "@google/genai";
import { MASTER_SYSTEM_INSTRUCTION } from '../ia-modules/00-master.js';

// A API key deve ser configurada nas variáveis de ambiente
// Para desenvolvimento local, crie um arquivo .env com: VITE_API_KEY=sua_chave_aqui
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

let chat = null;

export const initChat = () => {
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: MASTER_SYSTEM_INSTRUCTION,
      },
    });
  }
};

export const getChat = () => {
  if (!chat) {
    initChat();
  }
  return chat;
};

export const sendMessageStream = async (message) => {
  const currentChat = getChat();
  return currentChat.sendMessageStream({ message });
};
