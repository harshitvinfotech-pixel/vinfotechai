import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RelatedStudy {
  slug: string;
  image: string;
  title: string;
}

interface RelatedCaseStudiesSectionProps {
  relatedStudies: RelatedStudy[];
}

export default function RelatedCaseStudiesSection({ relatedStudies }: RelatedCaseStudiesSectionProps) {
  if (!relatedStudies || relatedStudies.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Other Case Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedStudies.map((study) => (
            <Link
              key={study.slug}
              to={`/case-studies/${study.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-[400px]">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {study.title}
                  </h3>
                  <div className="flex items-center text-white group-hover:text-[#00B46A] transition-colors duration-300">
                    <span className="font-semibold">View Case Study</span>
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
