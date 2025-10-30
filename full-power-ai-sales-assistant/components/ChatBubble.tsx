
import React from 'react';
import type { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white self-end rounded-bl-3xl'
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
