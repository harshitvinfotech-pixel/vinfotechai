import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, BookmarkPlus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { getBlogBySlug, getRelatedBlogs, formatPublishedDate, formatReadingTime } from '../lib/blogs';
import type { BlogWithCategory } from '../types/blog';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogWithCategory | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBackClick = () => {
    navigate('/blogs');
  };

  useEffect(() => {
    async function loadBlog() {
      if (!slug) return;

      setLoading(true);
      try {
        const data = await getBlogBySlug(slug);
        if (!data) {
          navigate('/blogs');
          return;
        }
        setBlog(data);

        const related = await getRelatedBlogs(data, 1);
        setRelatedBlogs(related);
      } catch (error) {
        console.error('Error loading blog:', error);
        navigate('/blogs');
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [slug, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header onQuoteClick={() => {}} />
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse mb-8"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <>
      <PageMeta
        title={blog.title}
        description={blog.excerpt}
        keywords={blog.tags?.join(', ')}
        ogImage={blog.featured_image_url}
      />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header onQuoteClick={() => {}} />

      <article className="relative pt-20">
        <div className="relative">
          <div className="absolute top-4 left-0 right-0 z-40">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pl-[10px] md:pl-0">
              <button
                onClick={handleBackClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 group border border-white/20"
              >
                <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="font-semibold text-sm md:text-base">Back</span>
              </button>
            </div>
          </div>

          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <img
              src={blog.featured_image_url}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto -mt-12 sm:-mt-16 md:-mt-20 relative z-10">
          <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 lg:p-12 mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-3 sm:gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2 sm:gap-3">
                {blog.author_avatar_url ? (
                  <img
                    src={blog.author_avatar_url}
                    alt={blog.author_name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-[#00B46A]/30"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-2 ring-[#00B46A]/30">
                    <User size={18} className="sm:w-5 sm:h-5 text-white" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Vinfotech Team</p>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" />
                      <span>{formatPublishedDate(blog.published_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pb-12 sm:pb-16 md:pb-20">
            <div className="lg:col-span-8">
              <div className="max-w-none">
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:p-12 shadow-lg">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 mt-6 sm:mt-8" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-[28px] font-bold text-gray-900 dark:text-white mb-4 sm:mb-5 mt-6 sm:mt-8" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 mt-4 sm:mt-6" {...props} />,
                      p: ({node, ...props}) => <p className="text-[20px] text-gray-700 dark:text-gray-300 leading-relaxed mb-[30px]" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc text-[20px] text-gray-700 dark:text-gray-300 space-y-3 mb-[30px] pl-6 sm:pl-8" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal text-[20px] text-gray-700 dark:text-gray-300 space-y-3 mb-[30px] pl-6 sm:pl-8" {...props} />,
                      blockquote: ({node, ...props}) => (
                        <blockquote className="border-l-4 border-[#00B46A] bg-gray-100 dark:bg-gray-700 pl-4 sm:pl-6 py-3 sm:py-4 my-4 sm:my-6 italic text-gray-700 dark:text-gray-300" {...props} />
                      ),
                      img: ({node, ...props}) => (
                        <div className="my-4 sm:my-8 rounded-lg sm:rounded-xl overflow-hidden shadow-xl">
                          <img className="w-full h-auto" {...props} />
                        </div>
                      ),
                      a: ({node, ...props}) => <a className="text-[#00B46A] hover:underline font-medium" {...props} />,
                      code: ({node, inline, ...props}: any) =>
                        inline ? (
                          <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200" {...props} />
                        ) : (
                          <code className="block bg-gray-900 dark:bg-gray-950 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm font-mono my-6" {...props} />
                        ),
                      table: ({node, ...props}) => (
                        <div className="my-8 overflow-x-auto">
                          <table className="w-full border-collapse border-2 border-gray-300 dark:border-gray-600" {...props} />
                        </div>
                      ),
                      thead: ({node, ...props}) => <thead className="bg-gray-100 dark:bg-gray-700" {...props} />,
                      tbody: ({node, ...props}) => <tbody {...props} />,
                      tr: ({node, ...props}) => <tr className="border-b border-gray-300 dark:border-gray-600" {...props} />,
                      th: ({node, ...props}) => <th className="border border-gray-300 dark:border-gray-600 px-6 py-4 text-left font-bold text-gray-900 dark:text-white text-base" {...props} />,
                      td: ({node, ...props}) => <td className="border border-gray-300 dark:border-gray-600 px-6 py-4 text-gray-700 dark:text-gray-300 text-base" {...props} />,
                    }}
                  >
                    {blog.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {relatedBlogs.length > 0 && (
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-24">
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 sm:h-8 bg-[#00B46A] rounded-full"></span>
                      More to Read
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                      {relatedBlogs.map((relatedBlog) => (
                        <Link
                          key={relatedBlog.id}
                          to={`/blogs/${relatedBlog.slug}`}
                          className="group block bg-white dark:bg-gray-700/50 rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        >
                          <div className="relative h-32 sm:h-40 overflow-hidden">
                            <img
                              src={relatedBlog.featured_image_url}
                              alt={relatedBlog.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-3 sm:p-4">
                            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-[#00B46A] dark:group-hover:text-[#00FFB2] transition-colors duration-300">
                              {relatedBlog.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2 sm:mb-3">
                              {relatedBlog.excerpt}
                            </p>
                            <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar size={10} className="sm:w-3 sm:h-3" />
                                <span>{formatPublishedDate(relatedBlog.published_at)}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to="/blogs"
                      className="mt-4 sm:mt-6 block w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#00B46A] to-[#00B46A]/80 text-white text-center font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-[#00B46A]/30 transition-all duration-300"
                    >
                      View All Blogs
                    </Link>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      <Footer />
      </div>
    </>
  );
}
