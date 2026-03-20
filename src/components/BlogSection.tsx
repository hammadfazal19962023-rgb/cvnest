import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts, getRelativeDate } from "../data/blogPosts";

const BlogSection = () => {
    const navigate = useNavigate();
    
    // Get first 4 posts for the homepage section
    const postsWithDates = blogPosts.slice(0, 4).map(post => ({
        ...post,
        date: getRelativeDate(post.daysAgo)
    }));

    return (
        <div className="bg-white/30 backdrop-blur-sm py-16">
            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 1, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-black mb-4">
                            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent hero-gradient-text">
                                AI CV Generator Blog
                            </span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Tips, tricks, and guides to create the perfect resume with AI
                        </p>
                    </motion.div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {postsWithDates.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 1, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
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

                                        <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2">
                                            {post.title}
                                        </h3>

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

                    {/* View All Button */}
                    <motion.div
                        initial={{ opacity: 1, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-center mt-10"
                    >
                        <button
                            onClick={() => navigate("/blog")}
                            className="inline-flex items-center gap-2 text-orange-500 font-medium hover:text-orange-600 transition-colors"
                        >
                            View all articles <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BlogSection;