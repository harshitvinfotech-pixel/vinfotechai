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
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00B46A]/20 via-transparent to-[#00B46A]/20 blur-3xl"></div>

      {/* Desktop Monitor */}
      <div className="relative bg-gray-900 rounded-t-2xl p-2 shadow-2xl">
        <div className="bg-gray-800 rounded-t-xl p-1">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="relative aspect-[16/9]">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#00B46A] flex items-center justify-center">
                    <span className="text-white font-bold text-xs">V</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">VINFOTECH</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <span>Last Synced: 11:00 AM</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00B46A] animate-pulse"></div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="absolute inset-0 top-10 bg-gray-50 overflow-hidden">
                <div className="p-3 h-full overflow-y-auto">
                  {/* Date Tabs */}
                  <div className="flex items-center justify-between mb-3">
                    <h1 className="text-sm font-bold text-gray-900">Dashboard</h1>
                    <div className="flex gap-1">
                      <button className="px-2 py-1 rounded bg-[#6B46E5] text-white text-[9px] font-medium leading-tight">
                        Today<br/>22 Aug
                      </button>
                      <button className="px-2 py-1 rounded bg-gray-200 text-gray-700 text-[9px] leading-tight">
                        Thu<br/>21 Aug
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    {/* Left - Stats */}
                    <div className="col-span-7 space-y-2">
                      {/* Attendance Card */}
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900 text-[11px]">Attendance</h3>
                          <div className="flex gap-2 text-[8px]">
                            <span className="flex items-center gap-0.5">
                              <div className="w-1 h-1 rounded-full bg-[#6B46E5]"></div>Present
                            </span>
                            <span className="flex items-center gap-0.5">
                              <div className="w-1 h-1 rounded-full bg-gray-300"></div>Break
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16">
                            <svg className="transform -rotate-90 w-16 h-16">
                              <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                              <circle cx="32" cy="32" r="28" stroke="#6B46E5" strokeWidth="6" fill="none"
                                strokeDasharray="176" strokeDashoffset="35" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-base font-bold text-gray-900">830</span>
                              <span className="text-[7px] text-gray-500">Present</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between text-[9px]">
                              <span className="text-gray-600">On Break</span>
                              <span className="font-bold">5</span>
                            </div>
                            <div className="flex justify-between text-[9px]">
                              <span className="text-gray-600">Absent</span>
                              <span className="font-bold">8</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Time Snapshots */}
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-900 text-[11px] mb-2">Time-wise Snapshots</h3>
                        <div className="flex gap-2">
                          {[186, 580, 730].map((count, idx) => (
                            <div key={idx} className="flex-1 text-center">
                              <div className="relative w-12 h-12 mx-auto">
                                <svg className="transform -rotate-90 w-12 h-12">
                                  <circle cx="24" cy="24" r="20" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                                  <circle cx="24" cy="24" r="20" stroke="#6B46E5" strokeWidth="4" fill="none"
                                    strokeDasharray={`${(count / 1000) * 126} 126`} strokeLinecap="round" />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold">{count}</span>
                              </div>
                              <div className="text-[8px] text-gray-600 mt-1">{['9:00', '9:30', '10:00'][idx]} AM</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Alerts */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200 flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-yellow-100 flex items-center justify-center text-xs">⚠️</div>
                          <div>
                            <div className="text-sm font-bold">3</div>
                            <div className="text-[8px] text-gray-500">Alerts</div>
                          </div>
                        </div>
                        <div className="bg-[#6B46E5] rounded-lg p-2 flex items-center justify-between">
                          <span className="text-[9px] font-bold text-white">Analytics</span>
                          <span className="text-white text-xs">→</span>
                        </div>
                      </div>
                    </div>

                    {/* Right - Activity Feed */}
                    <div className="col-span-5">
                      <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200 h-full">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-gray-900 text-[11px]">Recent Activity</h3>
                          <span className="text-[8px] text-[#6B46E5] font-medium">VIEW ALL</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {['Wilfredo H.', 'Unknown', 'Wade W.', 'Willow M.', 'Floyd M.', 'Stella L.'].map((name, idx) => (
                            <div key={idx} className="bg-gray-100 rounded overflow-hidden">
                              <div className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-8 h-10 border border-white/60 rounded"></div>
                                </div>
                                {name === 'Unknown' && (
                                  <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-red-500 rounded flex items-center justify-center">
                                    <span className="text-white text-[8px] font-bold">!</span>
                                  </div>
                                )}
                              </div>
                              <div className="p-1 bg-white">
                                <div className="text-[8px] font-bold text-gray-900 truncate">{name}</div>
                                <div className="text-[7px] text-gray-500">Floor {idx % 2 + 1}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monitor Stand */}
      <div className="relative h-12 flex items-end justify-center">
        <div className="w-24 h-8 bg-gray-800 rounded-t-lg"></div>
        <div className="absolute bottom-0 w-32 h-2 bg-gray-900 rounded-full"></div>
      </div>
    </div>
  );
}

function ChatPhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px] h-[500px] sm:h-[600px]">
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[40px] shadow-2xl p-3">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>

        {/* Screen */}
        <div className="relative h-full bg-white rounded-[32px] overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#00B46A] to-[#00956A] px-4 py-4 flex items-center gap-3">
            <img src="/vinfo-2.png" alt="Vinfotech AI" className="w-10 h-10 rounded-full bg-white p-1" />
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">Vinfotech AI Assistant</h3>
              <p className="text-white/80 text-xs">Online</p>
            </div>
            <MessageCircle className="w-5 h-5 text-white" />
          </div>

          {/* Chat Messages */}
          <div className="p-4 space-y-3 bg-gray-50 h-[calc(100%-120px)] overflow-y-auto">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-[#00B46A] text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] shadow-sm">
                <p className="text-xs sm:text-sm">What products would be best for enterprise automation?</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-md">
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
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 py-2">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-xs outline-none text-gray-700"
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
              <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={solutionImage}
                  alt="AI Solution"
                  className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover"
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
