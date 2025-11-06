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
      <div className="relative bg-gray-900 rounded-t-2xl p-2 shadow-2xl">
        <div className="bg-gray-800 rounded-t-xl p-1">
          <div className="bg-white rounded-lg overflow-hidden shadow-inner">
            {/* Dashboard with Scrollable Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* Scrollable content area */}
              <div className="absolute inset-0 overflow-y-auto custom-scrollbar bg-gray-50">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00B46A] to-[#00956A] flex items-center justify-center">
                      <span className="text-white font-bold text-lg">V</span>
                    </div>
                    <span className="font-bold text-gray-900 text-xl">VINFOTECH</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>Last Synced:</span>
                    <span className="font-semibold text-gray-900">11:00 AM</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00B46A] animate-pulse"></div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                  {/* Date Selector */}
                  <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <div className="flex gap-3">
                      <button className="px-5 py-3 rounded-xl bg-[#6B46E5] text-white font-medium shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-sm">Today</div>
                        <div className="text-xs opacity-90">22 Aug</div>
                      </button>
                      <button className="px-5 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium">
                        <div className="text-sm">Thu</div>
                        <div className="text-xs">21 Aug</div>
                      </button>
                      <button className="px-5 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium">
                        <div className="text-sm">Wed</div>
                        <div className="text-xs">20 Aug</div>
                      </button>
                      <button className="p-3 rounded-xl bg-gray-200 text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                          <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                          <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                          <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {/* Left Column - Attendance */}
                    <div className="col-span-2 space-y-6">
                      {/* Attendance Card */}
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-bold text-gray-900 text-xl">Attendance</h3>
                          <div className="flex gap-4 text-sm">
                            <span className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-[#6B46E5]"></div>Present
                            </span>
                            <span className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>On Break
                            </span>
                            <span className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-gray-300"></div>Absent
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="relative w-40 h-40">
                            <svg className="transform -rotate-90 w-40 h-40">
                              <circle cx="80" cy="80" r="70" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                              <circle cx="80" cy="80" r="70" stroke="#6B46E5" strokeWidth="12" fill="none"
                                strokeDasharray="440" strokeDashoffset="88" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-4xl font-bold text-gray-900">830</span>
                              <span className="text-sm text-gray-500">Present at 11:15 AM</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Currently on Break</span>
                              <span className="text-3xl font-bold text-gray-900">5</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Absent Today</span>
                              <span className="text-3xl font-bold text-gray-900">8</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Time Snapshots */}
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-900 text-xl mb-6">Time-wise Snapshots</h3>
                        <div className="flex gap-6 justify-between">
                          {[
                            { count: 186, time: '9:00 AM', total: 802, absent: 8 },
                            { count: 580, time: '9:30 AM', total: 408, absent: 8 },
                            { count: 730, time: '10:00 AM', total: 258, absent: 8 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex-1 text-center">
                              <div className="relative w-28 h-28 mx-auto mb-4">
                                <svg className="transform -rotate-90 w-28 h-28">
                                  <circle cx="56" cy="56" r="50" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                                  <circle cx="56" cy="56" r="50" stroke="#6B46E5" strokeWidth="8" fill="none"
                                    strokeDasharray={`${(item.count / 1000) * 314} 314`} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-2xl font-bold text-gray-900">{item.count}</span>
                                </div>
                              </div>
                              <div className="text-sm font-semibold text-gray-900 mb-2">Present at {item.time}</div>
                              <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                                <span>↓ {item.total}</span>
                                <span>⚠ {item.absent}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Row */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">
                            <span className="text-3xl">⚠️</span>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-gray-900">3</div>
                            <div className="text-sm text-gray-600">System Alerts</div>
                            <div className="text-xs text-gray-500 mt-1">Alerts in 24 hrs</div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#6B46E5] to-[#5B36D5] rounded-2xl p-6 flex items-center justify-between text-white shadow-lg">
                          <div>
                            <div className="text-lg font-bold mb-1">Analytics & Reports</div>
                            <div className="text-sm opacity-90">View detailed insights</div>
                          </div>
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Activity Feed */}
                    <div className="col-span-1">
                      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 sticky top-24">
                        <div className="flex justify-between items-center mb-5">
                          <h3 className="font-bold text-gray-900 text-lg">Recent Activity</h3>
                          <button className="text-sm text-[#6B46E5] font-semibold">VIEW ALL</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { name: 'Wilfredo H.', floor: 'First Floor', time: '10:46 AM', alert: false },
                            { name: 'Unknown', floor: 'Ground Floor', time: '10:46 AM', alert: true },
                            { name: 'Wade Warren', floor: 'First Floor', time: '10:46 AM', alert: false },
                            { name: 'Willow Moon', floor: 'First Floor', time: '10:58 AM', alert: false },
                            { name: 'Floyd Miles', floor: 'Ground Floor', time: '10:46 AM', alert: false },
                            { name: 'Stella Lambert', floor: 'Ground Floor', time: '10:46 AM', alert: false },
                            { name: 'Bessie Cooper', floor: 'First Floor', time: '10:46 AM', alert: false },
                            { name: 'Unknown', floor: 'Ground Floor', time: '10:58 AM', alert: true },
                            { name: 'Ronda Gibbs', floor: 'First Floor', time: '10:46 AM', alert: false },
                            { name: 'Carlos Pitts', floor: 'Ground Floor', time: '10:58 AM', alert: false },
                            { name: 'Sydney Norton', floor: 'First Floor', time: '10:46 AM', alert: false },
                            { name: 'Jeremy Key', floor: 'First Floor', time: '10:58 AM', alert: false }
                          ].map((person, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden">
                              <div className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-12 h-16 border-2 border-white/60 rounded"></div>
                                </div>
                                <div className="absolute top-2 left-2 bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded">
                                  {person.time}
                                </div>
                                {person.alert && (
                                  <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">!</span>
                                  </div>
                                )}
                              </div>
                              <div className="p-2 bg-white">
                                <div className="text-xs font-bold text-gray-900 truncate">{person.name}</div>
                                <div className="text-[10px] text-gray-500">{person.floor}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none flex items-end justify-center pb-3">
                <div className="flex flex-col items-center gap-1 animate-bounce">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-xs text-gray-600 font-medium">Scroll to explore</span>
                </div>
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
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 5px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #555;
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* Monitor Stand */}
      <div className="relative h-16 flex items-end justify-center">
        <div className="w-32 h-12 bg-gray-800 rounded-t-lg shadow-inner"></div>
        <div className="absolute bottom-0 w-48 h-3 bg-gray-900 rounded-full shadow-lg"></div>
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
