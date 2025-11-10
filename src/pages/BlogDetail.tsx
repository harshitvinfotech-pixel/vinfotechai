import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
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

        const related = await getRelatedBlogs(data, 3);
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
        <div className="max-w-4xl mx-auto px-6 py-20">
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
        <div className="relative h-[350px] sm:h-[60vh] sm:min-h-[400px] sm:max-h-[600px] overflow-hidden">
          <img
            src={blog.featured_image_url}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          <div className="absolute top-6 left-6 sm:left-8 lg:left-12">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-white hover:text-[#00FFB2] transition-colors duration-300 group"
            >
              <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-semibold">Back to All Blogs</span>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-700 dark:text-gray-300 mb-12">
            <div className="flex items-center gap-3">
              {blog.author_avatar_url ? (
                <img
                  src={blog.author_avatar_url}
                  alt={blog.author_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center border-2 border-gray-300 dark:border-gray-700">
                  <User size={20} className="text-white" />
                </div>
              )}
              <span className="font-semibold text-xl">{blog.author_name}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span className="text-lg">{formatPublishedDate(blog.published_at)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span className="text-lg">{formatReadingTime(blog.reading_time_minutes)}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 sm:p-12 md:p-16 mb-16">
            <div className="blog-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-base font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {relatedBlogs.length > 0 && (
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    to={`/blogs/${relatedBlog.slug}`}
                    className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedBlog.featured_image_url}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                      {relatedBlog.category && (
                        <div className="absolute top-3 left-3">
                          <span
                            className="inline-block px-2 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm"
                            style={{ backgroundColor: `${relatedBlog.category.color}CC` }}
                          >
                            {relatedBlog.category.name}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#00B46A] dark:group-hover:text-[#00FFB2] transition-colors duration-300">
                        {relatedBlog.title}
                      </h3>

                      <p className="text-base text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {relatedBlog.excerpt}
                      </p>

                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{formatReadingTime(relatedBlog.reading_time_minutes)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
