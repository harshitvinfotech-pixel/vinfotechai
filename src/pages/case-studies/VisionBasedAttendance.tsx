import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function VisionBasedAttendance() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate('/', { state: { scrollTo: 'case-studies' } });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header onQuoteClick={() => {}} />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/2.2 copy.jpg"
            alt="Vision-Based Attendance & Productivity Monitoring"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="absolute top-24 sm:top-28 left-4 sm:left-8 lg:left-12 z-10">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 group border border-white/20"
          >
            <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium text-sm md:text-base">Back to Case Studies</span>
          </button>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <h1 className="text-[30px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 max-w-5xl leading-tight px-2">
            Vision-Based Attendance & Productivity Monitoring
          </h1>
          <p className="text-[18px] sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl leading-relaxed px-2">
            Computer Vision system for hands-free attendance and workplace analytics
          </p>
        </div>
      </div>

      <main className="pb-0">
        {/* Overview Section */}
        <section className="mb-0 bg-gray-50 dark:bg-black py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                In a dynamic software company with over 100 professionals across multiple departments, manual attendance tracking and productivity monitoring were both time-consuming and error-prone.
              </p>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Vinfotech implemented a <strong className="font-bold text-gray-900 dark:text-white">Computer Vision-powered attendance and workplace analytics system</strong> that records presence, monitors zone activity, and generates automated reports—<strong className="font-bold text-gray-900 dark:text-white">completely hands-free.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* The Challenge Section */}
        <section className="mb-0 bg-white dark:bg-gray-900 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
              <div className="order-1 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-700 h-[400px]">
                  <img
                    src="/2.2.jpg"
                    alt="The Challenge"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="order-2 lg:order-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  The Challenge
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    The organization relied on swipe-based or biometric attendance systems. These methods caused:
                  </p>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                        <strong className="font-bold text-gray-900 dark:text-white">Delays during check-ins and check-outs</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                        <strong className="font-bold text-gray-900 dark:text-white">Missed logs</strong> when employees forgot to mark attendance
                      </span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                        <strong className="font-bold text-gray-900 dark:text-white">No visibility</strong> into break durations or overall floor occupancy
                      </span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                        <strong className="font-bold text-gray-900 dark:text-white">Manual effort</strong> in reconciling attendance with payroll or shift logs
                      </span>
                    </li>
                  </ul>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-5 sm:mt-6">
                    The goal was to automate attendance and understand workplace utilization—without adding any friction for team members.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The AI Solution Section */}
        <section className="mb-0 bg-gray-50 dark:bg-black py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  The AI Solution
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Vinfotech deployed a real-time Computer Vision system that identifies employees through facial recognition and tracks their presence across different zones in the office.
                  </p>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    The solution included:
                  </p>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                        <strong className="font-bold text-gray-900 dark:text-white">Entry/Exit Monitoring:</strong> Cameras at gates automatically mark attendance as employees walk in or out—no swipes, no taps.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                        <strong className="font-bold text-gray-900 dark:text-white">Zone Tracking:</strong> Cameras in work areas and meeting rooms map occupancy in real time, helping teams measure focus hours and meeting efficiency.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                        <strong className="font-bold text-gray-900 dark:text-white">Break-Time Analysis:</strong> The system identifies extended idle periods and patterns without requiring employee input.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                        <strong className="font-bold text-gray-900 dark:text-white">Instant Alerts:</strong> Automated notifications for unusual activity—such as unattended workstations during work hours or after-hours presence.
                      </span>
                    </li>
                  </ul>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    The entire setup runs seamlessly on existing camera infrastructure and integrates directly with HR and payroll systems.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-700 h-[500px]">
                  <img
                    src="/2.2 copy.jpg"
                    alt="Vision AI Solution"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How AI Made It Possible Section */}
        <section className="mb-0 bg-white dark:bg-gray-900 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight px-2">
                How AI Made It Possible
              </h2>
              <p className="text-xl sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                Traditional attendance systems required active participation. Computer Vision removed that friction entirely—making attendance invisible and automatic.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: 'Real-Time Face Recognition', description: 'Advanced facial recognition algorithms identify employees instantly as they enter or move through zones.' },
                { title: 'Multi-Zone Tracking', description: 'Simultaneous monitoring across multiple office zones provides comprehensive workplace analytics.' },
                { title: 'Pattern Analysis', description: 'AI analyzes movement patterns to identify breaks, meetings, and work habits automatically.' },
                { title: 'Edge Processing', description: 'On-device processing ensures privacy while maintaining real-time performance.' },
                { title: 'Automated Reporting', description: 'AI generates attendance and productivity reports without manual data entry.' },
                { title: 'Instant Alerts', description: 'Anomaly detection triggers immediate notifications for security or compliance issues.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl mb-4" style={{ backgroundColor: '#00B46A20' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={24} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vinfotech's Approach Section */}
        <section className="mb-0 bg-gray-50 dark:bg-black py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
                Vinfotech's Approach
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
                Our systematic approach to building enterprise-grade AI solutions
              </p>
            </div>
            <div className="max-w-4xl mx-auto relative">
              {/* Timeline line with gradient blur at edges */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 overflow-hidden">
                <div
                  className="absolute inset-0 w-full"
                  style={{
                    background: `linear-gradient(to bottom,
                      transparent 0%,
                      #00B46A 10%,
                      #00B46A 90%,
                      transparent 100%)`
                  }}
                ></div>
              </div>

              {[
                { title: 'Camera Infrastructure Setup', description: 'Leveraged existing CCTV infrastructure and optimized camera placement for full coverage of entry points and key zones.' },
                { title: 'AI Model Training', description: 'Trained custom face recognition models on diverse employee photos to ensure high accuracy across lighting conditions and angles.' },
                { title: 'Integration & Deployment', description: 'Seamlessly integrated with existing HR systems and deployed edge AI processing for real-time performance and data privacy.' }
              ].map((item, idx) => (
                <div key={idx} className={`relative mb-12 ${idx % 2 === 0 ? 'pr-8 lg:pr-16 text-right lg:w-1/2' : 'pl-8 lg:pl-16 text-left lg:w-1/2 lg:ml-auto'}`}>
                  <div className={`absolute top-0 ${idx % 2 === 0 ? 'right-0' : 'left-0'} w-8 h-8 rounded-full flex items-center justify-center transform ${idx % 2 === 0 ? 'translate-x-1/2' : '-translate-x-1/2'}`} style={{ backgroundColor: '#00B46A' }}>
                    <span className="text-white font-bold text-sm">{idx + 1}</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-0 bg-white dark:bg-gray-900 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Impact</h2>
            <div className="relative">
              <div className="relative rounded-3xl py-12 sm:py-16 px-6 sm:px-10 md:px-16" style={{ backgroundColor: '#00B46A' }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12">
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      100%
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      Hands-free
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      95%
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      Accuracy
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      60%
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      Faster Reporting
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      Auto
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      Break Tracking
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      Real-time
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      Analytics
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      0
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      User Friction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="mb-0 bg-gray-50 dark:bg-black py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
                Technology Stack
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
                Powered by cutting-edge technologies for optimal performance
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {[
                { name: 'OpenCV', icon: '👁️' },
                { name: 'TensorFlow', icon: '🧠' },
                { name: 'Face Recognition', icon: '👤' },
                { name: 'Python', icon: '🐍' },
                { name: 'RTSP Streaming', icon: '📹' },
                { name: 'Redis', icon: '📮' },
                { name: 'PostgreSQL', icon: '🐘' },
                { name: 'Docker', icon: '🐳' },
                { name: 'Kubernetes', icon: '☸️' },
                { name: 'AWS EC2', icon: '☁️' }
              ].map((tech, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center group">
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">{tech.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Takeaway Section */}
        <section className="mb-0 bg-white dark:bg-gray-900 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Key Takeaway
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4 mb-6">
                  <CheckCircle2 style={{ color: '#00B46A' }} size={24} className="flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-left">
                    Attendance just happens in the background now. What we gained is real visibility into how teams actually use their time and spaces.
                  </p>
                </div>
                <div className="text-left border-l-4 pl-4" style={{ borderColor: '#00B46A' }}>
                  <p className="text-base italic text-gray-600 dark:text-gray-400">
                    "Attendance just happens in the background now. What we gained is real visibility into how teams actually use their time and spaces."
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    <strong>Operations Head</strong> - Vinfotech
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
