import { useRef } from 'react';
import { useScrollTrigger } from '../../hooks/useScrollTrigger';
import { MessageCircle, Send } from 'lucide-react';

interface SolutionSectionProps {
  solutionText: string;
  solutionImage: string;
  slug?: string;
}

function parseSolutionText(text: string) {
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let currentParagraph: string[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(' ');
      elements.push(
        <p key={key++} className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {parseInlineFormatting(paragraphText)}
        </p>
      );
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <div key={key++} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 space-y-4">
          {listItems.map((item, idx) => (
            <div key={idx} className="flex items-start group">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B46A] text-white font-bold flex items-center justify-center text-sm mr-4">
                {idx + 1}
              </span>
              <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                {parseInlineFormatting(item)}
              </span>
            </div>
          ))}
        </div>
      );
      listItems = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    const numberedMatch = trimmed.match(/^(\d+)\.\s*(.+)$/);
    if (numberedMatch) {
      flushParagraph();
      listItems.push(numberedMatch[2]);
    } else if (trimmed.startsWith('- ')) {
      flushParagraph();
      listItems.push(trimmed.substring(2));
    } else {
      flushList();
      currentParagraph.push(trimmed);
    }
  });

  flushParagraph();
  flushList();

  return elements;
}

function parseInlineFormatting(text: string): (string | JSX.Element)[] {
  const parts = text.split(/(\*\*.*?\*\*|<b>.*?<\/b>)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('<b>') && part.endsWith('</b>')) {
      return <strong key={index} className="font-bold text-gray-900 dark:text-white">{part.slice(3, -4)}</strong>;
    }
    return part;
  });
}

function AttendanceDashboardMockup() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00B46A]/20 via-transparent to-[#00B46A]/20 blur-3xl"></div>

      {/* Desktop Monitor */}
      <div className="relative bg-gray-200 dark:bg-gray-800 rounded-t-2xl p-2 shadow-2xl">
        <div className="bg-gray-300 dark:bg-gray-700 rounded-t-xl p-1">
          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-inner ring-1 ring-gray-300 dark:ring-gray-600">
            {/* Dashboard Screenshot with Scrollable Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* Scrollable content area */}
              <div className="absolute inset-0 overflow-y-auto custom-scrollbar bg-white dark:bg-gray-900">
                <img
                  src="/vision-ai-solution.jpg"
                  alt="Vision-Based Attendance Dashboard"
                  className="w-full h-auto mix-blend-normal dark:opacity-90"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Custom scrollbar styles */}
            <style>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f1f1;
              }
              .dark .custom-scrollbar::-webkit-scrollbar-track {
                background: #374151;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 5px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #555;
              }
              .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #6b7280;
              }
              .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #9ca3af;
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* Monitor Stand */}
      <div className="relative h-16 flex items-end justify-center">
        <div className="w-32 h-12 bg-gray-300 dark:bg-gray-700 rounded-t-lg shadow-inner"></div>
        <div className="absolute bottom-0 w-48 h-3 bg-gray-400 dark:bg-gray-600 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
}

function ChatPhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px] h-[500px] sm:h-[600px]">
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-[40px] shadow-2xl p-3">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-300 dark:bg-gray-900 rounded-b-2xl z-10"></div>

        {/* Screen */}
        <div className="relative h-full bg-white dark:bg-gray-900 rounded-[32px] overflow-hidden ring-1 ring-gray-300 dark:ring-gray-600">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#00B46A] to-[#00956A] px-4 py-4 flex items-center gap-3">
            <img src="/vinfo-2.png" alt="Vinfotech AI" className="w-10 h-10 rounded-full bg-white dark:bg-gray-100 p-1" />
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">Vinfotech AI Assistant</h3>
              <p className="text-white/80 text-xs">Online</p>
            </div>
            <MessageCircle className="w-5 h-5 text-white" />
          </div>

          {/* Chat Messages */}
          <div className="p-4 space-y-3 bg-gray-50 dark:bg-black h-[calc(100%-120px)] overflow-y-auto">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-[#00B46A] text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] shadow-sm">
                <p className="text-xs sm:text-sm">What products would be best for enterprise automation?</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-md ring-1 ring-gray-200 dark:ring-gray-700">
                <p className="text-xs sm:text-sm leading-relaxed">
                  Based on your requirements, I recommend our Enterprise AI Suite which includes:
                  <br/><br/>
                  • Automated workflow processing<br/>
                  • Real-time analytics dashboard<br/>
                  • Custom integration support<br/>
                  <br/>
                  This solution typically reduces operational time by 70%. Would you like to schedule a demo?
                </p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-[#00B46A] text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] shadow-sm">
                <p className="text-xs sm:text-sm">Yes, please!</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-3 py-2">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-xs outline-none text-gray-700 dark:text-gray-300 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                disabled
              />
              <Send className="w-4 h-4 text-[#00B46A]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SolutionSection({ solutionText, solutionImage, slug }: SolutionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollTrigger(sectionRef, { threshold: 0.2 });
  const imageVisible = useScrollTrigger(imageRef, { threshold: 0.3 });
  const textVisible = useScrollTrigger(textRef, { threshold: 0.3 });

  const showPhoneMockup = slug === 'autonomous-enterprise-sales-agent';
  const showDashboardMockup = slug === 'vision-based-attendance-productivity-monitoring';

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div ref={imageRef} className={`order-1 lg:order-2 transition-all duration-1000 ${imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {showPhoneMockup ? (
              <div className="flex items-center justify-center py-8">
                <ChatPhoneMockup />
              </div>
            ) : showDashboardMockup ? (
              <div className="flex items-center justify-center py-8">
                <AttendanceDashboardMockup />
              </div>
            ) : (
              <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02] bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                <img
                  src={solutionImage}
                  alt="AI Solution"
                  className="w-full max-w-full h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] object-contain"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          <div ref={textRef} className={`order-2 lg:order-1 transition-all duration-1000 delay-200 ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-5 lg:mb-6 text-left">
              The AI Solution
            </h2>
            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-left">
              {parseSolutionText(solutionText)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
