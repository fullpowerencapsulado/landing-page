
import React from 'react';

export const TypingIndicator: React.FC = () => {
    return (
        <div className="w-full flex justify-start">
            <div className="bg-gray-200 text-gray-800 self-start rounded-3xl rounded-br-3xl px-4 py-3 shadow-md">
                <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
};
