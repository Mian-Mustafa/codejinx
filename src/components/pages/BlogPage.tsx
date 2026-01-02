import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Image } from '@/components/ui/image';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPosts[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      setPosts(items.sort((a, b) => {
        const dateA = a.publicationDate ? new Date(a.publicationDate).getTime() : 0;
        const dateB = b.publicationDate ? new Date(b.publicationDate).getTime() : 0;
        return dateB - dateA;
      }));
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary py-24 lg:py-32">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Our <span className="text-neon-purple">Blog</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80">
              Educational insights, industry trends, and expert tips to help you stay ahead 
              in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-foreground/60">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                >
                  <Link to={`/blog/${post.slug || post._id}`}>
                    <article className="group bg-primary border border-neon-purple/20 rounded-lg overflow-hidden hover:border-neon-purple transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/20 h-full flex flex-col">
                      {post.featuredImage && (
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={post.featuredImage}
                            alt={post.title || 'Blog post image'}
                            width={600}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 mb-4 text-foreground/60 font-paragraph text-xs">
                          {post.author && (
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>{post.author}</span>
                            </div>
                          )}
                          {post.publicationDate && (
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{new Date(post.publicationDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        <h2 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-neon-purple transition-colors">
                          {post.title}
                        </h2>

                        <p className="font-paragraph text-sm text-foreground/70 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="mt-4 text-neon-purple font-paragraph text-sm font-medium">
                          Read More →
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
