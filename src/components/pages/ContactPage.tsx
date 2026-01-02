import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'mustafa39078@gmail.com',
      link: 'mailto:mustafa39078@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+92 3286557992',
      link: 'tel:+92 3286557992',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Remote & Global',
      link: null,
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
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Get In <span className="text-neon-purple">Touch</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80">
              Have a project in mind? Let's collaborate and bring your vision to life. 
              We're here to help you succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-primary border border-neon-purple/20 rounded-lg p-8 md:p-12"
              >
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>

                {isSubmitted && (
                  <div className="bg-neon-purple/20 border border-neon-purple/40 rounded-lg p-4 mb-6">
                    <p className="font-paragraph text-sm text-neon-purple">
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-paragraph text-sm text-foreground/80 mb-2 block">
                        Your Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="bg-background border-neon-purple/20 text-foreground font-paragraph focus:border-neon-purple"
                      />
                    </div>

                    <div>
                      <label className="font-paragraph text-sm text-foreground/80 mb-2 block">
                        Your Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="bg-background border-neon-purple/20 text-foreground font-paragraph focus:border-neon-purple"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-foreground/80 mb-2 block">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Inquiry"
                      className="bg-background border-neon-purple/20 text-foreground font-paragraph focus:border-neon-purple"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-foreground/80 mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project..."
                      className="min-h-[200px] bg-background border-neon-purple/20 text-foreground font-paragraph resize-none focus:border-neon-purple"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-neon-purple hover:bg-neon-purple/90 text-primary-foreground font-paragraph py-6 rounded-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Send className="mr-2 animate-pulse" size={20} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-primary border border-neon-purple/20 rounded-lg p-8 sticky top-24"
              >
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-neon-purple/20 p-3 rounded-lg flex-shrink-0">
                          <Icon className="text-neon-purple" size={20} />
                        </div>
                        <div>
                          <p className="font-paragraph text-xs text-foreground/60 mb-1">
                            {info.title}
                          </p>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="font-paragraph text-sm text-foreground hover:text-neon-purple transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-paragraph text-sm text-foreground">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-neon-purple/20">
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
                    Quick Connect
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/15551234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-neon-purple text-neon-purple hover:bg-neon-purple/10 font-paragraph rounded-lg justify-start"
                      >
                        <MessageCircle className="mr-2" size={18} />
                        WhatsApp
                      </Button>
                    </a>
                    <a
                      href="mailto:hello@codejinx.com"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-neon-purple text-neon-purple hover:bg-neon-purple/10 font-paragraph rounded-lg justify-start"
                      >
                        <Mail className="mr-2" size={18} />
                        Email Us
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Prefer a Different Way to Connect?
            </h2>
            <p className="font-paragraph text-base text-foreground/80 mb-8">
              We're available on multiple platforms to make communication as convenient as possible for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-neon-purple hover:bg-neon-purple/90 text-primary-foreground font-paragraph px-8 py-6 rounded-lg">
                  <MessageCircle className="mr-2" size={20} />
                  Chat on WhatsApp
                </Button>
              </a>
              <a href="mailto:hello@codejinx.com">
                <Button
                  variant="outline"
                  className="border-neon-purple text-neon-purple hover:bg-neon-purple/10 font-paragraph px-8 py-6 rounded-lg"
                >
                  <Mail className="mr-2" size={20} />
                  Send an Email
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
