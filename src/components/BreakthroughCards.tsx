import { Sparkles, Target, RefreshCw, MessageCircle, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

interface Breakthrough {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const breakthroughs: Breakthrough[] = [
  {
    icon: Sparkles,
    title: 'RAG Across Mixed Data',
    description: 'Unified search across website text, PDFs, spreadsheets, and live database entries',
    color: 'from-[#00B46A] to-[#00A060]'
  },
  {
    icon: Target,
    title: 'Vector Search + Reranking',
    description: 'Context-preserving retrieval with semantic search and intelligent reranking for precision',
    color: 'from-[#00B46A] to-[#00A060]'
  },
  {
    icon: Shield,
    title: 'Citation-First Policy',
    description: 'Every answer links back to verified documents and URLs for transparency',
    color: 'from-[#00B46A] to-[#00A060]'
  },
  {
    icon: MessageCircle,
    title: 'Adaptive Brand Tone',
    description: 'Prompts tuned to professional yet approachable brand voice',
    color: 'from-[#00B46A] to-[#00A060]'
  },
  {
    icon: RefreshCw,
    title: 'Nightly Auto-Indexing',
    description: 'Continuous learning with automatic indexing of new content and FAQs',
    color: 'from-[#00B46A] to-[#00A060]'
  },
  {
    icon: Zap,
    title: 'Real-Time Processing',
    description: 'Sub-2-second response times with streaming answers for instant feedback',
    color: 'from-[#00B46A] to-[#00A060]'
  }
];

export default function BreakthroughCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {breakthroughs.map((breakthrough, index) => (
        <div
          key={index}
          className={`group relative bg-white dark:bg-[rgb(30,35,45)] rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer ${
            hoveredIndex === index
              ? 'border-emerald-500 dark:border-emerald-400 shadow-2xl shadow-emerald-500/20 transform scale-105'
              : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 shadow-lg hover:shadow-xl'
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            transitionDelay: hoveredIndex === null ? `${index * 50}ms` : '0ms'
          }}
        >
          <div
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${breakthrough.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          ></div>

          <div className="relative z-10">
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${breakthrough.color} flex items-center justify-center mb-4 transition-transform duration-300 ${
                hoveredIndex === index ? 'scale-110 rotate-3' : 'group-hover:scale-105'
              }`}
            >
              <breakthrough.icon className="text-white" size={24} />
            </div>

            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {breakthrough.title}
            </h4>

            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {breakthrough.description}
            </p>
          </div>

          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${breakthrough.color} transform origin-left transition-transform duration-500 ${
              hoveredIndex === index ? 'scale-x-100' : 'scale-x-0'
            }`}
          ></div>
        </div>
      ))}
    </>
  );
}
