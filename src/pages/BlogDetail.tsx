import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, BookmarkPlus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getBlogBySlug, getRelatedBlogs, formatPublishedDate, formatReadingTime } from '../lib/blogs';
import type { BlogWithCategory } from '../types/blog';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogWithCategory | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

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

        const related = await getRelatedBlogs(data, 2);
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onQuoteClick={() => {}} />

      <article className="relative pt-20">
        <div className="relative h-[450px] sm:h-[550px] md:h-[650px] overflow-hidden">
          <img
            src={blog.featured_image_url}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          <div className="absolute top-6 left-6 sm:left-8 lg:left-12 z-10">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[#00B46A] transition-all duration-300 group"
            >
              <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-semibold text-sm">Back to Blogs</span>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 -mt-20 relative z-10">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 sm:p-12 mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
                {blog.author_avatar_url ? (
                  <img
                    src={blog.author_avatar_url}
                    alt={blog.author_name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#00B46A]/30"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-2 ring-[#00B46A]/30">
                    <User size={20} className="text-white" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-base text-gray-900 dark:text-white">Vinfotech Team</p>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatPublishedDate(blog.published_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 md:pb-20">
            <div className="lg:col-span-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 sm:p-12 shadow-lg">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-8" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 mt-8" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6" {...props} />,
                      p: ({node, ...props}) => <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-6 ml-4" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-6 ml-4" {...props} />,
                      blockquote: ({node, ...props}) => (
                        <blockquote className="border-l-4 border-[#00B46A] bg-gray-100 dark:bg-gray-800 pl-6 py-4 my-6 italic text-gray-700 dark:text-gray-300" {...props} />
                      ),
                      img: ({node, ...props}) => (
                        <div className="my-8 rounded-xl overflow-hidden shadow-xl">
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
                    }}
                  >
                    {blog.content}
                  </ReactMarkdown>
                </div>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#00B46A] rounded-full"></span>
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-[#00B46A]/10 to-[#00B46A]/5 border border-[#00B46A]/20 text-[#00B46A] dark:text-[#00FFB2] rounded-full text-sm font-semibold hover:from-[#00B46A] hover:to-[#00B46A] hover:text-white transition-all duration-300 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 bg-gradient-to-br from-[#00B46A]/5 to-transparent border border-[#00B46A]/20 dark:border-[#00B46A]/30 rounded-2xl p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {blog.author_avatar_url ? (
                        <img
                          src={blog.author_avatar_url}
                          alt={blog.author_name}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-[#00B46A]/30"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-[#00B46A] flex items-center justify-center ring-2 ring-[#00B46A]/30">
                          <User size={24} className="text-white" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Written by</p>
                        <p className="font-bold text-xl text-gray-900 dark:text-white">Vinfotech Team</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:bg-[#00B46A] hover:text-white transition-all duration-300 group">
                        <Share2 size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-white" />
                      </button>
                      <button className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:bg-[#00B46A] hover:text-white transition-all duration-300 group">
                        <BookmarkPlus size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {relatedBlogs.length > 0 && (
              <aside className="lg:col-span-4">
                <div className="sticky top-24">
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="w-1 h-8 bg-[#00B46A] rounded-full"></span>
                      More to Read
                    </h2>
                    <div className="space-y-6">
                      {relatedBlogs.map((relatedBlog) => (
                        <Link
                          key={relatedBlog.id}
                          to={`/blogs/${relatedBlog.slug}`}
                          className="group block bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        >
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={relatedBlog.featured_image_url}
                              alt={relatedBlog.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-[#00B46A] transition-colors duration-300">
                              {relatedBlog.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                              {relatedBlog.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar size={12} />
                                <span>{formatPublishedDate(relatedBlog.published_at)}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to="/blogs"
                      className="mt-6 block w-full py-3 bg-gradient-to-r from-[#00B46A] to-[#00B46A]/80 text-white text-center font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00B46A]/30 transition-all duration-300"
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
  );
}
