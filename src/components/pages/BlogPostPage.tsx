import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Image } from '@/components/ui/image';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPosts | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        const foundPost = items.find((p) => p.slug === slug || p._id === slug);
        setPost(foundPost || null);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="font-paragraph text-foreground/60">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <Link to="/blog">
            <Button
              variant="ghost"
              className="text-neon-purple hover:text-neon-purple/80 hover:bg-neon-purple/10 font-paragraph mb-8"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Blog
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-foreground/70 font-paragraph text-sm">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
              )}
              {post.publicationDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(post.publicationDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="w-full bg-background py-12">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-lg overflow-hidden border border-neon-purple/20"
            >
              <Image
                src={post.featuredImage}
                alt={post.title || 'Blog post image'}
                width={1600}
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Post Content */}
      <section className="w-full bg-primary py-16">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              <div className="font-paragraph text-base text-foreground/80 whitespace-pre-line leading-relaxed">
                {post.content}
              </div>
            </motion.div>

            {/* SEO Description */}
            {post.seoDescription && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-12 bg-background border border-neon-purple/20 rounded-lg p-8"
              >
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  Summary
                </h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  {post.seoDescription}
                </p>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-12 text-center"
            >
              <p className="font-paragraph text-base text-foreground/80 mb-6">
                Interested in our services? Let's work together!
              </p>
              <Link to="/contact">
                <Button className="bg-neon-purple hover:bg-neon-purple/90 text-primary-foreground font-paragraph px-8 py-6 rounded-lg">
                  Get In Touch
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
