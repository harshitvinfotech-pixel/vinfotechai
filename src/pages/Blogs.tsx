import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getPublishedBlogs, formatPublishedDate, formatReadingTime } from '../lib/blogs';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import type { BlogWithCategory } from '../types/blog';

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogWithCategory[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const headerVisible = useScrollTrigger(headerRef, { threshold: 0.3 });
  const featuredVisible = useScrollTrigger(featuredRef, { threshold: 0.2 });

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const response = await getPublishedBlogs({
          page: 1,
          pageSize: 50,
          searchQuery: searchQuery || undefined,
        });
        setBlogs(response.blogs);
        // Get first 3 blogs as featured
        setFeaturedBlogs(response.blogs.slice(0, 3));
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredBlogs.length);
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length);
  };

  const filteredBlogs = searchQuery
    ? blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogs;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header onQuoteClick={() => {}} />

      {/* Hero Section */}
      <div
        ref={headerRef}
        className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 sm:py-20 md:py-24 px-6 sm:px-8 lg:px-12 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,106,0.08),transparent_70%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <div
            className={`transition-all duration-1000 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
              Our Blog
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 leading-relaxed max-w-4xl mx-auto">
              Insights, trends, and innovations in AI and technology
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  size={22}
                />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 sm:py-5 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B46A] focus:border-transparent transition-all shadow-lg"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Featured Blogs Carousel */}
      {!loading && featuredBlogs.length > 0 && (
        <div
          ref={featuredRef}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20"
        >
          <div
            className={`transition-all duration-1000 ${
              featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">
              Featured Articles
            </h2>

            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${currentFeaturedIndex * 100}%)` }}
                >
                  {featuredBlogs.map((blog) => (
                    <div key={blog.id} className="w-full flex-shrink-0">
                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="group block bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                          {/* Image Section */}
                          <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden">
                            <img
                              src={blog.featured_image_url}
                              alt={blog.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="eager"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:bg-gradient-to-r"></div>
                          </div>

                          {/* Content Section */}
                          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight group-hover:text-[#00B46A] dark:group-hover:text-[#00FFB2] transition-colors duration-300">
                              {blog.title}
                            </h3>

                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed line-clamp-3">
                              {blog.excerpt}
                            </p>

                            <div className="flex items-center gap-6 text-base text-gray-500 dark:text-gray-500">
                              <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>{formatPublishedDate(blog.published_at)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock size={18} />
                                <span>{formatReadingTime(blog.reading_time_minutes)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {featuredBlogs.length > 1 && (
                <>
                  <button
                    onClick={prevFeatured}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] z-10"
                  >
                    <ChevronLeft size={24} className="text-gray-900 dark:text-white" />
                  </button>
                  <button
                    onClick={nextFeatured}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] z-10"
                  >
                    <ChevronRight size={24} className="text-gray-900 dark:text-white" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-6">
                    {featuredBlogs.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFeaturedIndex(index)}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentFeaturedIndex
                            ? 'w-12 h-3 bg-[#00B46A]'
                            : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* All Blog Posts */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">
          All Articles
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-[450px] animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              No blog posts found
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Try adjusting your search query
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.slice(3).map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

interface BlogCardProps {
  blog: BlogWithCategory;
  index: number;
}

function BlogCard({ blog, index }: BlogCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isVisible = useScrollTrigger(cardRef, { threshold: 0.2 });

  return (
    <Link
      ref={cardRef}
      to={`/blogs/${blog.slug}`}
      className={`group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
      }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={blog.featured_image_url}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-[#00B46A] dark:group-hover:text-[#00FFB2] transition-colors duration-300">
          {blog.title}
        </h3>

        <p className="text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
          <Calendar size={16} />
          <span>{formatPublishedDate(blog.published_at)}</span>
        </div>
      </div>
    </Link>
  );
}
