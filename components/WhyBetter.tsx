import React from 'react';
import { FaRocket, FaLock, FaCode, FaCreditCard, FaChartLine, FaCogs } from 'react-icons/fa';
import FadeIn from '@/components/fadein';

const reasons = [
  {
    icon: <FaRocket />,
    title: "Rapid Development",
    description: "Launch your SaaS in days, not months.",
  },
  {
    icon: <FaLock />,
    title: "Secure Authentication",
    description: "Built-in user management and role-based access.",
  },
  {
    icon: <FaCode />,
    title: "Modern Tech Stack",
    description: "Next.js, React, TypeScript, and Tailwind CSS.",
  },
  {
    icon: <FaCreditCard />,
    title: "Integrated Payments",
    description: "Stripe subscription management out of the box.",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics Dashboard",
    description: "Ready-to-use admin dashboard with key metrics.",
  },
  {
    icon: <FaCogs />,
    title: "Customizable",
    description: "Easily extend and modify to fit your needs, with weekly updates!",
  },
];

const WhyBetter: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why BilQuick Stands Out
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <FadeIn key={index}>
              <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-primary text-3xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBetter;