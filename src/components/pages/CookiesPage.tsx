import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CookiesPage() {
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
              Cookie <span className="text-neon-purple">Policy</span>
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
                What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our 
                website. They help us provide you with a better experience by remembering your 
                preferences and understanding how you use our site.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Types of Cookies We Use
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Essential Cookies
                  </h3>
                  <p>
                    These cookies are necessary for the website to function properly. They enable 
                    core functionality such as security, network management, and accessibility.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Analytics Cookies
                  </h3>
                  <p>
                    We use analytics cookies to understand how visitors interact with our website. 
                    This helps us improve our content and user experience.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Preference Cookies
                  </h3>
                  <p>
                    These cookies allow our website to remember choices you make (such as your 
                    language preference) and provide enhanced, personalized features.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Marketing Cookies
                  </h3>
                  <p>
                    Marketing cookies track your online activity to help us deliver more relevant 
                    advertising and measure the effectiveness of our campaigns.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                How We Use Cookies
              </h2>
              <p className="mb-3">We use cookies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Keep you signed in to your account</li>
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Personalize content and advertisements</li>
                <li>Improve site performance and user experience</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Managing Cookies
              </h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can 
                choose to block or delete cookies, but this may affect your ability to use 
                certain features of our website. Please note that disabling essential cookies 
                may prevent the site from functioning properly.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Third-Party Cookies
              </h2>
              <p>
                We may use third-party services (such as Google Analytics) that also set cookies 
                on your device. These third parties have their own privacy policies, and we have 
                no control over their cookies.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Updates to This Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted 
                on this page with an updated revision date.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                Contact Us
              </h2>
              <p>
                If you have questions about our use of cookies, please contact us at{' '}
                <a href="mailto:privacy@codejinx.com" className="text-neon-purple hover:underline">
                  privacy@codejinx.com
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
