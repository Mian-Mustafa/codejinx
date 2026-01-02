import { motion } from 'framer-motion';
import { Target, Eye, Zap, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We constantly push boundaries to deliver cutting-edge solutions that exceed expectations.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Quality is at the heart of everything we do, from code to customer service.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in working closely with our clients to achieve shared success.',
    },
  ];

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
              About <span className="text-neon-purple">Codejinx</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80">
              We are a multidisciplinary creative team dedicated to transforming ideas into 
              digital excellence through innovation, expertise, and passion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our <span className="text-neon-purple">Story</span>
              </h2>
              <div className="space-y-4 font-paragraph text-base text-foreground/80">
                <p>
                  Codejinx was born from a simple yet powerful vision: to bridge the gap between 
                  complex technology and everyday users. We started as a small team of passionate 
                  developers and designers who believed that digital solutions should be accessible, 
                  innovative, and impactful.
                </p>
                <p>
                  Today, we've grown into a multidisciplinary creative powerhouse, serving clients 
                  across various industries while maintaining our commitment to excellence and 
                  innovation. Our diverse portfolio spans web development, content creation, 
                  video production, and educational tools.
                </p>
                <p>
                  What sets us apart is our ability to adapt our presentation and approach to 
                  different types of work, providing industry-specific context and highlighting 
                  transferable skills that demonstrate our versatility across creative fields.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-neon-purple/20 to-transparent border border-neon-purple/30 rounded-lg p-12 lg:p-16"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-6xl font-bold text-neon-purple mb-2">500+</h3>
                  <p className="font-paragraph text-base text-foreground/70">Projects Completed</p>
                </div>
                <div>
                  <h3 className="font-heading text-6xl font-bold text-neon-purple mb-2">200+</h3>
                  <p className="font-paragraph text-base text-foreground/70">Happy Clients</p>
                </div>
                <div>
                  <h3 className="font-heading text-6xl font-bold text-neon-purple mb-2">5+</h3>
                  <p className="font-paragraph text-base text-foreground/70">Years of Excellence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full bg-primary py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background border border-neon-purple/20 rounded-lg p-8 md:p-12"
            >
              <div className="bg-neon-purple/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Target className="text-neon-purple" size={32} />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="font-paragraph text-base text-foreground/80">
                To empower businesses and students with innovative digital solutions that simplify 
                complexity, enhance productivity, and drive success. We strive to make technology 
                accessible and impactful for everyone, regardless of their technical background.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-background border border-neon-purple/20 rounded-lg p-8 md:p-12"
            >
              <div className="bg-neon-purple/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Eye className="text-neon-purple" size={32} />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <p className="font-paragraph text-base text-foreground/80">
                To become the leading multidisciplinary creative agency recognized for our ability 
                to seamlessly adapt across industries, deliver exceptional results, and foster 
                long-term partnerships built on trust, innovation, and mutual growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-neon-purple">Values</span>
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-primary border border-neon-purple/20 rounded-lg p-8 text-center hover:border-neon-purple transition-all duration-300"
                >
                  <div className="bg-neon-purple/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-neon-purple" size={32} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="font-paragraph text-sm text-foreground/70">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-primary py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet the <span className="text-neon-purple">Team</span>
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto mb-12">
              Our diverse team of experts brings together years of experience across multiple 
              disciplines, united by a shared passion for innovation and excellence.
            </p>
            <div className="bg-background border border-neon-purple/20 rounded-lg p-12 max-w-2xl mx-auto">
              <p className="font-paragraph text-base text-foreground/80 mb-4">
                Designed and crafted with precision by <span className="text-neon-purple font-semibold">Knox</span>
              </p>
              <p className="font-paragraph text-sm text-foreground/60">
                Lead Designer & Creative Director
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
