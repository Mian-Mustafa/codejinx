import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Services | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (id) {
        const data = await BaseCrudService.getById<Services>('services', id);
        setService(data);
      }
    };

    fetchService();
  }, [id]);

  if (!service) {
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
          <Link to="/services">
            <Button
              variant="ghost"
              className="text-neon-purple hover:text-neon-purple/80 hover:bg-neon-purple/10 font-paragraph mb-8"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Services
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {service.serviceName}
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl">
              {service.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Image */}
      {service.serviceImage && (
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
                src={service.serviceImage}
                alt={service.serviceName || 'Service image'}
                width={1600}
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Detailed Description */}
      <section className="w-full bg-primary py-16">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Service Overview
                </h2>
                <p className="font-paragraph text-base text-foreground/80 whitespace-pre-line">
                  {service.detailedDescription}
                </p>
              </motion.div>

              {service.industryContext && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="bg-background border border-neon-purple/20 rounded-lg p-8"
                >
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                    Industry Context
                  </h3>
                  <p className="font-paragraph text-base text-foreground/80">
                    {service.industryContext}
                  </p>
                </motion.div>
              )}

              {service.transferableSkills && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="bg-background border border-neon-purple/20 rounded-lg p-8"
                >
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                    Transferable Skills
                  </h3>
                  <p className="font-paragraph text-base text-foreground/80">
                    {service.transferableSkills}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-background border border-neon-purple/20 rounded-lg p-8 sticky top-24"
              >
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Get Started
                </h3>
                <p className="font-paragraph text-sm text-foreground/70 mb-6">
                  Ready to elevate your project with this service? Let's discuss your needs.
                </p>
                <div className="space-y-4">
                  <Link to="/contact" className="block">
                    <Button className="w-full bg-neon-purple hover:bg-neon-purple/90 text-primary-foreground font-paragraph rounded-lg">
                      Contact Us
                    </Button>
                  </Link>
                  {service.callToActionUrl && (
                    <a
                      href={service.callToActionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-neon-purple text-neon-purple hover:bg-neon-purple/10 font-paragraph rounded-lg"
                      >
                        Learn More
                        <ExternalLink className="ml-2" size={16} />
                      </Button>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
