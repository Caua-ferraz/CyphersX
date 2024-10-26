import React from "react";
import Image from "next/image";
import { FaUsers, FaHandshake, FaLightbulb, FaHeart } from 'react-icons/fa';
import { generateMetadata } from "@/components/SEO";
import type { Metadata } from 'next';
import LazyLoad from "@/components/LazyLoad";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import FadeIn from "@/components/fadein";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = generateMetadata({
  title: "About DataConnect Pro - Our Mission and Values",
  description: "Learn about DataConnect Pro's mission to empower businesses with AI-driven client acquisition tools and our core values that drive our success.",
  keywords: "about us, company mission, team, values, B2B growth, data solutions, client acquisition",
  ogType: "website",
  twitterCard: "summary_large_image"
});

const mission = {
  title: "Our Mission",
  description: "At DataConnect Pro, we're on a mission to revolutionize client acquisition for B2B companies. We leverage cutting-edge AI technology to create powerful, intuitive tools that empower businesses to connect, engage, and grow effortlessly. Our goal is to streamline the entire client acquisition process, allowing companies to focus on what they do best – delivering value to their customers."
};

const values = [
  {
    icon: <FaUsers className="icon text-blue-500" />,
    title: "Client-Centric Innovation",
    description: "We continuously innovate with our clients' needs at the forefront, ensuring our solutions drive real business growth."
  },
  {
    icon: <FaHandshake className="icon text-green-500" />,
    title: "Integrity and Trust",
    description: "We build lasting relationships based on transparency, honesty, and a commitment to our clients' success."
  },
  {
    icon: <FaLightbulb className="icon text-yellow-500" />,
    title: "Data-Driven Excellence",
    description: "We harness the power of data and AI to deliver insights and solutions that give our clients a competitive edge."
  },
  {
    icon: <FaHeart className="icon text-red-500" />,
    title: "Empowering Growth",
    description: "We're dedicated to empowering businesses of all sizes to achieve sustainable growth and realize their full potential."
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen text-foreground font-sans">

      <main>
        {/* Hero Section */}
        <LazyLoad>
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About DataConnect Pro</h1>
              <p className="text-xl mb-8">
                Empowering B2B growth with innovative, AI-driven client acquisition solutions.
              </p>
            </div>
          </section>
        </LazyLoad>

        {/* Mission Section */}
        <LazyLoad>
          <section id="mission" className="py-20">
            <div className="container mx-auto px-4">
              <FadeIn>
                <h2 className="text-3xl font-bold text-center mb-8">{mission.title}</h2>
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-lg text-gray-400">
                    {mission.description}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>
        </LazyLoad>

        {/* Values Section */}
        <LazyLoad>
          <section className="py-20 bg-card rounded-lg p-4">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <FadeIn key={index}>
                    <Card className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">{value.icon}</div>
                        <CardTitle>{value.title}</CardTitle>
                      </div>
                      <CardContent>
                        <p className="text-gray-400">{value.description}</p>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        </LazyLoad>

        {/* Vision Section */}
        <LazyLoad>
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <FadeIn>
                <h2 className="text-3xl font-bold mb-8">Our Vision</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  We envision a future where every B2B company, regardless of size, has access to powerful, AI-driven tools that make client acquisition seamless and effective. By bridging the gap between data and human connection, we aim to foster a business ecosystem where meaningful relationships drive sustainable growth.
                </p>
              </FadeIn>
            </div>
          </section>
        </LazyLoad>
      </main>

      <Footer />
    </div>
  );
}