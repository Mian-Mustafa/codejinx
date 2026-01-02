import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Lightbulb, Target } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function StudentToolsPage() {
  const [input, setInput] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [output, setOutput] = useState<{
    summary: string;
    keyPoints: string[];
    explanation: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimplify = () => {
    if (!input.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const mockOutput = {
        summary: `Simplified version of your content at ${difficulty} difficulty level. This tool helps break down complex topics into digestible information.`,
        keyPoints: [
          'Main concept identified and clarified',
          'Complex terminology explained in simple terms',
          'Practical examples provided for better understanding',
          'Step-by-step breakdown of the topic',
        ],
        explanation: `Based on your input and selected difficulty level (${difficulty}), here's a comprehensive breakdown: The content has been analyzed and restructured to match your learning needs. Key concepts have been identified and explained using appropriate language complexity. This approach ensures better retention and understanding of the material.`,
      };

      setOutput(mockOutput);
      setIsProcessing(false);
    }, 1500);
  };

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
            <div className="inline-flex items-center gap-2 bg-neon-purple/20 text-neon-purple px-4 py-2 rounded-full font-paragraph text-sm mb-6">
              <Sparkles size={16} />
              <span>AI-Powered Learning Tool</span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Codejinx <span className="text-neon-purple">Study Simplifier</span>
            </h1>

            <p className="font-paragraph text-lg md:text-xl text-foreground/80">
              Transform complex topics into easy-to-understand content. Perfect for students 
              who want to learn smarter, not harder.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary border border-neon-purple/20 rounded-lg p-8 md:p-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
                Enter Your Study Material
              </h2>

              <div className="space-y-6">
                {/* Input Textarea */}
                <div>
                  <label className="font-paragraph text-sm text-foreground/80 mb-2 block">
                    Paste your text, notes, or topic here
                  </label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter the content you want to simplify..."
                    className="min-h-[200px] bg-background border-neon-purple/20 text-foreground font-paragraph resize-none focus:border-neon-purple"
                  />
                </div>

                {/* Difficulty Selector */}
                <div>
                  <label className="font-paragraph text-sm text-foreground/80 mb-2 block">
                    Select Difficulty Level
                  </label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="bg-background border-neon-purple/20 text-foreground font-paragraph focus:border-neon-purple">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy - Simple explanations</SelectItem>
                      <SelectItem value="medium">Medium - Balanced approach</SelectItem>
                      <SelectItem value="advanced">Advanced - Detailed analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSimplify}
                  disabled={!input.trim() || isProcessing}
                  className="w-full bg-neon-purple hover:bg-neon-purple/90 text-primary-foreground font-paragraph py-6 rounded-lg"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="mr-2 animate-spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={20} />
                      Simplify Content
                    </>
                  )}
                </Button>
              </div>
            </motion.div>

            {/* Output Cards */}
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-12 space-y-6"
              >
                {/* Summary Card */}
                <div className="bg-primary border border-neon-purple/20 rounded-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-neon-purple/20 p-3 rounded-lg">
                      <BookOpen className="text-neon-purple" size={24} />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      Summary
                    </h3>
                  </div>
                  <p className="font-paragraph text-base text-foreground/80">
                    {output.summary}
                  </p>
                </div>

                {/* Key Points Card */}
                <div className="bg-primary border border-neon-purple/20 rounded-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-neon-purple/20 p-3 rounded-lg">
                      <Target className="text-neon-purple" size={24} />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      Key Points
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {output.keyPoints.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 font-paragraph text-base text-foreground/80"
                      >
                        <span className="text-neon-purple mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Explanation Card */}
                <div className="bg-primary border border-neon-purple/20 rounded-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-neon-purple/20 p-3 rounded-lg">
                      <Lightbulb className="text-neon-purple" size={24} />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      Detailed Explanation
                    </h3>
                  </div>
                  <p className="font-paragraph text-base text-foreground/80">
                    {output.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-primary py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Use Our <span className="text-neon-purple">Study Simplifier</span>?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Save Time',
                description: 'Quickly understand complex topics without spending hours researching.',
              },
              {
                title: 'Better Retention',
                description: 'Simplified content is easier to remember and recall during exams.',
              },
              {
                title: 'Customizable',
                description: 'Choose your difficulty level to match your learning needs.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-background border border-neon-purple/20 rounded-lg p-8 text-center"
              >
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
