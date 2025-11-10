import { Database, Zap, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[rgb(49,54,64)] dark:to-gray-800 rounded-2xl p-8 sm:p-12 overflow-hidden border-2 border-gray-200 dark:border-gray-700">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            How It Works
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Enterprise RAG architecture in action
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div
            className={`group cursor-pointer transition-all duration-300 ${
              activeNode === 'user' ? 'scale-110' : 'hover:scale-105'
            }`}
            onMouseEnter={() => setActiveNode('user')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <DiagramNode
              icon={MessageSquare}
              label="User Query"
              description="Visitor asks a product question"
              color="from-blue-500 to-blue-600"
              isActive={activeNode === 'user'}
            />
          </div>

          <div className="flex items-center">
            <ArrowRight className="text-gray-400 dark:text-gray-600 transform rotate-90" size={32} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            <div
              className={`group cursor-pointer transition-all duration-300 ${
                activeNode === 'search' ? 'scale-110' : 'hover:scale-105'
              }`}
              onMouseEnter={() => setActiveNode('search')}
              onMouseLeave={() => setActiveNode(null)}
            >
              <DiagramNode
                icon={Zap}
                label="Vector Search"
                description="Semantic search across knowledge base"
                color="from-emerald-500 to-emerald-600"
                isActive={activeNode === 'search'}
              />
            </div>

            <div
              className={`group cursor-pointer transition-all duration-300 ${
                activeNode === 'knowledge' ? 'scale-110' : 'hover:scale-105'
              }`}
              onMouseEnter={() => setActiveNode('knowledge')}
              onMouseLeave={() => setActiveNode(null)}
            >
              <DiagramNode
                icon={Database}
                label="Knowledge Base"
                description="PDFs, docs, sheets, web pages"
                color="from-purple-500 to-purple-600"
                isActive={activeNode === 'knowledge'}
              />
            </div>

            <div
              className={`group cursor-pointer transition-all duration-300 ${
                activeNode === 'llm' ? 'scale-110' : 'hover:scale-105'
              }`}
              onMouseEnter={() => setActiveNode('llm')}
              onMouseLeave={() => setActiveNode(null)}
            >
              <DiagramNode
                icon={Zap}
                label="LLM Processing"
                description="GPT-4 Turbo synthesizes answer"
                color="from-orange-500 to-orange-600"
                isActive={activeNode === 'llm'}
              />
            </div>
          </div>

          <div className="flex items-center">
            <ArrowRight className="text-gray-400 dark:text-gray-600 transform rotate-90" size={32} />
          </div>

          <div
            className={`group cursor-pointer transition-all duration-300 ${
              activeNode === 'response' ? 'scale-110' : 'hover:scale-105'
            }`}
            onMouseEnter={() => setActiveNode('response')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <DiagramNode
              icon={CheckCircle}
              label="Cited Response"
              description="Verified answer with sources"
              color="from-teal-500 to-teal-600"
              isActive={activeNode === 'response'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface DiagramNodeProps {
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
  isActive: boolean;
}

function DiagramNode({ icon: Icon, label, description, color, isActive }: DiagramNodeProps) {
  return (
    <div
      className={`relative bg-white dark:bg-[rgb(30,35,45)] rounded-xl p-6 shadow-lg border-2 transition-all duration-300 ${
        isActive
          ? 'border-emerald-500 dark:border-emerald-400 shadow-2xl shadow-emerald-500/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4 transition-transform duration-300 ${
            isActive ? 'scale-110' : 'group-hover:scale-105'
          }`}
        >
          <Icon className="text-white" size={28} />
        </div>
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{label}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
