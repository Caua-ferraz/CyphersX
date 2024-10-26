import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRocket, FaChartLine, FaCogs, FaLinkedin, FaInstagram, FaDatabase, FaMobileAlt, FaChartPie } from 'react-icons/fa';
import { generateMetadata } from "@/components/SEO";
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Footer from "@/components/Footer";

// Dynamic imports
const WaitlistForm = dynamic(() => import("@/components/WaitlistForm"), {
  loading: () => <div>Loading...</div>
});
const FlowChart = dynamic(() => import("@/components/flow"), {
  loading: () => <div>Loading...</div>
});
const Price = dynamic(() => import("@/components/subscription/price"), {
  loading: () => <div>Loading...</div>
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // other viewport settings
};

export const metadata: Metadata = generateMetadata({
  title: "Nexly - Streamline Client Acquisition",
  description: "Effortlessly collect and organize client data from Instagram and LinkedIn. Empower your B2B growth with real-time, actionable contact lists.",
  keywords: "data collection, client acquisition, B2B growth, Instagram integration, LinkedIn integration, sales automation",
  ogType: "website",
  twitterCard: "summary_large_image"
});

const features = [
  {
    icon: <FaRocket className="icon text-emerald-400" />,
    title: "Seamless Integrations",
    description: "Deep integrations with Instagram and LinkedIn for comprehensive data collection."
  },
  {
    icon: <FaChartLine className="icon text-emerald-400" />,
    title: "Real-Time Updates",
    description: "Get the latest client data instantly, ensuring your team always has up-to-date information."
  },
  {
    icon: <FaCogs className="icon text-emerald-400" />,
    title: "Automated Workflow",
    description: "Set up custom automation rules to streamline your data collection process."
  },
  {
    icon: <FaDatabase className="icon text-emerald-400" />,
    title: "Advanced Data Analytics",
    description: "Leverage comprehensive analytics to gain insights into client acquisition trends and performance metrics."
  },
  {
    icon: <FaMobileAlt className="icon text-emerald-400" />,
    title: "Mobile Integration",
    description: "Integrate seamlessly with mobile platforms to collect and manage client data on the go."
  },
  {
    icon: <FaChartPie className="icon text-emerald-400" />,
    title: "Custom Reporting",
    description: "Generate tailored reports to track your B2B growth and optimize your sales strategies."
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI-Powered Workflows that connects you with{' '}
              <span className="text-amber-400">Clients</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Effortlessly collect and organize client data from Instagram and LinkedIn.
              Empower your B2B growth with real-time, actionable contact lists.
            </p>
            <a href="#waitlist" className="w-full sm:w-auto px-6 py-3 bg-emerald-400 text-slate-700 rounded-md hover:bg-emerald-500 transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 relative glow">
            What can you implement with DataConnect Pro?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
              >
                <div className="mb-4">{feature.icon}</div>
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Section */}
      <section className="py-20 relative">
        <Price />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
