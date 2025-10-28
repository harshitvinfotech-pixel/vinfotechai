import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Target, TrendingUp, Lightbulb } from 'lucide-react';
import { getCaseStudyBySlug, getSuggestedCaseStudies } from '../lib/caseStudies';
import type { CaseStudyWithDetails, CaseStudy } from '../types/caseStudy';
import SuggestedCaseStudies from '../components/SuggestedCaseStudies';
import PhoneMockup from '../components/PhoneMockup';
import * as LucideIcons from 'lucide-react';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudyWithDetails | null>(null);
  const [suggestedStudies, setSuggestedStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    async function loadCaseStudy() {
      if (!slug) return;

      setLoading(true);
      window.scrollTo(0, 0);

      const study = await getCaseStudyBySlug(slug);
      if (study) {
        setCaseStudy(study);
        const suggested = await getSuggestedCaseStudies(slug, study.tags);
        setSuggestedStudies(suggested);
      }
      setLoading(false);
    }

    loadCaseStudy();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="h-[60vh] bg-gray-300 dark:bg-gray-800"></div>
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="h-8 bg-gray-300 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Case Study Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const groupedTechnologies = caseStudy.technologies?.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof caseStudy.technologies>);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img
          src={caseStudy.hero_image}
          alt={caseStudy.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-4xl">
            <div className="mb-6">
              {caseStudy.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-4 py-1.5 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-sm font-semibold rounded-full mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {caseStudy.title}
            </h1>
            {caseStudy.subtitle && (
              <p className="text-xl sm:text-2xl text-gray-200 mb-8">
                {caseStudy.subtitle}
              </p>
            )}
            {caseStudy.industry && (
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <span className="text-sm font-medium">Industry:</span>
                <span className="text-sm">{caseStudy.industry}</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </button>
      </div>

      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <div className="bg-emerald-600 dark:bg-emerald-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {caseStudy.metrics.map((metric) => (
                <div key={metric.id} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm sm:text-lg font-semibold text-emerald-100 mb-1">
                    {metric.label}
                  </div>
                  {metric.description && (
                    <div className="text-xs sm:text-sm text-emerald-200">
                      {metric.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Target className="text-red-600 dark:text-red-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The Challenge</h2>
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {caseStudy.problem}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Lightbulb className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Solution</h2>
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {caseStudy.solution}
              </p>
            </section>

            {caseStudy.features && caseStudy.features.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {caseStudy.features.map((feature) => {
                    const IconComponent = (LucideIcons as any)[feature.icon] || LucideIcons.Box;
                    return (
                      <div
                        key={feature.id}
                        className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
                      >
                        <IconComponent className="text-emerald-600 dark:text-emerald-400 mb-3" size={28} />
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {caseStudy.slug === 'sports-analyst-ai-agent' && (
              <section>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  See It In Action
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8">
                  Ask questions in natural language and get instant cricket insights
                </p>
                <PhoneMockup
                  appName="PerfectLineup"
                  messages={[
                    {
                      role: 'user',
                      content: 'How has Virat Kohli performed against Australia in the last 5 T20 matches?'
                    },
                    {
                      role: 'assistant',
                      content: 'Virat Kohli has been exceptional against Australia in recent T20s:\n\n📊 Last 5 Matches:\n• Avg: 58.4 runs\n• Strike Rate: 142.5\n• 2 Half-centuries\n• Best: 82* (51)\n\n🎯 Key Stats:\n• Strong against pace (avg 64.2)\n• Powerplay strike rate: 138.5\n• Death overs avg: 52.1\n\nℹ️ Sources: ICC Stats, ESPN Cricinfo'
                    },
                    {
                      role: 'user',
                      content: 'विराट कोहली के करियर का सबसे अच्छा स्कोर क्या है?'
                    },
                    {
                      role: 'assistant',
                      content: 'विराट कोहली का करियर का सर्वश्रेष्ठ स्कोर:\n\n🏏 टेस्ट: 254* (नॉट आउट)\n• बनाम साउथ अफ्रीका, 2019\n• पुणे में\n\n🏏 वनडे: 183\n• बनाम पाकिस्तान, 2012\n• एशिया कप में\n\n🏏 टी20: 122*\n• बनाम अफगानिस्तान, 2022\n• T20 विश्व कप में'
                    }
                  ]}
                />
              </section>
            )}

            {caseStudy.results && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The Results</h2>
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {caseStudy.results}
                </p>
              </section>
            )}

            {caseStudy.timeline && caseStudy.timeline.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Calendar className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Project Timeline</h2>
                </div>
                <div className="space-y-6">
                  {caseStudy.timeline.map((phase, index) => (
                    <div key={phase.id} className="flex gap-4">
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        {index < caseStudy.timeline!.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {phase.phase}
                          </h4>
                          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium rounded-full">
                            {phase.duration}
                          </span>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {caseStudy.client_quote && (
              <section className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800">
                <div className="text-4xl text-emerald-600 dark:text-emerald-400 mb-4">"</div>
                <p className="text-2xl text-gray-800 dark:text-gray-200 italic mb-6 leading-relaxed">
                  {caseStudy.client_quote}
                </p>
                {(caseStudy.client_name || caseStudy.client_role) && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                      {caseStudy.client_name?.charAt(0) || 'C'}
                    </div>
                    <div>
                      {caseStudy.client_name && (
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {caseStudy.client_name}
                        </div>
                      )}
                      {caseStudy.client_role && (
                        <div className="text-base text-gray-600 dark:text-gray-400">
                          {caseStudy.client_role}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {groupedTechnologies && Object.keys(groupedTechnologies).length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technologies Used</h3>
                  <div className="space-y-6">
                    {Object.entries(groupedTechnologies).map(([category, techs]) => (
                      <div key={category}>
                        <h4 className="text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {techs.map((tech) => (
                            <span
                              key={tech.id}
                              className="px-3 py-1.5 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-base font-medium rounded-lg border border-gray-300 dark:border-gray-600"
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {caseStudy.tags && caseStudy.tags.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-base font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {suggestedStudies.length > 0 && (
        <SuggestedCaseStudies studies={suggestedStudies} />
      )}

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#00B46A] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50"
        >
          <ArrowLeft size={20} className="rotate-90" />
        </button>
      )}
    </div>
  );
}
