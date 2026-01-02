import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { PortfolioProjects } from '@/entities';
import { Image } from '@/components/ui/image';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProjects[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<PortfolioProjects[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');

  useEffect(() => {
    const fetchProjects = async () => {
      const { items } = await BaseCrudService.getAll<PortfolioProjects>('portfolioprojects');
      setProjects(items);
      setFilteredProjects(items);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedDiscipline !== 'All') {
      filtered = filtered.filter((p) => p.discipline === selectedDiscipline);
    }

    if (selectedService !== 'All') {
      filtered = filtered.filter((p) => p.serviceType === selectedService);
    }

    if (selectedSkill !== 'All') {
      filtered = filtered.filter((p) => p.skillCategory === selectedSkill);
    }

    setFilteredProjects(filtered);
  }, [selectedDiscipline, selectedService, selectedSkill, projects]);

  const disciplines = ['All', ...Array.from(new Set(projects.map((p) => p.discipline).filter(Boolean)))];
  const services = ['All', ...Array.from(new Set(projects.map((p) => p.serviceType).filter(Boolean)))];
  const skills = ['All', ...Array.from(new Set(projects.map((p) => p.skillCategory).filter(Boolean)))];

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
              Our <span className="text-neon-purple">Portfolio</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80">
              Explore our diverse collection of projects spanning multiple disciplines. 
              Each project showcases our commitment to excellence and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full bg-background py-12 border-b border-neon-purple/20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="text-neon-purple" size={20} />
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Filter Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Discipline Filter */}
            <div>
              <label className="font-paragraph text-sm text-foreground/80 mb-2 block">
                Discipline
              </label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full bg-primary border border-neon-purple/20 rounded-lg px-4 py-3 font-paragraph text-foreground focus:outline-none focus:border-neon-purple transition-colors"
              >
                {disciplines.map((discipline) => (
                  <option key={discipline} value={discipline}>
                    {discipline}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type Filter */}
            <div>
              <label className="font-paragraph text-sm text-foreground/80 mb-2 block">
                Service Type
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-primary border border-neon-purple/20 rounded-lg px-4 py-3 font-paragraph text-foreground focus:outline-none focus:border-neon-purple transition-colors"
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Category Filter */}
            <div>
              <label className="font-paragraph text-sm text-foreground/80 mb-2 block">
                Skill Category
              </label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full bg-primary border border-neon-purple/20 rounded-lg px-4 py-3 font-paragraph text-foreground focus:outline-none focus:border-neon-purple transition-colors"
              >
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(selectedDiscipline !== 'All' || selectedService !== 'All' || selectedSkill !== 'All') && (
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedDiscipline('All');
                  setSelectedService('All');
                  setSelectedSkill('All');
                }}
                className="border-neon-purple text-neon-purple hover:bg-neon-purple/10 font-paragraph rounded-lg"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-foreground/60">
                No projects found matching your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                >
                  <Link to={`/portfolio/${project._id}`}>
                    <div className="group bg-primary border border-neon-purple/20 rounded-lg overflow-hidden hover:border-neon-purple transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/20 h-full">
                      {project.thumbnailImage && (
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={project.thumbnailImage}
                            alt={project.projectName || 'Project thumbnail'}
                            width={600}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.discipline && (
                            <span className="font-paragraph text-xs bg-neon-purple/20 text-neon-purple px-3 py-1 rounded">
                              {project.discipline}
                            </span>
                          )}
                          {project.serviceType && (
                            <span className="font-paragraph text-xs bg-foreground/10 text-foreground/80 px-3 py-1 rounded">
                              {project.serviceType}
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-neon-purple transition-colors">
                          {project.projectName}
                        </h3>
                        <p className="font-paragraph text-sm text-foreground/70 line-clamp-2">
                          {project.projectDescription}
                        </p>
                        {project.completionDate && (
                          <p className="font-paragraph text-xs text-foreground/50 mt-3">
                            Completed: {new Date(project.completionDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
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
