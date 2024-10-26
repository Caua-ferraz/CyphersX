import React from "react";
import Image from "next/image";
import { FaRocket, FaChartLine, FaCogs, FaDatabase, FaMobileAlt, FaChartPie } from 'react-icons/fa';
import { generateMetadata } from "@/components/SEO";
import type { Metadata } from 'next';
import LazyLoad from "@/components/LazyLoad";
import TypingTitle from "@/components/TypingTitle";
import CTASection from "@/components/cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = generateMetadata({
  title: "DataConnect Pro Features - Streamline Client Acquisition",
  description: "Explore the powerful features of DataConnect Pro. Seamless integrations, real-time updates, and automated workflows for B2B growth.",
  keywords: "data collection features, client acquisition tools, B2B growth features, Instagram integration, LinkedIn integration, sales automation features",
  ogType: "website",
  twitterCard: "summary_large_image"
});

const features = [
  {
    icon: <FaRocket className="text-4xl text-yellow-500 mb-4" />,
    title: "Seamless Integrations",
    description: "Connect effortlessly with Instagram and LinkedIn to gather comprehensive client data.",
    details: [
      "Automatic profile syncing",
      "Real-time data updates",
      "Custom field mapping"
    ]
  },
  {
    icon: <FaChartLine className="text-4xl text-yellow-500 mb-4" />,
    title: "Real-Time Analytics",
    description: "Get instant insights into your client acquisition efforts and performance metrics.",
    details: [
      "Customizable dashboards",
      "Trend analysis",
      "ROI tracking"
    ]
  },
  {
    icon: <FaCogs className="text-4xl text-yellow-500 mb-4" />,
    title: "Automated Workflows",
    description: "Streamline your processes with intelligent automation rules and triggers.",
    details: [
      "Customizable triggers",
      "Multi-step workflows",
      "Integration with CRM systems"
    ]
  },
  {
    icon: <FaDatabase className="text-4xl text-yellow-500 mb-4" />,
    title: "Advanced Data Management",
    description: "Organize and leverage your client data effectively with our powerful tools.",
    details: [
      "Data cleansing and deduplication",
      "Custom segmentation",
      "Advanced search and filtering"
    ]
  },
  {
    icon: <FaMobileAlt className="text-4xl text-yellow-500 mb-4" />,
    title: "Mobile Accessibility",
    description: "Access and manage your client data on-the-go with our mobile-optimized platform.",
    details: [
      "Responsive design",
      "Native mobile apps",
      "Offline mode capabilities"
    ]
  },
  {
    icon: <FaChartPie className="text-4xl text-yellow-500 mb-4" />,
    title: "Custom Reporting",
    description: "Generate detailed reports to track your B2B growth and optimize strategies.",
    details: [
      "Drag-and-drop report builder",
      "Scheduled report delivery",
      "Export in multiple formats"
    ]
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section */}
      <LazyLoad>
        <section className="py-20 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
          <div className="container mx-auto px-4 flex items-center relative z-10">
            <div className="w-2/3 pr-8">
              <TypingTitle 
                preText="Powerful " 
                highlightedText="Features"
              />
              <p className="text-xl mt-6 mb-8">
                Discover how DataConnect Pro empowers your B2B growth with cutting-edge features designed for modern client acquisition.
              </p>
            </div>
            <div className="w-1/3">
              <Image src="/images/features-hero.jpg" alt="Features Hero" width={300} height={200} className="rounded-lg shadow-lg" />
            </div>
          </div>
          <Image src="/images/background-pattern.png" alt="Background Pattern" width={800} height={600} className="absolute right-0 bottom-0 opacity-10" />
        </section>
      </LazyLoad>

      {/* Modular Logic Section */}
      <LazyLoad>
        <section className="py-20">
          <div className="container mx-auto px-4 flex items-center">
            <div className="w-1/2 pr-8">
              <h2 className="text-3xl font-bold mb-4">Modular logic, custom fit</h2>
              <p className="text-lg mb-4">
                Cut through complexity with our blend of native and integration-specific building blocks. Effortlessly craft workflows that drive revenue with our intuitive visual builder UI.
              </p>
              <ul className="bg-card rounded-lg p-4 list-disc list-inside text-muted-foreground">
                <li>Feature-rich integrations</li>
                <li>Revenue-Driven Actions</li>
                <li>Expert-level Simplicity</li>
              </ul>
              <a href="#" className="inline-block mt-4 text-primary hover:underline">Explore integrations</a>
            </div>
            <div className="w-1/2">
              <Image src="/images/modular-logic.jpg" alt="Modular Logic" width={500} height={300} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* Features Section */}
      <LazyLoad>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  {/* Removed the top icon */}
                  {/* <div className="text-center">{feature.icon}</div> */}
                  <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="mb-2">{detail}</li>
                    ))}
                  </ul>
                  {/* Adjusted the bottom icon to middle top, showing half */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-8xl">
                    {feature.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* Lead Generation Section */}
      <LazyLoad>
        <section className="py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Supercharge Your Lead Generation</h2>
            <p className="text-xl mb-8">
              We're here to help you generate leads and automate your workflows. With DataConnect Pro, you'll streamline your client acquisition process and boost your business growth like never before.
            </p>
            <a href="#" className="bg-yellow-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors duration-300">
              Start Generating Leads
            </a>
          </div>
        </section>
      </LazyLoad>
      <Footer />
    </div>
  );
}
