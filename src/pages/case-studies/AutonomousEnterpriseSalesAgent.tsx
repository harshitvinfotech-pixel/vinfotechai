import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AutonomousEnterpriseSalesAgent() {
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
            src="/1.1 copy.jpg"
            alt="Autonomous Enterprise Sales Agent"
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
            Autonomous Enterprise Sales Agent
          </h1>
          <p className="text-[18px] sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl leading-relaxed px-2">
            AI-powered sales assistant providing instant, accurate responses 24/7
          </p>
        </div>
      </div>

      <main className="pb-0">
        {/* Overview Section */}
        <section className="mb-0 bg-gray-50 dark:bg-black py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
                Every day, potential clients visit the Vinfotech website with questions
              </h2>
              <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                about pricing, timelines, integrations, technologies, or specific product capabilities.
              </p>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Earlier, these inquiries often required manual intervention or follow-ups from the sales team. To solve this, Vinfotech built its own <strong className="font-bold text-gray-900 dark:text-white">Autonomous AI Sales Agent</strong> that now provides accurate, contextual, and cited responses instantly, available 24/7 on the website.
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
                    src="/1.1.jpg"
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
                    Every day, potential clients visit the Vinfotech website with questions — about pricing, timelines, integrations, technologies, or specific product capabilities.
                  </p>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Earlier, these inquiries often required manual intervention or follow-ups from the sales team. To solve this, Vinfotech built its own Autonomous AI Sales Agent that now provides accurate, contextual, and cited responses instantly.
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
                    Every day, potential clients visit the Vinfotech website with questions — about pricing, timelines, integrations, technologies, or specific product capabilities.
                  </p>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Earlier, these inquiries often required manual intervention or follow-ups from the sales team. To solve this, Vinfotech built its own Autonomous AI Sales Agent.
                  </p>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    When a visitor asks a question like:
                  </p>
                  <ul className="space-y-3 sm:space-y-4 ml-4">
                    <li className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                      "Do you build fantasy sports apps with live leaderboards?"
                    </li>
                    <li className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                      or "What's the monthly cost for your iGaming platform maintenance plan?"
                    </li>
                  </ul>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    The agent:
                  </p>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                        Searches across internal documents, pricing sheets, and web pages.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                        Synthesizes a verified, human-like answer with citations to the source documents.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                        Offers relevant follow-up questions to guide the visitor deeper.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-purple-600 h-[500px] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-white text-lg font-semibold mb-4">Phone Mockup Placeholder</div>
                    <p className="text-white/80 text-sm">AI Assistant Interface</p>
                  </div>
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
                Traditional chatbots relied on predefined flows and couldn't handle nuanced, domain-specific questions. This solution leveraged AI to read and reason, not just match keywords.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: 'RAG System Must Run', description: 'AI system integrates with multiple data sources and provides contextual responses with citations.' },
                { title: 'RAG System Must Run', description: 'Natural language processing ensures human-like conversations and accurate understanding.' },
                { title: 'RAG System Must Run', description: 'Continuous learning from interactions improves accuracy and relevance over time.' },
                { title: 'RAG System Must Run', description: 'Multi-source knowledge integration provides comprehensive and verified answers.' },
                { title: 'RAG System Must Run', description: 'Real-time document search and synthesis for accurate, cited responses.' },
                { title: 'RAG System Must Run', description: 'Context-aware follow-up question generation guides visitors effectively.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
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
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#00B46A]"></div>
                {[
                  { title: 'Knowledge Integration', description: 'Flatten, seed, transform vector database. Map every business document — from scattered PDFs to internal Notion pages. To make them AI-readable, Vinfotech built a layered knowledge base using embeddings and structured metadata.' },
                  { title: 'Knowledge Integration', description: 'Deploy, finalize vector index, validate contextual recall. Deploy AI retrieval infrastructure on scalable cloud services (AWS ECS + Supabase vector DB). Test and fine-tune retrieval accuracy against real-world customer queries.' },
                  { title: 'Knowledge Integration', description: 'Flatten, seed, transform vector database. Monitor conversations, analyze patterns, implement guardrails. Track query performance and user satisfaction. Detect hallucinations early. Refine prompts. Improve fallback behavior when the AI is uncertain.' }
                ].map((item, idx) => (
                  <div key={idx} className={`relative mb-12 ${idx % 2 === 0 ? 'pr-8 lg:pr-16 text-right lg:w-1/2' : 'pl-8 lg:pl-16 text-left lg:w-1/2 lg:ml-auto'}`}>
                    <div className={`absolute top-0 ${idx % 2 === 0 ? 'right-0' : 'left-0'} w-8 h-8 rounded-full flex items-center justify-center transform ${idx % 2 === 0 ? 'translate-x-1/2' : '-translate-x-1/2'}`} style={{ backgroundColor: '#00B46A' }}>
                      <span className="text-white font-bold text-sm">{idx + 1}</span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-0 bg-white dark:bg-gray-900 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="relative rounded-3xl py-12 sm:py-16 px-6 sm:px-10 md:px-16" style={{ backgroundColor: '#00B46A' }}>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">Impact</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12">
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      &lt; 2 sec
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      Response Time
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      94%
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      Accuracy
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      70%
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      Reduction
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      2.3x
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      Engagement
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      +35%
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      Conversions
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white mb-2" style={{ fontSize: '35px' }}>
                      24/7
                    </div>
                    <div className="text-sm sm:text-base text-white/95 font-normal">
                      Availability
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
              {['GPT-4 Turbo', 'Mistral 7B', 'LangChain', 'pgvector', 'ElasticSearch', 'React + NextJS', 'Tailwind', 'AWS ECS', 'PostgreSQL', 'Redis'].map((tech, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300 hover:shadow-lg text-center">
                  <div className="w-16 h-16 rounded-lg mx-auto mb-4" style={{ backgroundColor: '#00B46A20' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={28} />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">{tech}</h4>
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
                    This AI Sales Agent has become the most reliable member of our sales team — accurate, tireless, and always on message.
                  </p>
                </div>
                <div className="text-left border-l-4 pl-4" style={{ borderColor: '#00B46A' }}>
                  <p className="text-base italic text-gray-600 dark:text-gray-400">
                    "Our AI Sales Agent has become the most reliable member of our sales team — accurate, tireless, and always on message."
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    <strong>Head of Growth</strong> - Vinfotech
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
