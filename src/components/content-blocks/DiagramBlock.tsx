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
    <div className="max-w-5xl mx-auto px-6">
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 sm:p-12 overflow-hidden border-2 border-gray-200 dark:border-gray-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="relative z-10">
          {(title || description) && (
            <div className="text-center mb-12">
              {title && (
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col items-center gap-8">
            {nodes.map((node, index) => (
              <div key={node.id}>
                <div
                  className={`group cursor-pointer transition-all duration-300 ${
                    activeNode === node.id ? 'scale-110' : 'hover:scale-105'
                  }`}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  <div
                    className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 transition-all duration-300 ${
                      activeNode === node.id
                        ? 'border-emerald-500 dark:border-emerald-400 shadow-2xl shadow-emerald-500/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 ${
                          activeNode === node.id ? 'scale-110' : 'group-hover:scale-105'
                        }`}
                        style={{
                          background: node.color || 'linear-gradient(135deg, #00B46A 0%, #00D4AA 100%)'
                        }}
                      >
                        <Zap className="text-white" size={28} />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {node.label}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {node.description}
                      </p>
                    </div>
                  </div>
                </div>

                {index < nodes.length - 1 && (
                  <div className="flex items-center justify-center my-4">
                    <ArrowRight
                      className="text-gray-400 dark:text-gray-600 transform rotate-90"
                      size={32}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
