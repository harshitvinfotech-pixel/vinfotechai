import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  Paperclip,
  Info,
  BarChart3,
  CheckCircle,
  Database,
  MessageSquare,
  TrendingUp,
  Clock,
  Target,
  Award
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PhoneMockup from '../components/PhoneMockup';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import ChallengeDiagram from '../components/ChallengeDiagram';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleBackClick = () => {
    navigate('/', { state: { scrollTo: 'case-studies' } });
  };

  const chatMessages = [
    {
      role: 'user' as const,
      content: 'Do you build fantasy sports apps with live leaderboards?'
    },
    {
      role: 'assistant' as const,
      content: 'Yes! We specialize in fantasy sports platforms with real-time leaderboards. Our solutions include:\n\n✓ Live score updates\n✓ Player statistics integration\n✓ Custom scoring rules\n✓ Multi-league support\n\nTypical delivery: 12-16 weeks.\n\n📄 Source: Product Capabilities Doc, Page 23'
    },
    {
      role: 'user' as const,
      content: 'What\'s the monthly cost for maintenance?'
    },
    {
      role: 'assistant' as const,
      content: 'Our fantasy sports platform maintenance plans start at $2,500/month and include:\n\n• 24/7 monitoring\n• Performance optimization\n• Security updates\n• Bug fixes\n• Monthly reports\n\n📄 Source: Pricing Sheet 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header onQuoteClick={() => setShowQuoteForm(true)} />

      <div className="relative h-[60vh] min-h-[500px] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="AI Sales Agent Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        <div className="absolute top-24 left-6 sm:left-8 lg:left-12 z-10">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 group border border-white/20"
          >
            <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium text-sm sm:text-base">Back to Case Studies</span>
          </button>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: '#00B46A', color: 'white' }}>
            Case Study
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 max-w-5xl leading-tight">
            Autonomous Enterprise Sales Agent
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl leading-relaxed">
            Every day, potential clients visit the Vinfotech website with questions. Our AI Sales Agent provides accurate, contextual, and cited responses instantly, available 24/7.
          </p>
        </div>
      </div>

      <main className="pb-16">
        <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 mb-16 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00B46A20' }}>
                <Info style={{ color: '#00B46A' }} size={28} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Overview</h2>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Every day, potential clients visit the Vinfotech website with questions — about pricing, timelines, integrations, technologies, or specific product capabilities.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Earlier, these inquiries often required manual intervention or follow-ups from the sales team. To solve this, Vinfotech built its own <span className="font-bold" style={{ color: '#00B46A' }}>Autonomous AI Sales Agent</span> that now provides accurate, contextual, and cited responses instantly, available 24/7 on the website.
              </p>
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare style={{ color: '#00B46A' }} size={28} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Chat with AI Assistant</h3>
              </div>

              <div className="space-y-4 mb-6">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                        msg.role === 'user'
                          ? 'text-white rounded-br-sm'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm'
                      }`}
                      style={msg.role === 'user' ? { backgroundColor: '#00B46A' } : {}}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                <Paperclip size={20} className="text-gray-400 cursor-pointer hover:text-[#00B46A] transition-colors" />
                <input
                  type="text"
                  placeholder="Type your question..."
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                  disabled
                />
                <button
                  className="p-2 rounded-full transition-colors"
                  style={{ backgroundColor: '#00B46A' }}
                  aria-label="Send message"
                >
                  <Send size={18} className="text-white" />
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 style={{ color: '#00B46A' }} size={28} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Structured AI Response</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Info style={{ color: '#00B46A' }} size={20} />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Summary</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-7">
                    Our AI Sales Agent provides instant, accurate responses to complex product queries by searching across all company documentation, pricing sheets, and knowledge bases. Every answer includes citations to source documents for verification.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp style={{ color: '#00B46A' }} size={20} />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Visual Insights</h4>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 pl-7">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Response Accuracy</span>
                        <span className="font-bold text-gray-900 dark:text-white">94%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '94%', backgroundColor: '#00B46A' }}></div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Manual Reduction</span>
                        <span className="font-bold text-gray-900 dark:text-white">70%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '70%', backgroundColor: '#00B46A' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle style={{ color: '#00B46A' }} size={20} />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Next Steps</h4>
                  </div>
                  <ol className="space-y-2 pl-7">
                    <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <span className="font-bold" style={{ color: '#00B46A' }}>1.</span>
                      <span>Integrate with existing CRM and knowledge bases</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <span className="font-bold" style={{ color: '#00B46A' }}>2.</span>
                      <span>Train on company-specific documentation</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <span className="font-bold" style={{ color: '#00B46A' }}>3.</span>
                      <span>Deploy with continuous monitoring and refinement</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <section className="mb-16">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00B46A20' }}>
                  <Target style={{ color: '#00B46A' }} size={28} />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">The Challenge</h3>
              </div>

              <div className="mb-8 space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Every day, potential clients visit the Vinfotech website with questions about pricing, timelines, integrations, technologies, or specific product capabilities. Earlier, these inquiries often required manual intervention or follow-ups from the sales team.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Even for a technology company, handling complex inbound queries efficiently was difficult. Visitors asked questions that required digging through sales manuals, PDFs, project documentation, internal spreadsheets, and web pages. Human responses were <span className="font-bold" style={{ color: '#00B46A' }}>slow and inconsistent</span>.
                </p>
              </div>

              <ChallengeDiagram />
            </div>
          </section>

          <section className="mb-16">
            <PhoneMockup messages={chatMessages} appName="Vinfotech AI Assistant" />
          </section>

          <section className="mb-16">
            <ArchitectureDiagram />
          </section>

          <section className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Impact & Results
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Measurable improvements across all key metrics
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                icon={Clock}
                label="Response Time"
                value="< 2 sec"
                description="Average query response"
              />
              <MetricCard
                icon={CheckCircle}
                label="Accuracy"
                value="94%"
                description="Validated against playbooks"
              />
              <MetricCard
                icon={TrendingUp}
                label="Reduction"
                value="70%"
                description="Manual sales responses"
              />
              <MetricCard
                icon={Award}
                label="Conversions"
                value="+35%"
                description="Increase in conversions"
              />
            </div>
          </section>

          <section className="mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 sm:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Database style={{ color: '#00B46A' }} size={28} />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Technology Stack</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">AI & Data</h4>
                  <ul className="space-y-3">
                    <TechItem name="GPT-4 Turbo" description="Primary LLM" />
                    <TechItem name="Mistral 7B" description="Fallback model" />
                    <TechItem name="LangChain" description="Orchestration" />
                    <TechItem name="pgvector" description="Vector search" />
                    <TechItem name="ElasticSearch" description="Full-text search" />
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Infrastructure</h4>
                  <ul className="space-y-3">
                    <TechItem name="React + NextJS" description="Frontend" />
                    <TechItem name="PostgreSQL" description="Database" />
                    <TechItem name="AWS ECS" description="Containers" />
                    <TechItem name="Redis" description="Caching" />
                    <TechItem name="S3" description="Document storage" />
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 sm:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <FileText size={48} className="mx-auto mb-4 opacity-90" />
                  <h3 className="text-3xl font-bold mb-4">Key Takeaway</h3>
                </div>
                <p className="text-xl leading-relaxed mb-6 opacity-95">
                  This internal project proved how <strong>Enterprise RAG and AI agents</strong> can revolutionize pre-sales and support. The system delivers <strong>factual, cited, and human-quality answers</strong> around the clock — allowing sales teams to focus on <strong>relationship-building</strong> rather than repetitive responses.
                </p>
                <blockquote className="text-lg italic border-l-4 border-white/50 pl-6 py-4">
                  "Our AI Sales Agent has become the most reliable member of our sales team — accurate, tireless, and always on message."
                  <footer className="mt-3 text-sm font-semibold opacity-90">— Head of Growth, Vinfotech</footer>
                </blockquote>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
}

function MetricCard({ icon: Icon, label, value, description }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#00B46A20' }}>
          <Icon style={{ color: '#00B46A' }} size={24} />
        </div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
        <div className="text-xs text-gray-500 dark:text-gray-500">{description}</div>
      </div>
    </div>
  );
}

interface TechItemProps {
  name: string;
  description: string;
}

function TechItem({ name, description }: TechItemProps) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#00B46A' }}></div>
      <div>
        <div className="font-semibold text-gray-900 dark:text-white">{name}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
      </div>
    </li>
  );
}
