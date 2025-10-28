import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUp, ChevronRight } from 'lucide-react';
import { getCaseStudyBySlug, getSuggestedCaseStudies } from '../lib/caseStudies';
import type { CaseStudyWithDetails, CaseStudy } from '../types/caseStudy';
import SuggestedCaseStudies from '../components/SuggestedCaseStudies';
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
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
        <div className="animate-pulse">
          <div className="h-[500px] bg-gray-200 dark:bg-gray-900"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Case Study Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00B46A] text-white rounded-lg hover:bg-[#00a05f] transition-colors"
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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <section className="relative min-h-[650px] flex items-center overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00B46A]/20 rounded-full filter blur-[120px] opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full filter blur-[120px] opacity-60"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2.5 mb-8 bg-gray-100 dark:bg-white/10 backdrop-blur-sm text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300 border border-gray-200 dark:border-white/20"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Home</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 bg-[#00B46A]/10 backdrop-blur-sm text-[#00B46A] text-xs font-semibold rounded-full border border-[#00B46A]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {caseStudy.title}
              </h1>

              {caseStudy.subtitle && (
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {caseStudy.subtitle}
                </p>
              )}

              {caseStudy.industry && (
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <span className="text-sm font-medium">Industry:</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-sm font-medium">{caseStudy.industry}</span>
                </div>
              )}

              {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  {caseStudy.metrics.slice(0, 3).map((metric) => (
                    <div key={metric.id}>
                      <div className="text-2xl sm:text-3xl font-bold text-[#00B46A] mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-snug">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-[#00B46A]/10 to-emerald-500/10 shadow-2xl">
                <img
                  src={caseStudy.hero_image}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00B46A]/20 rounded-full filter blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {caseStudy.metrics && caseStudy.metrics.length === 4 && (
        <section className="bg-[#00B46A] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {caseStudy.metrics.map((metric) => (
                <div key={metric.id} className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
                    {metric.value}
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-white/95 mb-2">
                    {metric.label}
                  </div>
                  {metric.description && (
                    <div className="text-sm text-white/85 leading-relaxed">
                      {metric.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {caseStudy.overview_bullets && caseStudy.overview_bullets.length > 0 && (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50/50 dark:from-white/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl">
                  <img
                    src={caseStudy.hero_image}
                    alt="Overview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <LucideIcons.Info className="text-blue-500" size={24} />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Overview</h2>
                </div>

                <div className="space-y-4">
                  {caseStudy.overview_bullets.map((bullet, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00B46A]/10 flex items-center justify-center text-[#00B46A] font-bold text-sm group-hover:bg-[#00B46A] group-hover:text-white transition-colors">
                        {index + 1}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-0.5">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <LucideIcons.AlertCircle className="text-red-500" size={24} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">The Challenge</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>
        </div>
      </section>

      {caseStudy.features && caseStudy.features.length > 0 && (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#00B46A]/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#00B46A]/10 flex items-center justify-center">
                  <LucideIcons.Zap className="text-[#00B46A]" size={24} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Key Features</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Cutting-edge AI capabilities powering the solution
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudy.features.map((feature) => {
                const IconComponent = (LucideIcons as any)[feature.icon] || LucideIcons.Box;
                return (
                  <div
                    key={feature.id}
                    className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-[#00B46A]/40 hover:shadow-xl hover:shadow-[#00B46A]/10 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#00B46A]/10 flex items-center justify-center mb-4 group-hover:bg-[#00B46A] group-hover:scale-110 transition-all">
                      <IconComponent className="text-[#00B46A] group-hover:text-white transition-colors" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {groupedTechnologies && Object.keys(groupedTechnologies).length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <LucideIcons.Code2 className="text-purple-500" size={24} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Technology Stack</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Built on cutting-edge AI and cloud infrastructure
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(groupedTechnologies).map(([category, techs]) => (
                <div
                  key={category}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-[#00B46A]/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00B46A]/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">
                      {category.includes('CV') ? '🤖' :
                       category.includes('FRAMEWORK') ? '💻' :
                       category.includes('EDGE') ? '🏗️' :
                       category.includes('BACKEND') ? '⚙️' : '🔐'}
                    </span>
                  </div>
                  <h3 className="font-bold mb-4 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {category}
                  </h3>
                  <ul className="space-y-2.5">
                    {techs.map((tech) => (
                      <li key={tech.id} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <ChevronRight size={16} className="text-[#00B46A] mt-0.5 flex-shrink-0" />
                        <span>{tech.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {caseStudy.results && (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#00B46A]/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <LucideIcons.TrendingUp className="text-green-500" size={24} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">The Results</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {caseStudy.results}
              </p>
            </div>
          </div>
        </section>
      )}

      {caseStudy.client_quote && (
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative p-8 sm:p-12 rounded-3xl border-2 border-[#00B46A]/20 bg-gradient-to-br from-[#00B46A]/5 via-transparent to-emerald-500/5 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B46A]/10 rounded-full filter blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl -z-10"></div>

              <div className="relative z-10">
                <div className="text-6xl text-[#00B46A]/40 mb-4 leading-none">"</div>
                <blockquote className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-8 leading-relaxed">
                  {caseStudy.client_quote}
                </blockquote>
                {(caseStudy.client_name || caseStudy.client_role) && (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00B46A] to-emerald-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                      {caseStudy.client_name?.charAt(0) || 'C'}
                    </div>
                    <div>
                      {caseStudy.client_name && (
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {caseStudy.client_name}
                        </div>
                      )}
                      {caseStudy.client_role && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {caseStudy.client_role}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {suggestedStudies.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900/30">
          <SuggestedCaseStudies studies={suggestedStudies} />
        </div>
      )}

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#00B46A] text-white rounded-full shadow-xl hover:shadow-2xl hover:bg-[#00a05f] transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50 group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}
