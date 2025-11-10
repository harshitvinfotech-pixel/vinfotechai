import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Search, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getPublishedBlogs, formatPublishedDate, formatReadingTime } from '../lib/blogs';
import type { BlogWithCategory } from '../types/blog';

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const response = await getPublishedBlogs({
          page: currentPage,
          pageSize,
          searchQuery: searchQuery || undefined,
        });
        setBlogs(response.blogs);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, [currentPage, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const featuredBlog = blogs[0];
  const regularBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onQuoteClick={() => {}} />

      <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.15]">
          <div className="absolute top-10 left-[10%] w-[500px] h-[500px] bg-[#00B46A]/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-20 right-[15%] w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 left-[60%] w-[350px] h-[350px] bg-emerald-400/20 rounded-full blur-[90px] animate-pulse" style={{animationDelay: '2s'}}></div>

          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-800" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00B46A]"></div>
            <Sparkles className="text-[#00B46A]" size={22} />
            <span className="text-[#00B46A] font-bold text-sm tracking-[0.2em] uppercase">Latest Insights</span>
            <Sparkles className="text-[#00B46A]" size={22} />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00B46A]"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 text-center leading-[1.1]">
            Discover Our{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#00B46A] via-[#00C87A] to-[#00D47F] bg-clip-text text-transparent">
                Latest Stories
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00B46A]/10 to-[#00D47F]/10 blur-xl rounded-lg"></div>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 text-center max-w-3xl mx-auto leading-relaxed font-light">
            Explore cutting-edge insights on AI innovation, technical breakthroughs, and transformative technology shaping tomorrow
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00B46A] to-[#00D47F] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#00B46A] transition-colors" size={22} />
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#00B46A] focus:ring-4 focus:ring-[#00B46A]/10 transition-all shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {loading ? (
          <div className="space-y-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl h-[500px] animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-3xl h-[450px] animate-pulse"></div>
              ))}
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#00B46A]/20 to-[#00D47F]/20 mb-6">
              <Search size={48} className="text-[#00B46A]" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">No blogs found</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              We couldn't find any posts matching your criteria. Try different filters or keywords.
            </p>
          </div>
        ) : (
          <>
            {featuredBlog && (
              <div className="mb-16">
                <Link
                  to={`/blogs/${featuredBlog.slug}`}
                  className="group block"
                >
                  <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-[3/2]">
                      <img
                        src={featuredBlog.featured_image_url}
                        alt={featuredBlog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-[#00B46A] transition-colors duration-300">
                        {featuredBlog.title}
                      </h2>

                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-2">
                        {featuredBlog.excerpt}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{formatPublishedDate(featuredBlog.published_at)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{formatReadingTime(featuredBlog.reading_time_minutes)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {regularBlogs.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">All Blogs</h2>
                  <div className="h-1 flex-1 ml-8 bg-gradient-to-r from-[#00B46A]/30 to-transparent rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularBlogs.map((blog, index) => (
                    <Link
                      key={blog.id}
                      to={`/blogs/${blog.slug}`}
                      className="group block relative"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] h-full flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00B46A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={blog.featured_image_url}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-[#00B46A]/20 transition-all duration-500"></div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-[#00B46A] transition-colors duration-300 line-clamp-2">
                            {blog.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-grow group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                            {blog.excerpt}
                          </p>

                          <div className="mt-auto space-y-4">
                            <div className="flex items-center gap-2 text-[#00B46A] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                              <span>Read More</span>
                              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </div>

                            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm pt-4 border-t border-gray-200 dark:border-gray-700 group-hover:border-[#00B46A]/30 transition-colors duration-300">
                              <div className="flex items-center gap-2 group-hover:text-[#00B46A] transition-colors duration-300">
                                <Calendar size={16} className="flex-shrink-0" />
                                <span className="font-medium">{formatPublishedDate(blog.published_at)}</span>
                              </div>
                              <div className="flex items-center gap-2 group-hover:text-[#00B46A] transition-colors duration-300">
                                <Clock size={16} className="flex-shrink-0" />
                                <span className="font-medium">{formatReadingTime(blog.reading_time_minutes)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 pt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#00B46A] hover:text-[#00B46A] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let page;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-12 h-12 px-4 rounded-xl font-bold transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-[#00B46A] to-[#00D47F] text-white shadow-lg shadow-[#00B46A]/30 scale-110'
                            : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#00B46A] hover:text-[#00B46A] hover:scale-105'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#00B46A] hover:text-[#00B46A] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
