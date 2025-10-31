import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedBlogs, formatPublishedDate } from '../lib/blogs';
import type { BlogWithCategory } from '../types/blog';

export default function BlogPreview() {
  const [blogs, setBlogs] = useState<BlogWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getFeaturedBlogs(3);
        setBlogs(data);
      } catch (error) {
        console.error('Error loading featured blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  const handleCardClick = (slug: string) => {
    navigate(`/blogs/${slug}`);
  };

  if (blogs.length === 0 && !loading) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:pt-24 lg:pb-24 px-6 sm:px-8 lg:px-12 bg-gray-50 dark:bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <div className="mb-6 sm:mb-8 text-center">
            <div className="mb-3 sm:mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#00B46A' }}>
                Our Blogsssss
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
              Insights, Innovation & Expertise
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 sm:mb-12 overflow-x-auto md:overflow-x-visible pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 snap-x snap-mandatory md:snap-none scrollbar-hide touch-pan-x">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-[85vw] sm:w-[75vw] md:w-auto h-[400px] sm:h-[420px] bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl animate-pulse snap-center"></div>
            ))}
          </div>
        ) : (
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 sm:mb-12 overflow-x-auto md:overflow-x-visible pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 snap-x snap-mandatory md:snap-none scrollbar-hide touch-pan-x">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex-shrink-0 w-[85vw] sm:w-[75vw] md:w-auto snap-center">
                <BlogCard
                  blog={blog}
                  onClick={() => handleCardClick(blog.slug)}
                />
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center gap-2 bg-[#00B46A] text-white px-8 py-3 sm:py-4 rounded-lg font-semibold text-lg sm:text-xl hover:bg-[#008a52] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#00B46A]/30"
            aria-label="Read more AI development blogs"
          >
            Read more blogs
          </button>
        </div>
      </div>
    </section>
  );
}

interface BlogCardProps {
  blog: BlogWithCategory;
  onClick: () => void;
}

function BlogCard({ blog, onClick }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      className="group relative cursor-pointer transition-all duration-500 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Read ${blog.title} blog post`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative bg-white dark:bg-gray-900 overflow-hidden rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-500 h-[400px] sm:h-[420px] shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col">

        <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"></div>

          <img
            src={blog.featured_image_url}
            alt={blog.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="flex-1 p-5 sm:p-6 flex flex-col">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-[16px] sm:text-lg text-gray-600 dark:text-gray-400 line-clamp-2 flex-1 mb-3">
            {blog.excerpt}
          </p>
          <p className="text-[14px] text-gray-500 dark:text-gray-500 font-medium">
            {formatPublishedDate(blog.published_at)}
          </p>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform origin-left transition-transform duration-700 ${
            isHovered ? 'scale-x-100' : 'scale-x-0'
          }`}
        ></div>
      </div>
    </article>
  );
}
