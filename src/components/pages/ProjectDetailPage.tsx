import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { PortfolioProjects } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<PortfolioProjects | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        const data = await BaseCrudService.getById<PortfolioProjects>('portfolioprojects', id);
        setProject(data);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
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
          <Link to="/portfolio">
            <Button
              variant="ghost"
              className="text-neon-purple hover:text-neon-purple/80 hover:bg-neon-purple/10 font-paragraph mb-8"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Portfolio
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-3 mb-6">
              {project.discipline && (
                <span className="font-paragraph text-sm bg-neon-purple/20 text-neon-purple px-4 py-2 rounded">
                  {project.discipline}
                </span>
              )}
              {project.serviceType && (
                <span className="font-paragraph text-sm bg-foreground/10 text-foreground/80 px-4 py-2 rounded">
                  {project.serviceType}
                </span>
              )}
              {project.skillCategory && (
                <span className="font-paragraph text-sm bg-foreground/10 text-foreground/80 px-4 py-2 rounded">
                  {project.skillCategory}
                </span>
              )}
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {project.projectName}
            </h1>

            {project.completionDate && (
              <div className="flex items-center gap-2 text-foreground/70 font-paragraph text-sm">
                <Calendar size={16} />
                <span>Completed: {new Date(project.completionDate).toLocaleDateString()}</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Image */}
      {project.thumbnailImage && (
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
                src={project.thumbnailImage}
                alt={project.projectName || 'Project image'}
                width={1600}
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Project Details */}
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
                  Project Overview
                </h2>
                <p className="font-paragraph text-base text-foreground/80 whitespace-pre-line">
                  {project.projectDescription}
                </p>
              </motion.div>

              {project.specializedTerminology && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="bg-background border border-neon-purple/20 rounded-lg p-8"
                >
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                    Specialized Terminology
                  </h3>
                  <p className="font-paragraph text-base text-foreground/80">
                    {project.specializedTerminology}
                  </p>
                </motion.div>
              )}

              {project.skillHighlights && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="bg-background border border-neon-purple/20 rounded-lg p-8"
                >
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                    Skill Highlights
                  </h3>
                  <p className="font-paragraph text-base text-foreground/80">
                    {project.skillHighlights}
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
                  Project Details
                </h3>

                <div className="space-y-4">
                  {project.discipline && (
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-1">Discipline</p>
                      <p className="font-paragraph text-sm text-foreground">{project.discipline}</p>
                    </div>
                  )}

                  {project.serviceType && (
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-1">Service Type</p>
                      <p className="font-paragraph text-sm text-foreground">{project.serviceType}</p>
                    </div>
                  )}

                  {project.skillCategory && (
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-1">Skill Category</p>
                      <p className="font-paragraph text-sm text-foreground">{project.skillCategory}</p>
                    </div>
                  )}
                </div>

                {project.projectUrl && (
                  <div className="mt-8">
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-neon-purple hover:bg-neon-purple/90 text-primary-foreground font-paragraph rounded-lg">
                        View Live Project
                        <ExternalLink className="ml-2" size={16} />
                      </Button>
                    </a>
                  </div>
                )}

                <div className="mt-4">
                  <Link to="/contact" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-neon-purple text-neon-purple hover:bg-neon-purple/10 font-paragraph rounded-lg"
                    >
                      Start Your Project
                    </Button>
                  </Link>
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
