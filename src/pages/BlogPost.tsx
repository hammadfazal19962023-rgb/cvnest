import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts, getRelativeDate } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return (
      <main className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Button onClick={() => navigate("/blog")} className="bg-blue-600 hover:bg-blue-700 text-white">
              Return to Blog
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const date = getRelativeDate(post.daysAgo);

  // Function to parse content with headings and lists
  const renderContent = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let currentList = null;
    let listItems = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Handle headings (##)
      if (trimmedLine.startsWith('##')) {
        // Flush any pending list
        if (currentList) {
          elements.push(
            <div key={`list-${index}`} className="mb-6">
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
          currentList = null;
          listItems = [];
        }

        // Render heading with proper styling
        const headingText = trimmedLine.replace(/^##\s*/, '');
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
            {headingText}
          </h2>
        );
      }
      
      // Handle bullet points
      else if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
        if (currentList !== 'ul') {
          // Flush previous list if type changes
          if (currentList && listItems.length > 0) {
            elements.push(
              <div key={`list-${index}`} className="mb-6">
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
          currentList = 'ul';
        }
        const itemText = trimmedLine.replace(/^[•-]\s*/, '');
        listItems.push(itemText);
      }
      
      // Handle numbered lists
      else if (trimmedLine.match(/^\d+\./)) {
        if (currentList !== 'ol') {
          // Flush previous list if type changes
          if (currentList && listItems.length > 0) {
            elements.push(
              <div key={`list-${index}`} className="mb-6">
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
          currentList = 'ol';
        }
        const itemText = trimmedLine.replace(/^\d+\.\s*/, '');
        listItems.push(itemText);
      }
      
      // Handle regular paragraphs
      else if (trimmedLine) {
        // Flush any pending list
        if (currentList) {
          elements.push(
            <div key={`list-${index}`} className="mb-6">
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
          currentList = null;
          listItems = [];
        }

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
    if (currentList && listItems.length > 0) {
      elements.push(
        <div key="list-final" className="mb-6">
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
    }

    return elements;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2 px-0"
            >
              <ArrowLeft className="w-4 h-4" /> 
              <span>Back to Blog</span>
            </Button>
          </motion.div>

          {/* Blog Post Content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {/* Featured Image/Icon */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 flex items-center justify-center">
              <span className="text-8xl" role="img" aria-label="Blog post icon">
                {post.image}
              </span>
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8 lg:p-10">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author Information */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {post.author.charAt(0)}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-lg">
                    {post.author}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {post.authorRole}
                  </p>
                </div>
              </div>

              {/* Excerpt - Highlighted Section */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8 border-l-4 border-blue-500">
                <p className="text-lg text-gray-800 italic leading-relaxed">
                  "{post.excerpt}"
                </p>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 space-y-4">
                  {renderContent(post.content)}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Share this article:
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    Twitter
                  </button>
                  <button 
                    className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    LinkedIn
                  </button>
                  <button 
                    className="px-4 py-2 bg-[#4267B2] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    Facebook
                  </button>
                </div>
              </div>

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
      </div>
    </main>
  );
};

export default BlogPost;