import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Helper function to get relative dates
const getRelativeDate = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

// SEO-optimized blog posts with relevant keywords
const blogPosts = [
    {
        id: 1,
        title: "AI CV Generator: How to Create a Professional Resume in Minutes",
        excerpt: "Discover how our free AI CV generator transforms your LinkedIn profile into a polished, ATS-friendly resume. No design skills needed!",
        content: `Looking for a free AI CV generator that actually understands what recruiters want? You've found it. Our AI-powered platform takes the hassle out of resume creation.

Why job seekers love our AI CV generator:
• One-click LinkedIn import – no more manual data entry
• Smart keyword optimization for ATS (Applicant Tracking Systems)
• Professional templates that pass recruiter scrutiny
• Real-time editing and instant PDF download

The traditional way of building a CV is dead. Hours of formatting, worrying about the right words, and second-guessing your achievements? Not anymore. Our AI CV generator analyzes your experience and suggests powerful, action-oriented bullet points that make you stand out.

Whether you're a fresh graduate or a seasoned executive, our tool adapts to your needs. Just upload your LinkedIn profile or enter your details manually, pick a template, and let our AI work its magic. In minutes, you'll have a professional CV ready for download.`,
        image: "🤖",
        daysAgo: 2,
        readTime: "5 min read",
        category: "AI CV Generator",
        slug: "ai-cv-generator-professional-resume",
        author: "Alex Chen",
        authorRole: "AI Specialist"
    },
    {
        id: 2,
        title: "LinkedIn to PDF Resume: The Fastest Way to Update Your CV",
        excerpt: "Convert your LinkedIn profile to a beautiful PDF resume with one click. Our AI CV generator does the formatting so you don't have to.",
        content: `Your LinkedIn profile is already a perfect summary of your career. Why start from scratch? Our LinkedIn to PDF resume converter saves you hours of work.

The magic behind our LinkedIn to CV converter:
1. Securely imports your work history, education, and skills
2. AI analyzes and enhances your achievements
3. Automatically formats everything into a professional template
4. Generates a clean, ATS-friendly PDF
5. Lets you edit and customize before download

No more copying and pasting between platforms. No more worrying about formatting. Just click, customize, and download your PDF CV. It's that simple.

Perfect for:
• Quick job applications when you need a resume fast
• Keeping your CV in sync with your LinkedIn profile
• Creating multiple versions for different job types
• Students and fresh graduates building their first CV`,
        image: "🌟",
        daysAgo: 5,
        readTime: "4 min read",
        category: "LinkedIn to CV",
        slug: "linkedin-to-pdf-resume-converter",
        author: "Sarah Johnson",
        authorRole: "Career Coach"
    },
    {
        id: 3,
        title: "Free Resume Builder with AI: Stop Paying for Templates",
        excerpt: "Why pay for expensive templates when our free AI resume builder does it all? From LinkedIn import to PDF download – completely free.",
        content: `Tired of resume builders that promise 'free' but hide everything behind paywalls? Same. That's why we built something different – a completely free resume builder with AI that actually helps.

What you get with our free AI CV generator:
• All templates – absolutely free
• LinkedIn import – no premium version needed
• AI-powered content suggestions – included for everyone
• PDF downloads – yes, also free
• Unlimited edits and revisions – you guessed it, free

We believe career tools should be accessible to everyone. Whether you're applying for your first job or your tenth, you shouldn't have to pay to look professional. Our AI resume builder is and will always be free.

Features you'll love:
• Smart bullet point generator
• ATS keyword optimizer
• Multiple format exports (PDF, DOCX, TXT)
• Real-time preview
• Mobile-friendly editor`,
        image: "⚡",
        daysAgo: 7,
        readTime: "6 min read",
        category: "Free Resume Builder",
        slug: "free-ai-resume-builder",
        author: "Mike Rodriguez",
        authorRole: "Product Manager"
    },
    {
        id: 4,
        title: "ATS-Friendly Resume Templates That Actually Get You Hired",
        excerpt: "Your resume might be getting rejected by robots. Here's how our AI CV generator creates ATS-optimized resumes that humans love too.",
        content: `Did you know that 75% of resumes never get seen by human eyes? They're filtered out by Applicant Tracking Systems (ATS) before reaching a recruiter. Our AI CV generator ensures yours makes the cut.

What makes a resume ATS-friendly:
• Clean, parseable formatting (no fancy columns or graphics)
• Standard section headings (Experience, Education, Skills)
• Keyword optimization based on job descriptions
• Machine-readable file formats
• No embedded tables or text boxes

Our AI CV generator understands these requirements. It creates resumes that robots can read and humans enjoy. The best part? You don't need to understand ATS algorithms – our AI handles it all.

Plus, our templates are:
• Professionally designed
• Customizable to your industry
• Mobile responsive
• Print-ready
• Compatible with all major ATS platforms`,
        image: "🎨",
        daysAgo: 12,
        readTime: "7 min read",
        category: "ATS Templates",
        slug: "ats-friendly-resume-templates",
        author: "Emily Park",
        authorRole: "Design Lead"
    },
    {
        id: 5,
        title: "Edit and Download PDF CV: Complete Guide to Perfecting Your Resume",
        excerpt: "Learn how to make last-minute tweaks and download your polished PDF CV in seconds with our AI editor.",
        content: `Creating your CV is just the first step. Perfecting it is where our AI editor really shines. Here's how to make the most of our edit and download PDF CV features.

Real-time editing features:
• Click any section to edit – instant updates
• AI suggests better phrasing as you type
• Drag and drop to reorder sections
• One-click formatting fixes
• Live preview of your PDF download

Before you download your PDF CV, our AI checks for:
• Spelling and grammar errors
• Consistent formatting
• Strong action verbs
• Quantifiable achievements
• Proper contact information

Then, with one click, you can:
• Download as PDF (perfect for applications)
• Export as DOCX (for last-minute tweaks)
• Save as TXT (for online forms)
• Share a link (for quick reviews)

No more export errors or formatting nightmares. Just clean, professional PDFs every time.`,
        image: "📝",
        daysAgo: 15,
        readTime: "5 min read",
        category: "PDF CV",
        slug: "edit-download-pdf-cv",
        author: "David Kim",
        authorRole: "Product Designer"
    },
    {
        id: 6,
        title: "Best AI Resume Writer: Why Thousands Choose Our Generator",
        excerpt: "Compare features and see why our AI resume writer outperforms the competition – and why it's completely free.",
        content: `With so many AI resume writers out there, why do thousands of job seekers choose ours? The answer is simple: we combine powerful AI with genuine free access.

What makes our AI resume writer the best choice:
• More accurate LinkedIn parsing than competitors
• Better content suggestions trained on successful resumes
• Wider template selection without paywalls
• Faster PDF generation
• No hidden costs or premium tiers

Real results from our users:
• 3x faster resume creation
• 40% more interview calls
• 100% satisfaction with template quality
• Zero cost for premium features

Whether you're comparing against paid tools or other free options, our AI CV generator delivers professional results without the professional price tag. Try it yourself and see the difference.`,
        image: "🏆",
        daysAgo: 20,
        readTime: "6 min read",
        category: "AI Resume Writer",
        slug: "best-ai-resume-writer",
        author: "Lisa Chen",
        authorRole: "User Research Lead"
    }
];

// Add dates to posts
const postsWithDates = blogPosts.map(post => ({
    ...post,
    date: getRelativeDate(post.daysAgo)
}));

const BlogSection = () => {
    const navigate = useNavigate();
    const [selectedPost, setSelectedPost] = useState<typeof postsWithDates[0] | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleReadAllClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate("/blog");
    };

    const handleReadMore = (post: typeof postsWithDates[0]) => {
        setSelectedPost(post);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedPost(null);
    };

    return (
        <>
            <div className="bg-white/30 backdrop-blur-sm py-16">
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Section Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-black mb-4">
                                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
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
                                <BlogCard
                                    key={post.id}
                                    post={post}
                                    index={index}
                                    onReadMore={() => handleReadMore(post)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Post Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    {selectedPost && (
                        <>
                            <DialogHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-4xl bg-gradient-to-br from-orange-100 to-pink-100 w-12 h-12 rounded-xl flex items-center justify-center">
                                        {selectedPost.image}
                                    </span>
                                    <div>
                                        <DialogTitle className="text-xl font-bold text-slate-800">
                                            {selectedPost.title}
                                        </DialogTitle>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-medium bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                                                {selectedPost.category}
                                            </span>
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {selectedPost.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </DialogHeader>

                            <div className="mt-4 space-y-4">
                                {/* Author Info */}
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                                        {selectedPost.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800">{selectedPost.author}</p>
                                        <p className="text-xs text-slate-500">{selectedPost.authorRole}</p>
                                    </div>
                                    <div className="ml-auto text-xs text-slate-400 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {selectedPost.date}
                                    </div>
                                </div>

                                {/* Blog Content */}
                                <div className="prose prose-sm max-w-none">
                                    <p className="text-slate-600 italic border-l-4 border-orange-200 pl-4 py-1">
                                        {selectedPost.excerpt}
                                    </p>
                                    <div className="mt-4 space-y-4 text-slate-700">
                                        {selectedPost.content.split('\n\n').map((paragraph, idx) => {
                                            if (paragraph.includes('•')) {
                                                return (
                                                    <ul key={idx} className="list-disc pl-5 space-y-1">
                                                        {paragraph.split('\n').map((item, itemIdx) => {
                                                            if (item.trim().startsWith('•')) {
                                                                return (
                                                                    <li key={itemIdx} className="text-slate-600">
                                                                        {item.replace('•', '').trim()}
                                                                    </li>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </ul>
                                                );
                                            }
                                            if (paragraph.includes('1.')) {
                                                return (
                                                    <ol key={idx} className="list-decimal pl-5 space-y-1">
                                                        {paragraph.split('\n').map((item, itemIdx) => {
                                                            if (item.trim().match(/^\d+\./)) {
                                                                return (
                                                                    <li key={itemIdx} className="text-slate-600">
                                                                        {item.replace(/^\d+\./, '').trim()}
                                                                    </li>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </ol>
                                                );
                                            }
                                            return <p key={idx} className="text-slate-600">{paragraph}</p>;
                                        })}
                                    </div>
                                </div>

                                {/* Close Button */}
                                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-slate-500 hover:text-orange-500"
                                        onClick={handleCloseDialog}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

// Individual Blog Card Component
const BlogCard = ({
    post,
    index,
    onReadMore
}: {
    post: typeof postsWithDates[0];
    index: number;
    onReadMore: () => void;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 border-2 border-orange-100 hover:border-orange-200 transition-all group"
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
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onReadMore();
                            }}
                            className="text-orange-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all hover:text-orange-600"
                        >
                            Read more <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogSection;