import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Services() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(index));
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const services = [
    {
      id: 'unstructured-data',
      title: 'AI for Unstructured Text & Data',
      description: 'Turn messy documents and knowledge bases into precise, cited intelligence.',
      highlights: [
        '<b>Enterprise RAG systems</b> delivering accurate, source-linked answers',
        '<b>AI Agents</b> that query internal manuals, chats, and spreadsheets',
        '<b>Multi-language natural-language search</b> across enterprise content',
        '<b>Automated report summaries and insights</b> for quick decisions',
        '<b>Custom GenAI tools</b> for creating contextual, fact-checked content',
      ],
      image: '/AI for Unstructured Text & Data.jpg',
    },
    {
      id: 'computer-vision',
      title: 'AI & Computer Vision for Visual Data',
      description: 'Automate visual inspection and decision-making using existing CCTV cameras.',
      highlights: [
        '<b>Manufacturing Quality Control</b> and precision <b>Defect Detection</b>',
        'Real-time <b>PPE Compliance</b> and <b>Workplace Safety Monitoring</b>',
        '<b>Intrusion Detection Systems</b> and perimeter security',
        'Automated <b>Worker Monitoring</b> for team attendance and break management',
        'Advanced <b>Object Detection</b> for asset tracking and process optimization',
      ],
      image: '/AI & Computer Vision for Visual Data.jpg',
    },
    {
      id: 'ai-agents',
      title: 'AI Agents: Data to Decisive Action',
      description: 'Deploy custom AI Agents that analyze complex enterprise data and drive autonomous, measurable business outcomes.',
      highlights: [
        'Building <b>Custom AI Agents</b> for process automation and delegation',
        'Predictive modeling and <b>Intelligent Forecasting</b> based on proprietary data',
        'Internal <b>Recommendation Engines</b> for optimizing complex workflows',
      ],
      image: 'https://images.pexels.com/photos/7948036/pexels-photo-7948036.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  ];


  return (
    <section
      id="services"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900"></div>

      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 70%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="w-full relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-6 sm:px-8 lg:px-12">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#00B46A]">
              What We Offer
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight px-2">
            Our AI Services
          </h2>
          <p className="text-lg sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive AI solutions tailored to your business needs, from intelligent data processing to automated decision-making
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12 lg:space-y-16 px-6 sm:px-8 lg:px-12">
          {services.map((service, index) => {
            const isVisible = visibleSections.has(index);
            return (
              <div
                key={service.id}
                ref={el => sectionRefs.current[index] = el}
                className="max-w-7xl mx-auto"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 bg-white dark:bg-gray-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{
                    transitionDelay: isVisible ? '100ms' : '0ms',
                  }}
                >
                  <div className={`relative h-[160px] sm:h-[400px] lg:h-full overflow-hidden transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                    style={{
                      transitionDelay: isVisible ? '200ms' : '0ms',
                    }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50"></div>
                    <div className="absolute inset-0 flex items-center justify-center sm:justify-center p-6 sm:p-8">
                      <h3
                        className={`text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold text-white leading-tight text-left transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{
                          letterSpacing: '-0.03em',
                          transitionDelay: isVisible ? '400ms' : '0ms',
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-black p-6 sm:p-8 lg:p-10 flex items-start h-auto min-h-[400px] sm:min-h-0 overflow-y-auto sm:overflow-y-visible">
                    <div className="space-y-6 sm:space-y-7 lg:space-y-8 w-full py-2">
                      <p className={`text-lg sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-4 sm:mb-6 lg:mb-8 pt-2 sm:pt-8 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                        style={{
                          transitionDelay: isVisible ? '300ms' : '0ms',
                        }}
                      >
                        {service.description}
                      </p>
                      {service.highlights.map((highlight, highlightIndex) => (
                        <div
                          key={highlightIndex}
                          className={`flex items-start gap-3 sm:gap-4 group/highlight transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
                          style={{
                            transitionDelay: isVisible ? `${400 + (highlightIndex * 100)}ms` : '0ms',
                          }}
                        >
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#00B46A] flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300 group-hover/highlight:scale-110 group-hover/highlight:rotate-12 group-hover/highlight:shadow-lg group-hover/highlight:shadow-[#00B46A]/50">
                            <Check size={14} strokeWidth={3} className="text-white transition-transform duration-300 group-hover/highlight:scale-110" />
                          </div>
                          <p
                            className="text-xl sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-300 group-hover/highlight:text-[#00B46A] group-hover/highlight:translate-x-1"
                            dangerouslySetInnerHTML={{ __html: highlight }}
                          ></p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
