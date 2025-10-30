import { GoogleGenAI } from "@google/genai";
import { MASTER_SYSTEM_INSTRUCTION } from '../ia-modules/00-master.js';

// A API key deve ser configurada nas variáveis de ambiente
// Para desenvolvimento local, crie um arquivo .env com: VITE_API_KEY=sua_chave_aqui
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  console.error('⚠️ VITE_API_KEY não configurada. Configure a variável de ambiente antes de usar o chat.');
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

let chat = null;

export const initChat = () => {
  if (!ai) {
    console.warn('Chat AI não pode ser inicializado: API Key ausente');
    return;
  }
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
  if (!ai) {
    throw new Error('API Key não configurada. Configure VITE_API_KEY nas variáveis de ambiente.');
  }
  const currentChat = getChat();
  return currentChat.sendMessageStream({ message });
};
