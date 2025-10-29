import { MessageCircle, Send, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
  timestamp?: string;
}

const demoMessages: Message[] = [
  {
    role: 'user',
    content: 'Do you build fantasy sports apps with live leaderboards?',
    timestamp: '2:34 PM'
  },
  {
    role: 'assistant',
    content: `Yes! We've built multiple fantasy sports platforms with real-time leaderboards. Our solutions include:

• Live scoring updates with WebSocket integration
• Dynamic leaderboards with instant rank changes
• Multi-league support with private/public contests
• Real-time player statistics and predictions
• Mobile-first responsive design

We recently built a cricket fantasy platform handling 100K+ concurrent users during IPL matches.`,
    citations: ['Case Study: Live Sports Platform', 'Services: Fantasy Sports Development'],
    timestamp: '2:34 PM'
  },
  {
    role: 'user',
    content: "What's the monthly cost for your iGaming platform maintenance plan?",
    timestamp: '2:35 PM'
  },
  {
    role: 'assistant',
    content: `Our iGaming platform maintenance includes:

**Standard Plan: $2,500/month**
• 24/7 monitoring and support
• Security updates and patches
• Performance optimization
• Monthly compliance reports

**Enterprise Plan: $5,000/month**
• Everything in Standard, plus:
• Dedicated DevOps engineer
• Custom feature development (20hrs/month)
• Advanced analytics and reporting
• Priority support with 1-hour response time

Both plans include uptime SLA of 99.9%.`,
    citations: ['Pricing Sheet: Maintenance Plans', 'iGaming Services Overview'],
    timestamp: '2:35 PM'
  },
  {
    role: 'user',
    content: 'Can your sports platform support private leagues?',
    timestamp: '2:36 PM'
  },
  {
    role: 'assistant',
    content: `Absolutely! Private leagues are a core feature. You get:

• Custom league creation with invite codes
• Commissioner controls for scoring rules
• Flexible roster settings and draft formats
• Private chat and trash talk features
• League-specific leaderboards and prizes
• Email notifications for league activities

Private leagues can have 2-500 participants and support both season-long and daily fantasy formats.`,
    citations: ['Product Features: Private Leagues', 'Fantasy Platform Documentation'],
    timestamp: '2:36 PM'
  }
];

export default function SalesAgentDemo() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentMessageIndex < demoMessages.length) {
      const timer = setTimeout(() => {
        const message = demoMessages[currentMessageIndex];

        if (message.role === 'assistant') {
          setIsTyping(true);
          setTimeout(() => {
            setDisplayedMessages((prev) => [...prev, message]);
            setIsTyping(false);
            setCurrentMessageIndex((prev) => prev + 1);
          }, 1500);
        } else {
          setDisplayedMessages((prev) => [...prev, message]);
          setCurrentMessageIndex((prev) => prev + 1);
        }
      }, currentMessageIndex === 0 ? 500 : 2000);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-10"></div>

        <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black rounded-[2.5rem] overflow-hidden shadow-inner">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">Vinfotech AI Sales Agent</h3>
              <p className="text-emerald-100 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online - Always Ready
              </p>
            </div>
          </div>

          <div className="h-[600px] overflow-y-auto bg-gray-50 dark:bg-gray-950 p-4 space-y-4">
            {displayedMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-br-sm shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md rounded-bl-sm border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

                  {message.citations && message.citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Sources:</p>
                      {message.citations.map((citation, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                        >
                          <ExternalLink size={12} />
                          <span>{citation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {message.timestamp && (
                    <p className={`text-[10px] mt-2 ${
                      message.role === 'user' ? 'text-emerald-200' : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="max-w-[85%] bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about our services, pricing, timelines..."
              className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 dark:text-gray-200"
              disabled
            />
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Live demo showing the AI agent answering complex product queries with citations
        </p>
      </div>
    </div>
  );
}
