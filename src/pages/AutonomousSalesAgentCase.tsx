import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Bot, Timer, CheckCircle, MailMinus, AlertTriangle,
  Search, CornerDownRight, SearchCheck, Languages, Quote, RadioTower,
  DatabaseZap, Filter, Link, RefreshCw, Cpu, Link2, Atom, MoveRight,
  Cloud, BarChart3, Newspaper, Video, Mic2, Clock, Sun, Moon
} from 'lucide-react';

export default function AutonomousSalesAgentCase() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview-view');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.getAttribute('data-target');
          if (targetId) {
            setActiveView(targetId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.4,
      rootMargin: '-20% 0px -40% 0px'
    });

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24 mt-8">
        <div className="relative bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-slate-900 dark:to-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden">

          {/* Theme Toggle */}
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 border border-gray-300 dark:border-gray-700"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center p-12 lg:p-16 pt-20">

            {/* Left Column */}
            <div className="lg:col-span-1">
              <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-4">
                <Bot className="h-4 w-4 mr-1" /> Autonomous AI Agent
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                Autonomous Enterprise Sales Agent
              </h1>
              <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-lg">
                How Vinfotech scaled pre-sales with an always-on, cited AI assistant.
              </p>
              <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 max-w-lg">
                An Enterprise RAG agent that answers complex inbound queries with verified, brand-consistent responses—24/7.
              </p>

              {/* Metrics */}
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2">
                  <Timer className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">&lt;2s</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">94%</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Accuracy</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2">
                  <MailMinus className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">70%</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Fewer Emails</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <img
                className="w-full max-w-lg rounded-2xl shadow-xl"
                src="https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="AI Sales Agent Visual"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scrollytelling Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24">

          {/* Left Column: Scrolling Text */}
          <div className="lg:col-span-1">

            {/* Section 1: Overview */}
            <div
              ref={(el) => (sectionRefs.current['overview'] = el)}
              data-target="overview-view"
              className="py-8 min-h-[70vh]"
            >
              <h2 className="text-base font-semibold text-emerald-600 dark:text-emerald-500 tracking-wide uppercase">Overview</h2>
              <p className="mt-3 text-xl text-gray-700 dark:text-gray-300">
                Vinfotech embedded an autonomous, RAG-powered sales agent on its website to answer pricing, timelines, integrations, and product capability questions instantly—with citations and brand-safe tone.
              </p>
            </div>

            {/* Section 2: Challenge */}
            <div
              ref={(el) => (sectionRefs.current['challenge'] = el)}
              data-target="challenge-view"
              className="py-16 lg:py-24 min-h-[70vh]"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">The Challenge</h2>
              <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
                Handling complex inbound queries efficiently was difficult. Human responses were slow and inconsistent. We needed automation without losing accuracy or brand tone.
              </p>
              <ul className="mt-8 space-y-4 text-lg">
                <li className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 dark:text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-600 dark:text-gray-400">Complex questions spanned PDFs, docs, sheets, and web pages.</p>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 dark:text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-600 dark:text-gray-400">Slow, inconsistent human replies risked drop-offs.</p>
                </li>
              </ul>
            </div>

            {/* Section 3: Solution */}
            <div
              ref={(el) => (sectionRefs.current['solution'] = el)}
              data-target="solution-view"
              className="py-16 lg:py-24 min-h-[70vh]"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">The AI Solution</h2>
              <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
                A conversational Enterprise RAG agent trained on structured and unstructured knowledge, running fully autonomously as an always-on digital sales executive.
              </p>
              <ul className="mt-8 space-y-4 text-lg">
                <li className="flex items-start">
                  <Bot className="h-6 w-6 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-600 dark:text-gray-400">Synthesizes verified answers with citations.</p>
                </li>
                <li className="flex items-start">
                  <Search className="h-6 w-6 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-600 dark:text-gray-400">Searches docs, pricing sheets, and site content.</p>
                </li>
                <li className="flex items-start">
                  <CornerDownRight className="h-6 w-6 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <p className="ml-3 text-gray-600 dark:text-gray-400">Suggests follow-up questions to guide users.</p>
                </li>
              </ul>
            </div>

            {/* Section 4: How AI Made It Possible */}
            <div
              ref={(el) => (sectionRefs.current['how-ai'] = el)}
              data-target="how-ai-view"
              className="py-16 lg:py-24 min-h-[70vh]"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">How AI Made It Possible</h2>
              <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
                Traditional chatbots failed on nuanced, domain-specific queries. This solution leveraged AI to read and reason, not just match keywords.
              </p>
            </div>

            {/* Section 5: Tech Stack */}
            <div
              ref={(el) => (sectionRefs.current['stack'] = el)}
              data-target="stack-view"
              className="py-16 lg:py-24 min-h-[70vh]"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Technology Stack</h2>
              <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
                Built using a modern stack for robust retrieval, reasoning, and a fast user experience.
              </p>
            </div>

            {/* Section 6: Impact */}
            <div
              ref={(el) => (sectionRefs.current['impact'] = el)}
              data-target="impact-view"
              className="py-16 lg:py-24 min-h-[70vh]"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Measurable Impact</h2>
              <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
                The agent delivered immediate, significant results in efficiency, accuracy, and lead generation.
              </p>
            </div>

          </div>

          {/* Right Column: Sticky Visuals */}
          <div className="lg:col-span-1 h-full hidden lg:block">
            <div className="sticky top-24 h-[700px] rounded-2xl bg-gray-100 dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">

              <div className="relative w-full h-full">

                {/* Overview View */}
                <StickyView active={activeView === 'overview-view'}>
                  <div className="flex flex-col items-center justify-center text-center h-full">
                    <div className="p-6 bg-emerald-600 rounded-full">
                      <Bot className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Vinfotech AI Agent</h3>
                    <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">Answers your questions instantly.</p>
                  </div>
                </StickyView>

                {/* Challenge View */}
                <StickyView active={activeView === 'challenge-view'}>
                  <ChallengeVisual />
                </StickyView>

                {/* Solution View */}
                <StickyView active={activeView === 'solution-view'}>
                  <SolutionVisual />
                </StickyView>

                {/* How AI View */}
                <StickyView active={activeView === 'how-ai-view'}>
                  <HowAIVisual />
                </StickyView>

                {/* Tech Stack View */}
                <StickyView active={activeView === 'stack-view'}>
                  <TechStackVisual />
                </StickyView>

                {/* Impact View */}
                <StickyView active={activeView === 'impact-view'}>
                  <ImpactVisual />
                </StickyView>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-gray-100 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl lg:text-3xl font-medium text-gray-800 dark:text-white italic">
              "Our AI Sales Agent has become the most reliable member of our sales team — accurate, tireless, and always on message."
            </p>
            <footer className="mt-6">
              <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">Head of Growth, Vinfotech</p>
            </footer>
          </div>
        </div>
      </section>

      {/* Key Takeaway */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Key Takeaway</h2>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
            Enterprise RAG + AI agents can deliver cited, human-quality answers at scale, freeing your sales team to focus on building relationships rather than on repetitive responses.
          </p>
        </div>
      </section>

    </div>
  );
}

function StickyView({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div className={`absolute inset-0 transition-all duration-500 ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {children}
    </div>
  );
}

function ChallengeVisual() {
  return (
    <div className="p-8 lg:p-12 flex flex-col justify-center bg-gray-50 dark:bg-gray-800 h-full">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">The Data Complexity Problem</h3>
      <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-8">Before AI: A fragmented landscape</p>
      <div className="grid grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
              <BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <p className="text-xs mt-1 dark:text-gray-300">PDFs</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
              <Newspaper className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <p className="text-xs mt-1 dark:text-gray-300">Docs</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
              <Video className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <p className="text-xs mt-1 dark:text-gray-300">Sheets</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
              <Mic2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <p className="text-xs mt-1 dark:text-gray-300">Web</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg mr-3">
              <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Slow Manual Process</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Hours to answer each query</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg mr-3">
              <DatabaseZap className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Fragmented Data</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Scattered across systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SolutionVisual() {
  return (
    <div className="p-8 lg:p-12 flex flex-col justify-center h-full overflow-y-auto">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">AI-Powered Solution</h3>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg mr-3">
            <SearchCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Hybrid Retrieval</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Unified search across all data sources</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg mr-3">
            <Languages className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Brand-Safe Tone</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Professional, consistent responses</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg mr-3">
            <Quote className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Source Citations</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Every answer includes verifiable sources</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg mr-3">
            <RadioTower className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">24/7 Availability</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Always-on digital sales executive</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowAIVisual() {
  return (
    <div className="p-5 overflow-y-auto h-full">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Breakthroughs</h3>
      <div className="space-y-3">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex items-start shadow">
          <DatabaseZap className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mt-1 flex-shrink-0" />
          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">RAG on mixed data (PDFs, sheets, DBs)</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex items-start shadow">
          <Filter className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mt-1 flex-shrink-0" />
          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">Vector search + reranking for precision</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex items-start shadow">
          <Link className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mt-1 flex-shrink-0" />
          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">Citation-first policy (links to source)</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex items-start shadow">
          <RefreshCw className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mt-1 flex-shrink-0" />
          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">Nightly auto-indexing of new content</p>
        </div>
      </div>
    </div>
  );
}

function TechStackVisual() {
  return (
    <div className="p-5 flex flex-col items-center justify-center h-full">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Technology Stack</h3>
      <div className="grid grid-cols-3 gap-6">
        <TechIcon icon={Cpu} label="GPT-4" />
        <TechIcon icon={Link2} label="LangChain" />
        <TechIcon icon={DatabaseZap} label="pgvector" />
        <TechIcon icon={Atom} label="React" />
        <TechIcon icon={MoveRight} label="Next.js" />
        <TechIcon icon={Cloud} label="AWS" />
      </div>
    </div>
  );
}

function TechIcon({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg h-24 w-24">
      <Icon className="h-8 w-8 text-emerald-500" />
      <p className="mt-2 text-sm font-medium dark:text-gray-200">{label}</p>
    </div>
  );
}

function ImpactVisual() {
  return (
    <div className="p-5 overflow-y-auto h-full">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Measurable Impact</h3>
      <div className="space-y-6">
        <ImpactBar label="Answer Accuracy" value="94%" width={94} />
        <ImpactBar label="Fewer Manual Emails" value="70%" width={70} />
        <ImpactBar label="Conversion Increase" value="35%" width={35} />
        <ImpactBar label="Session Length" value="2.3x" width={76} />
      </div>
    </div>
  );
}

function ImpactBar({ label, value, width }: { label: string; value: string; width: number }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{value}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          className="bg-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
