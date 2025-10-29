import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Info,
  Target,
  Lightbulb,
  Cpu,
  Clock,
  CheckCircle,
  TrendingUp,
  Award,
  Database,
  FileCheck,
  CheckCircle2,
  Zap,
  Link,
  Search,
  Code,
  Palette,
  Server,
  HardDrive,
  Cloud
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TwoColumnSection from '../components/TwoColumnSection';
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
      if (!slug) return;

      setLoading(true);
      try {
        const data = await getCaseStudyBySlug(slug);
        if (data) {
          setCaseStudy(data);
          const related = await getSuggestedCaseStudies(slug, data.tags, 3);
          setRelatedStudies(related);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading case study:', error);
        navigate('/');
      }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header onQuoteClick={() => {}} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#00B46A' }}></div>
            <p className="text-gray-600 dark:text-gray-400">Loading case study...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return null;
  }

  const heroBackground = caseStudy.hero_background_image || 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header onQuoteClick={() => {}} />

      <div className="relative h-[60vh] min-h-[500px] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt={caseStudy.title}
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
            {caseStudy.title}
          </h1>
          {(caseStudy.subtitle || caseStudy.hero_description) && (
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl leading-relaxed">
              {caseStudy.subtitle || caseStudy.hero_description}
            </p>
          )}
        </div>
      </div>

      <main className="pb-16">
        <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">

          <TwoColumnSection
            icon={Info}
            title="Overview"
            content={
              <>
                {caseStudy.problem.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </>
            }
            imagePosition="right"
            imageComponent={
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 w-full">
                <div className="space-y-4">
                  {chatMessages.slice(0, 2).map((msg, idx) => (
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
              </div>
            }
          />

          <TwoColumnSection
            icon={Target}
            title="The Challenge"
            content={
              <>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Even for a technology company, handling complex inbound queries efficiently was difficult. Visitors asked questions that required digging through:
                </p>
                <ul className="mt-4 space-y-3">
                  {['Sales manuals and product PDFs', 'Project documentation', 'Internal spreadsheets (pricing, delivery timelines)', 'Web pages and feature listings'].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 style={{ color: '#00B46A' }} size={20} className="flex-shrink-0 mt-1" />
                      <span className="text-lg text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Human responses were slow and inconsistent. The challenge was to automate product Q&A and pre-sales support without losing accuracy or brand tone.
                </p>
              </>
            }
            imagePosition="left"
            imageComponent={<ChallengeDiagram />}
          />

          <TwoColumnSection
            icon={Lightbulb}
            title="The AI Solution"
            content={
              <>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {caseStudy.solution}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  The agent runs fully autonomously, providing reliable responses without needing manual approval — acting as an always-on digital sales executive.
                </p>
              </>
            }
            imagePosition="right"
            imageComponent={
              <div className="w-full max-w-md mx-auto">
                <PhoneMockup messages={chatMessages} appName="Vinfotech AI Assistant" />
              </div>
            }
          />

          <section className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00B46A20' }}>
                  <Cpu style={{ color: '#00B46A' }} size={28} />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  How AI Made It Possible
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Traditional chatbots relied on predefined flows and couldn't handle nuanced, domain-specific questions. This solution leveraged AI to read and reason, not just match keywords.
              </p>
            </div>
            <BreakthroughCards />
          </section>

          <section className="mb-16">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 sm:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00B46A20' }}>
                  <FileCheck style={{ color: '#00B46A' }} size={28} />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center">
                  Vinfotech's Approach
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8 max-w-3xl mx-auto">
                Our systematic approach to building enterprise-grade AI solutions
              </p>
              <ApproachTimeline />
            </div>
          </section>

          <section className="mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 sm:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00B46A20' }}>
                  <Database style={{ color: '#00B46A' }} size={28} />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Technology Stack</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {caseStudy.technologies && caseStudy.technologies.length > 0 ? (
                  caseStudy.technologies.map((tech, idx) => (
                    <TechItem key={idx} category={tech.category} name={tech.name} />
                  ))
                ) : (
                  <>
                    <TechItem category="LLMs" name="GPT-4 Turbo" />
                    <TechItem category="LLMs" name="Mistral 7B" />
                    <TechItem category="Frameworks" name="LangChain" />
                    <TechItem category="Retrieval" name="pgvector" />
                    <TechItem category="Retrieval" name="ElasticSearch" />
                    <TechItem category="Frontend" name="React + NextJS" />
                    <TechItem category="Frontend" name="Tailwind CSS" />
                    <TechItem category="Infrastructure" name="AWS ECS" />
                    <TechItem category="Infrastructure" name="PostgreSQL" />
                    <TechItem category="Infrastructure" name="Redis" />
                    <TechItem category="Infrastructure" name="S3" />
                  </>
                )}
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Impact & Results
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Measurable improvements across all key metrics
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudy.metrics && caseStudy.metrics.length > 0 ? (
                caseStudy.metrics.map((metric, idx) => (
                  <MetricCard
                    key={idx}
                    icon={getMetricIcon(metric.label)}
                    label={metric.label}
                    value={metric.value}
                    description={metric.description || ''}
                  />
                ))
              ) : (
                <>
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
                </>
              )}
            </div>
          </section>

          <KeyTakeawaySection
            takeaway={caseStudy.results || "This internal project proved how **Enterprise RAG and AI agents** can revolutionize pre-sales and support. The system delivers **factual, cited, and human-quality answers** around the clock — allowing sales teams to focus on **relationship-building** rather than repetitive responses."}
            quote={caseStudy.client_quote}
            quoteAuthor={caseStudy.client_name}
            quoteRole={caseStudy.client_role}
          />

          {caseStudy.gallery_images && caseStudy.gallery_images.length > 0 && (
            <ProductGallery images={caseStudy.gallery_images} />
          )}

          {relatedStudies.length > 0 && (
            <RelatedCaseStudies caseStudies={relatedStudies} />
          )}
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
  category: string;
  name: string;
}

function TechItem({ category, name }: TechItemProps) {
  const getTechIcon = (techName: string, category: string) => {
    const nameLower = techName.toLowerCase();
    const catLower = category.toLowerCase();

    if (nameLower.includes('gpt') || nameLower.includes('mistral')) return Zap;
    if (nameLower.includes('langchain')) return Link;
    if (nameLower.includes('vector') || nameLower.includes('elastic')) return Search;
    if (nameLower.includes('react') || nameLower.includes('next')) return Code;
    if (nameLower.includes('tailwind')) return Palette;
    if (nameLower.includes('aws') || nameLower.includes('ecs')) return Cloud;
    if (nameLower.includes('postgres') || nameLower.includes('redis')) return Database;
    if (nameLower.includes('s3')) return HardDrive;

    if (catLower.includes('llm')) return Zap;
    if (catLower.includes('framework')) return Link;
    if (catLower.includes('retrieval')) return Search;
    if (catLower.includes('frontend')) return Code;
    if (catLower.includes('infrastructure')) return Server;

    return Database;
  };

  const Icon = getTechIcon(name, category);

  return (
    <div className="flex flex-col items-center text-center group">
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: '#00B46A' }}
      >
        <Icon className="text-white" size={28} />
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#6B7280' }}>
        {category}
      </div>
      <div className="text-sm font-bold text-gray-900 dark:text-white">
        {name}
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
