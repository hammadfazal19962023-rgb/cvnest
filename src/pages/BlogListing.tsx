import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts, getRelativeDate } from "@/data/blogPosts";

const BlogListing = () => {
  const navigate = useNavigate();
  
  const postsWithDates = blogPosts.map(post => ({
    ...post,
    date: getRelativeDate(post.daysAgo)
  }));

  return (
    <div className="min-h-screen bg-white/30 backdrop-blur-sm py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-slate-500 hover:text-orange-500 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent hero-gradient-text">
                AI CV Generator Blog
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tips, tricks, and guides to create the perfect resume with AI
            </p>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {postsWithDates.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-orange-100 hover:border-orange-200 transition-all cursor-pointer group"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <div className="flex items-start gap-4">
                  {/* Emoji/Image Container */}
                  <div className="text-5xl bg-gradient-to-br from-orange-100 to-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {post.image}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                      <span className="text-orange-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListing;