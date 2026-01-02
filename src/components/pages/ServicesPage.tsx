import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ServicesPage() {
  const [services, setServices] = useState<Services[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { items } = await BaseCrudService.getAll<Services>('services');
      setServices(items);
    };

    fetchServices();
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
              Our <span className="text-neon-purple">Services</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80">
              Comprehensive digital solutions designed to elevate your business and academic success. 
              From development to content creation, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={`/services/${service._id}`}>
                  <div className="group bg-primary border border-neon-purple/20 rounded-lg overflow-hidden hover:border-neon-purple transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/20 h-full">
                    {service.serviceImage && (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={service.serviceImage}
                          alt={service.serviceName || 'Service image'}
                          width={800}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-neon-purple transition-colors">
                        {service.serviceName}
                      </h2>
                      <p className="font-paragraph text-base text-foreground/80 mb-6">
                        {service.shortDescription}
                      </p>
                      {service.industryContext && (
                        <p className="font-paragraph text-sm text-foreground/60 mb-6 italic">
                          {service.industryContext}
                        </p>
                      )}
                      <div className="flex items-center text-neon-purple font-paragraph text-sm font-medium">
                        Learn More
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
