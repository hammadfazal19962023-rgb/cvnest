import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, User, Tag, Share2 } from "lucide-react";
import { blogPosts, getRelativeDate } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 bg-gradient-custom py-20">
        <div className="container mx-auto px-4 max-w-4xl main-gradient-bg">
          <button
            onClick={() => navigate("/blog")}
            className="mb-6 flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Blog</span>
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-6">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <button
              onClick={() => navigate("/blog")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all hover:scale-105"
            >
              Return to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const date = getRelativeDate(post.daysAgo);

  // Function to parse content with headings and lists
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: 'ul' | 'ol' | null = null;
    let listItems: string[] = [];

    const flushList = (key: string | number) => {
      if (currentList && listItems.length > 0) {
        elements.push(
          <div key={key} className="mb-6">
            {currentList === 'ul' ? (
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {listItems.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            ) : (
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                {listItems.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ol>
            )}
          </div>
        );
        listItems = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Handle headings (##)
      if (trimmedLine.startsWith('##')) {
        // Flush any pending list
        flushList(`list-flush-${index}`);
        currentList = null;

        // Render heading with proper styling
        const headingText = trimmedLine.replace(/^##\s*/, '');
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-orange-100 ">
            {headingText}
          </h2>
        );
      }

      // Handle bullet points
      else if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
        if (currentList !== 'ul') {
          flushList(`list-flush-${index}`);
          currentList = 'ul';
        }
        const itemText = trimmedLine.replace(/^[•-]\s*/, '');
        listItems.push(itemText);
      }

      // Handle numbered lists
      else if (trimmedLine.match(/^\d+\./)) {
        if (currentList !== 'ol') {
          flushList(`list-flush-${index}`);
          currentList = 'ol';
        }
        const itemText = trimmedLine.replace(/^\d+\.\s*/, '');
        listItems.push(itemText);
      }

      // Handle regular paragraphs
      else if (trimmedLine) {
        // Flush any pending list
        flushList(`list-flush-${index}`);
        currentList = null;

        // Check if it might be a subheading or important text
        if (trimmedLine.length < 100 && trimmedLine.endsWith(':')) {
          elements.push(
            <p key={`p-${index}`} className="text-gray-800 font-semibold mt-4 mb-2">
              {trimmedLine}
            </p>
          );
        } else {
          elements.push(
            <p key={`p-${index}`} className="text-gray-700 leading-relaxed mb-4">
              {trimmedLine}
            </p>
          );
        }
      }
    });

    // Flush any remaining list
    flushList('list-final');

    return elements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 bg-gradient-custom">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hero-gradient-text font-heading text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              CV Nest
            </span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center gap-6">
          {/* Left Ad Space */}
          {/* <div className="hidden lg:block w-40 flex-shrink-0 sticky top-24 self-start">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 text-center border border-orange-100">
              <div className="text-xs text-gray-400 mb-2">Advertisement</div>
              <div className="w-full h-60 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Ad Space</span>
              </div>
            </div>
          </div> */}

          {/* Main Content */}
          <div className="w-full max-w-3xl">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Featured Image/Icon */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-8 flex items-center justify-center border-b border-orange-100">
                <span className="text-8xl" role="img" aria-label="Blog post icon">
                  {post.image}
                </span>
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-8 lg:p-10">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700">
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {date}
                  </span>
                </div>

                {/* Title */}
                <h1 className="hero-gradient-text text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  {post.title}
                </h1>

                {/* Author Information */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-orange-100">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {post.author.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-lg">
                      {post.author}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {post.authorRole}
                    </p>
                  </div>
                </div>

                {/* Excerpt - Highlighted Section */}
                <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 mb-8 border-l-4 border-orange-500">
                  <p className="text-lg text-gray-700 italic leading-relaxed">
                    "{post.excerpt}"
                  </p>
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 space-y-4">
                    {renderContent(post.content)}
                  </div>
                </div>

                {/* Share Section */}
                {/* <div className="mt-10 pt-6 border-t border-orange-100">
                  <p className="text-sm font-medium text-gray-600 mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share this article:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors hover:scale-105 transform transition-all"
                      aria-label="Share on Twitter"
                    >
                      Twitter
                    </button>
                    <button
                      className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors hover:scale-105 transform transition-all"
                      aria-label="Share on LinkedIn"
                    >
                      LinkedIn
                    </button>
                    <button
                      className="px-4 py-2 bg-[#4267B2] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors hover:scale-105 transform transition-all"
                      aria-label="Share on Facebook"
                    >
                      Facebook
                    </button>
                  </div>
                </div> */}

                {/* Article Schema Markup */}
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.title,
                    "description": post.excerpt,
                    "author": {
                      "@type": "Person",
                      "name": post.author
                    },
                    "datePublished": new Date(Date.now() - post.daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    "articleSection": post.category,
                    "timeRequired": post.readTime
                  })}
                </script>
              </div>
            </motion.article>
          </div>

          {/* Right Ad Space */}
          {/* <div className="hidden lg:block w-40 flex-shrink-0 sticky top-24 self-start">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 text-center border border-orange-100">
              <div className="text-xs text-gray-400 mb-2">Advertisement</div>
              <div className="w-full h-60 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Ad Space</span>
              </div>
            </div>
          </div> */}
        </div>
      </main>
      <footer className="relative main-gradient-bg bg-gradient-to-r from-orange-50/80 via-yellow-50/80 to-pink-50/80 border-t-2 border-orange-100 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} CV Nest. Free forever.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;