import { MessageCircle, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface PhoneMockupProps {
  messages: Message[];
  appName?: string;
}

export default function PhoneMockup({ messages, appName = 'AI Assistant' }: PhoneMockupProps) {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl"></div>

        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-inner">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{appName}</h3>
              <p className="text-emerald-100 text-xs">Online</p>
            </div>
          </div>

          <div className="h-[500px] overflow-y-auto bg-gray-50 p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              disabled
            />
            <button className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
