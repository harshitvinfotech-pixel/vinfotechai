import { Code2, Database, Brain, Cloud } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function TechStack() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            [0, 1, 2, 3].forEach((index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const techCategories = [
    {
      icon: Code2,
      title: 'Large Language Models (LLMs)',
      technologies: ['TensorFlow', 'PyTorch', 'Hugging Face', 'LangChain', 'OpenAI', 'Anthropic Claude', 'LlamaIndex'],
    },
    {
      icon: Database,
      title: 'Enterprise RAG Frameworks',
      technologies: ['Python', 'TypeScript', 'React', 'Node.js', 'FastAPI', 'Next.js', 'Docker'],
    },
    {
      icon: Brain,
      title: 'Computer Vision Frameworks',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Pinecone', 'Weaviate', 'Elasticsearch', 'S3'],
    },
    {
      icon: Cloud,
      title: 'Core Languages & Cloud',
      technologies: ['AWS', 'Google Cloud', 'Azure', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Vercel'],
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-black opacity-90"></div>

      <div className="absolute inset-0 opacity-20 dark:opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight px-2">
            The AI Stack We Master
          </h2>
          <p className="text-xl sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed px-4">
            We utilize a diverse, cutting-edge technology stack to ensure your solution is robust, scalable, and future-proof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {techCategories.map((category, index) => {
            const isVisible = visibleCards.includes(index);
            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/40 dark:to-gray-900/40 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-300/50 dark:border-gray-700/50 hover:border-[#00B46A]/50 dark:hover:border-[#00B46A]/60 transition-all duration-700 shadow-lg dark:shadow-none hover:scale-[1.03] hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >

                <div className="relative flex items-start gap-3 sm:gap-4 md:gap-5">
                  <div className={`flex-shrink-0 w-12 h-1 sm:w-14 sm:h-14 bg-gradient-to-br from-[#00B46A] to-[#00964F] dark:from-[#00D68A] dark:to-[#00B46A] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-[#00B46A]/30 dark:shadow-[#00B46A]/40 group-hover:shadow-2xl group-hover:shadow-[#00B46A]/60 dark:group-hover:shadow-[#00B46A]/70 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-180'}`}
                    style={{
                      transitionDelay: isVisible ? `${index * 150 + 200}ms` : '0ms',
                    }}
                  >
                    <category.icon className="text-white transition-transform duration-500 group-hover:scale-110" size={24} strokeWidth={2} />
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4 group-hover:text-[#00B46A] dark:group-hover:text-[#00D68A] transition-all duration-500 group-hover:translate-x-1 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                      style={{
                        transitionDelay: isVisible ? `${index * 150 + 300}ms` : '0ms',
                      }}
                    >
                      {category.title}
                    </h3>

                    <p className={`text-sm sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed transition-all duration-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                      style={{
                        transitionDelay: isVisible ? `${index * 150 + 400}ms` : '0ms',
                      }}
                    >
                      {getCategoryDescription(category.title)}
                    </p>
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

function getCategoryDescription(title: string): string {
  const descriptions: Record<string, string> = {
    'Large Language Models (LLMs)': 'OpenAI (GPT-4), Anthropic (Claude), Google (Gemini), and various Open-Source LLMs (Llama, Mistral).',
    'Enterprise RAG Frameworks': 'LangChain, LlamaIndex, vector databases (Pinecone, ChromaDB, Weaviate), and semantic search technologies.',
    'Computer Vision Frameworks': 'OpenCV, PyTorch, TensorFlow, YOLO models for state-of-the-art detection and analysis.',
    'Core Languages & Cloud': 'Python, various cloud platforms (AWS, Azure, GCP), and MLOps tools for reliable deployment and monitoring.',
  };
  return descriptions[title] || '';
}
