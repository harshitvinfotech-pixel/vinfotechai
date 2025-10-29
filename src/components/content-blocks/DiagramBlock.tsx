import { useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import type { DiagramBlockData } from '../../types/caseStudy';

interface DiagramBlockProps {
  data: DiagramBlockData;
}

export default function DiagramBlock({ data }: DiagramBlockProps) {
  const { title, description, nodes } = data;
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border-2 border-gray-200 dark:border-gray-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="relative z-10">
          {(title || description) && (
            <div className="text-center mb-12 lg:mb-16">
              {title && (
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {nodes.map((node, index) => (
              <div key={node.id} className="relative">
                <div
                  className={`group cursor-pointer transition-all duration-300 h-full ${
                    activeNode === node.id ? 'scale-105' : 'hover:scale-105'
                  }`}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  <div
                    className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-lg border-2 transition-all duration-300 h-full flex flex-col ${
                      activeNode === node.id
                        ? 'border-emerald-500 dark:border-emerald-400 shadow-2xl shadow-emerald-500/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center flex-1">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg transition-all duration-300 ${
                          activeNode === node.id ? 'scale-110 shadow-2xl' : 'group-hover:scale-105'
                        }`}
                        style={{
                          background: node.color || 'linear-gradient(135deg, #00B46A 0%, #00D4AA 100%)'
                        }}
                      >
                        <Zap className="text-white" size={28} />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        {node.label}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {node.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
