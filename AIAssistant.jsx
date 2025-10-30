import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sendMessageStream, initChat } from './services/geminiService.js';

// Ícones
const ChatIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.15l-2.11 2.11a.75.75 0 01-1.06 0l-2.11-2.11a.39.39 0 00-.297-.15 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
  </svg>
);

const SendIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

const CloseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

// Componente de bolha de chat
const ChatBubble = ({ message }) => {
  const isUser = message.role === 'user';

  const bubbleClasses = isUser
    ? 'bg-gradient-to-r from-green-700 to-emerald-600 text-white self-end rounded-bl-3xl'
    : 'bg-gray-200 text-gray-800 self-start rounded-br-3xl';

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-3xl shadow-md whitespace-pre-wrap ${bubbleClasses}`}
      >
        {message.text}
      </div>
    </div>
  );
};

// Indicador de digitação
const TypingIndicator = () => {
  return (
    <div className="w-full flex justify-start">
      <div className="bg-gray-200 text-gray-800 self-start rounded-3xl rounded-br-3xl px-4 py-3 shadow-md">
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

// Componente principal do assistente
const AIAssistant = ({ bottomPosition = '2rem', rightPosition = '2rem' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

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
    if (isOpen && messages.length === 0) {
      addInitialBotMessage();
    }
  }, [isOpen, messages.length, addInitialBotMessage]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input.trim() };
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
            const modelMessage = { role: 'model', text: msgText.trim() };
            setMessages((prev) => [...prev, modelMessage]);
          }, 800 * (index + 1));
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      const errorMessage = {
        role: 'model',
        text: 'Desculpe, estou com um pequeno problema técnico no momento. Tente novamente em alguns instantes. 🙏',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="font-sans">
      {/* Janela do chat */}
      <div
        className={`fixed bottom-0 right-0 sm:bottom-8 sm:right-8 w-full h-full sm:w-96 sm:h-[70vh] sm:max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full sm:translate-y-0 sm:scale-0 opacity-0'
        } origin-bottom-right`}
      >
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white p-4 flex justify-between items-center rounded-t-lg shadow-md">
          <div>
            <h3 className="text-lg font-bold">Assistente Full Power</h3>
            <p className="text-sm opacity-90">Online</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-green-800 rounded-full transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Área de mensagens */}
        <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>

        {/* Input de mensagem */}
        <div className="border-t p-2 sm:p-4 bg-white rounded-b-lg">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 transition-shadow"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-700 to-emerald-600 text-white rounded-full p-3 hover:from-green-800 hover:to-emerald-700 disabled:from-green-300 disabled:to-emerald-300 transition-all duration-200 transform hover:scale-110 disabled:scale-100 shadow-lg"
              disabled={isLoading || !input.trim()}
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>

      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ bottom: bottomPosition, right: rightPosition }}
        className={`fixed bg-gradient-to-r from-green-700 to-emerald-600 text-white rounded-full p-4 shadow-2xl hover:from-green-800 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-300 ease-in-out transform hover:scale-110 z-50 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <ChatIcon className="w-8 h-8" />
      </button>
    </div>
  );
};

export default AIAssistant;
