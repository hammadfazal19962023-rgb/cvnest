import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { blogPosts, getRelativeDate } from "@/data/blogPosts";

const BlogListing = () => {
  const navigate = useNavigate();

  const postsWithDates = blogPosts.map(post => ({
    ...post,
    date: getRelativeDate(post.daysAgo)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 bg-gradient-custom ">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/")}
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
          <div className="w-full max-w-4xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                <span className="hero-gradient-text bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
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
                  className="bg-white rounded-2xl shadow-xl p-6 border border-orange-100 hover:shadow-2xl transition-all cursor-pointer group hover:border-orange-200"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  <div className="flex items-start gap-4">
                    {/* Emoji/Image Container */}
                    <div className="text-5xl bg-gradient-to-br from-orange-100 to-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      {post.image}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-medium bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                      </div>

                      <h2 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
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

export default BlogListing;