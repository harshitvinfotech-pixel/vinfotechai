import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  TrendingUp,
  Award,
  CheckCircle2,
  Brain,
  Search,
  FileText,
  Layout,
  Server,
  Settings,
  Database
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PhoneMockup from '../components/PhoneMockup';
import ChallengeDiagram from '../components/ChallengeDiagram';
import BreakthroughCards from '../components/BreakthroughCards';
import ApproachTimeline from '../components/ApproachTimeline';
import KeyTakeawaySection from '../components/KeyTakeawaySection';
import ProductGallery from '../components/ProductGallery';
import RelatedCaseStudies from '../components/RelatedCaseStudies';
import { getCaseStudyBySlug, getSuggestedCaseStudies } from '../lib/caseStudies';
import type { CaseStudyWithDetails, CaseStudy } from '../types/caseStudy';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudyWithDetails | null>(null);
  const [relatedStudies, setRelatedStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    async function loadCaseStudy() {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const study = await getCaseStudyBySlug(slug);

      if (!study) {
        navigate('/');
        return;
      }

      setCaseStudy(study);
      const related = getSuggestedCaseStudies(slug, study.tags, 3);
      setRelatedStudies(related);
      setLoading(false);
    }

    loadCaseStudy();
  }, [slug, navigate]);

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

  if (loading || !caseStudy) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header onQuoteClick={() => {}} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B46A]"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading case study...</p>
          </div>
        </div>
      </div>
    );
  }

  const heroBackground = caseStudy.hero_background_image || 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 page-transition-enter">
      <Header onQuoteClick={() => {}} />

      <div className="relative h-[60vh] min-h-[500px] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt={caseStudy.title}
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
            {caseStudy.title}
          </h1>
          {(caseStudy.subtitle || caseStudy.hero_description) && (
            <p className="text-[18px] sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl leading-relaxed px-2">
              {caseStudy.subtitle || caseStudy.hero_description}
            </p>
          )}
        </div>
      </div>

      <main className="pb-0">

          <section className="mb-0 bg-gray-50 dark:bg-black py-12 sm:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
                  Overview
                </h2>
                <div className="space-y-4">
                  {caseStudy.problem.split('\n\n').map((paragraph, idx) => {
                    const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={idx} className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {parts.map((part, partIdx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={partIdx} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
                          }
                          return <span key={partIdx}>{part}</span>;
                        })}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-0 bg-gray-100 dark:bg-gray-800 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
                <div className="order-1 lg:order-1">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-700" style={{ height: '400px' }}>
                    <ChallengeDiagram />
                  </div>
                </div>
                <div className="order-2 lg:order-2">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    The Challenge
                  </h2>
                  <div className="space-y-4 sm:space-y-5">
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      Even for a technology company, handling complex inbound queries efficiently was difficult. Visitors asked questions that required digging through:
                    </p>
                    <ul className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                      {['Sales manuals and product PDFs', 'Project documentation', 'Internal spreadsheets (pricing, delivery timelines)', 'Web pages and feature listings'].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-5 sm:mt-6">
                      Human responses were slow and inconsistent. The challenge was to automate product Q&A and pre-sales support without losing accuracy or brand tone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-0 bg-white dark:bg-gray-900 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    The AI Solution
                  </h2>
                  <div className="space-y-4 sm:space-y-5">
                    {caseStudy.solution.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.trim().startsWith('•')) {
                        const items = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
                        return (
                          <ul key={idx} className="space-y-3 sm:space-y-4">
                            {items.map((item, itemIdx) => {
                              const cleanItem = item.replace(/^•\s*/, '').trim();
                              const parts = cleanItem.split(/(<b>.*?<\/b>)/g);
                              return (
                                <li key={itemIdx} className="flex items-start gap-3 sm:gap-4">
                                  <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                  <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                                    {parts.map((part, partIdx) => {
                                      if (part.startsWith('<b>') && part.endsWith('</b>')) {
                                        return <strong key={partIdx} className="font-bold text-gray-900 dark:text-white">{part.slice(3, -4)}</strong>;
                                      }
                                      return <span key={partIdx}>{part}</span>;
                                    })}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        );
                      }
                      const parts = paragraph.split(/(<b>.*?<\/b>)/g);
                      return (
                        <p key={idx} className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                          {parts.map((part, partIdx) => {
                            if (part.startsWith('<b>') && part.endsWith('</b>')) {
                              return <strong key={partIdx} className="font-bold text-gray-900 dark:text-white">{part.slice(3, -4)}</strong>;
                            }
                            return <span key={partIdx}>{part}</span>;
                          })}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="w-full max-w-sm mx-auto">
                    <PhoneMockup messages={chatMessages} appName="Vinfotech AI Assistant" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-0 bg-gray-50 dark:bg-black py-12 sm:py-16">
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
                <BreakthroughCards />
              </div>
            </div>
          </section>

          <section className="mb-0 bg-white dark:bg-gray-900 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
                <div className="order-1 lg:order-1 lg:sticky lg:top-24 lg:self-start">
                  <div className="text-center lg:text-left mb-8 sm:mb-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
                      Vinfotech's Approach
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
                      Our systematic approach to building enterprise-grade AI solutions
                    </p>
                  </div>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 dark:border-gray-700 h-[400px] lg:h-[500px]">
                    <img
                      src={caseStudy.overview_image_url || heroBackground}
                      alt="AI Agent Interaction"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="order-2 lg:order-2 min-h-[400px] lg:min-h-[500px]">
                  <ApproachTimeline />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-0 bg-gray-50 dark:bg-black py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative pt-8">
                <div className="bg-white rounded-t-2xl px-8 py-4" style={{ position: 'absolute', top: '-22px', left: '0', width: '200px', zIndex: 1, clipPath: 'polygon(0 0, 92% 0, 100% 93%, 0% 100%)', borderTopRightRadius: '42px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.15)' }}>
                  <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#00B46A' }}>
                    Impact
                  </h2>
                </div>
                <div className="relative rounded-3xl py-12 sm:py-16 px-6 sm:px-10 md:px-16 pt-16 sm:pt-20" style={{ backgroundColor: '#00B46A', zIndex: 10 }}>
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

          <section className="mb-0 bg-white dark:bg-gray-900 py-12 sm:py-16">
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
                <TechStackCard iconImage="/images.png" name="GPT-4 Turbo" category="LLM" />
                <TechStackCard icon={Brain} name="Mistral 7B" category="LLM" />
                <TechStackCard icon={Search} name="LangChain" category="Retrieval" />
                <TechStackCard icon={Search} name="pgvector" category="Vector DB" />
                <TechStackCard icon={Search} name="ElasticSearch" category="Search" />
                <TechStackCard icon={Layout} name="React + NextJS" category="Frontend" />
                <TechStackCard icon={Layout} name="Tailwind" category="Styling" />
                <TechStackCard icon={Server} name="AWS ECS" category="Infrastructure" />
                <TechStackCard icon={Database} name="PostgreSQL" category="Database" />
                <TechStackCard icon={Server} name="Redis" category="Cache" />
              </div>
            </div>
          </section>

        <div style={{ backgroundColor: 'var(--key-takeaway-bg)' }}>
          <div className="w-full">
            <KeyTakeawaySection
              takeaway={caseStudy.results || "This internal project proved how **Enterprise RAG and AI agents** can revolutionize pre-sales and support. The system delivers **factual, cited, and human-quality answers** around the clock — allowing sales teams to focus on **relationship-building** rather than repetitive responses."}
              quote={caseStudy.client_quote}
              quoteAuthor={caseStudy.client_name}
              quoteRole={caseStudy.client_role}
            />

            {caseStudy.gallery_images && caseStudy.gallery_images.length > 0 && (
              <div className="px-4 sm:px-6 lg:px-8">
                <ProductGallery images={caseStudy.gallery_images} />
              </div>
            )}
          </div>
        </div>

        {relatedStudies.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RelatedCaseStudies
                caseStudies={relatedStudies}
                title="Other Case Studies"
              />
            </div>
          </div>
        )}
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#C7F4E3' }}>
          <Icon style={{ color: '#059669' }} size={24} strokeWidth={2} />
        </div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</div>
        <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2" style={{ letterSpacing: '-0.02em' }}>{value}</div>
        <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{description}</div>
      </div>
    </div>
  );
}

interface TechStackRowProps {
  category: string;
  technologies: string[];
}

function getTechIcon(category: string): React.ElementType {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('llm')) return Brain;
  if (categoryLower.includes('retrieval')) return Search;
  if (categoryLower.includes('knowledge') || categoryLower.includes('source')) return FileText;
  if (categoryLower.includes('frontend')) return Layout;
  if (categoryLower.includes('infrastructure')) return Server;
  if (categoryLower.includes('operation')) return Settings;
  return Database;
}

function TechStackRow({ category, technologies }: TechStackRowProps) {
  const Icon = getTechIcon(category);
  return (
    <div className="flex items-start gap-2 sm:gap-3 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#00B46A20' }}>
        <Icon style={{ color: '#00B46A' }} size={14} className="sm:w-4 sm:h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1">
          {category}:
        </h4>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {technologies.join(', ')}
        </p>
      </div>
    </div>
  );
}

interface TechStackCardProps {
  icon?: React.ElementType;
  name: string;
  category: string;
  iconImage?: string;
}

function TechStackCard({ icon: Icon, name, category, iconImage }: TechStackCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-[#00B46A] dark:hover:border-[#00B46A] transition-all duration-300 hover:shadow-lg group">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#00B46A20' }}>
          {iconImage ? (
            <img src={iconImage} alt={name} className="w-10 h-10 object-contain" />
          ) : Icon ? (
            <Icon style={{ color: '#00B46A' }} size={28} />
          ) : null}
        </div>
        <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
          {name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {category}
        </p>
      </div>
    </div>
  );
}


function getMetricIcon(label: string): React.ElementType {
  const labelLower = label.toLowerCase();
  if (labelLower.includes('time') || labelLower.includes('response')) return Clock;
  if (labelLower.includes('accuracy') || labelLower.includes('quality')) return CheckCircle;
  if (labelLower.includes('reduction') || labelLower.includes('decrease')) return TrendingUp;
  if (labelLower.includes('conversion') || labelLower.includes('increase')) return Award;
  return CheckCircle;
}
