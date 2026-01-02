import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="w-full bg-primary py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Terms of <span className="text-neon-purple">Service</span>
            </h1>
            <p className="font-paragraph text-sm text-foreground/60">
              Last updated: January 2026
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-background py-16">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto space-y-8 font-paragraph text-base text-foreground/80">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Agreement to Terms
              </h2>
              <p>
                By accessing and using Codejinx's website and services, you agree to be bound by 
                these Terms of Service and all applicable laws and regulations. If you do not 
                agree with any of these terms, you are prohibited from using our services.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Use License
              </h2>
              <p className="mb-3">
                Permission is granted to temporarily access our services for personal, 
                non-commercial use only. This license does not include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modifying or copying our materials</li>
                <li>Using materials for commercial purposes</li>
                <li>Attempting to reverse engineer any software</li>
                <li>Removing copyright or proprietary notations</li>
                <li>Transferring materials to another person</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Service Availability
              </h2>
              <p>
                We strive to maintain continuous service availability but do not guarantee 
                uninterrupted access. We reserve the right to modify, suspend, or discontinue 
                any part of our services at any time without prior notice.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                User Responsibilities
              </h2>
              <p className="mb-3">When using our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Not engage in any unlawful or harmful activities</li>
                <li>Respect intellectual property rights</li>
                <li>Not interfere with the proper functioning of our services</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Intellectual Property
              </h2>
              <p>
                All content, features, and functionality on our website are owned by Codejinx 
                and are protected by international copyright, trademark, and other intellectual 
                property laws.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Limitation of Liability
              </h2>
              <p>
                Codejinx shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use or inability to use our services.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of our 
                services after changes constitutes acceptance of the modified terms.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Contact Information
              </h2>
              <p>
                For questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@codejinx.com" className="text-neon-purple hover:underline">
                  legal@codejinx.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
