
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sendMessageStream, initChat } from './services/geminiService';
import { ChatIcon, CloseIcon, SendIcon } from './components/Icons';
import { ChatBubble } from './components/ChatBubble';
import { TypingIndicator } from './components/TypingIndicator';
import type { Message } from './types';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const addInitialBotMessage = useCallback(() => {
    const initialTexts = [
        'Oie, tudo bem? 😊',
        'Sou a Ana, especialista do Full Power.',
        'Como posso te ajudar a alcançar seu objetivo hoje?',
    ];

    setMessages([]);
    
    initialTexts.forEach((text, index) => {
        setTimeout(() => {
            setMessages((prev) => [...prev, { role: 'model', text }]);
        }, 800 * (index + 1));
    });
  }, []);

  useEffect(() => {
    initChat();
    if(isOpen && messages.length === 0) {
      addInitialBotMessage();
    }
  }, [isOpen, messages.length, addInitialBotMessage]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const stream = await sendMessageStream(userMessage.text);
      let fullResponseText = '';
      
      for await (const chunk of stream) {
        fullResponseText += chunk.text;
      }
      
      setIsLoading(false);

      const responseMessages = fullResponseText.split('\n').filter(text => text.trim() !== '');

      if (responseMessages.length === 0 && fullResponseText.trim()) {
         setMessages((prev) => [...prev, { role: 'model', text: fullResponseText.trim() }]);
      } else {
        responseMessages.forEach((msgText, index) => {
          setTimeout(() => {
            const modelMessage: Message = { role: 'model', text: msgText.trim() };
            setMessages((prev) => [...prev, modelMessage]);
          }, 800 * (index + 1));
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      const errorMessage: Message = {
        role: 'model',
        text: 'Desculpe, estou com um pequeno problema técnico no momento. Tente novamente em alguns instantes. 🙏',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="font-sans">
      <div
        className={`fixed bottom-0 right-0 sm:bottom-8 sm:right-8 w-full h-full sm:w-96 sm:h-[70vh] sm:max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full sm:translate-y-0 sm:scale-0 opacity-0'
        } origin-bottom-right`}
      >
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg shadow-md">
          <div>
            <h3 className="text-lg font-bold">Assistente Full Power</h3>
            <p className="text-sm opacity-90">Online</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-blue-700 rounded-full transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>

        <div className="border-t p-2 sm:p-4 bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 disabled:bg-blue-300 transition-all duration-200 transform hover:scale-110 disabled:scale-100"
              disabled={isLoading || !input.trim()}
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <ChatIcon className="w-8 h-8" />
      </button>
    </div>
  );
};

export default App;
