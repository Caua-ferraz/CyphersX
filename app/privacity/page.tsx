import React from 'react';
import FadeIn from "@/components/fadein";
import TypingTitle from "@/components/TypingTitle";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import LazyLoad from '@/components/LazyLoad';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  const privacyPolicies = [
    {
      title: "Information We Collect",
      content: "Nexly collects various types of information to provide and improve our services. This includes:",
      list: [
        "Personal information you provide (e.g., name, email address)",
        "Data from your Instagram and LinkedIn profiles",
        "Usage data and analytics",
        "Device and browser information"
      ]
    },
    {
      title: "How We Use Your Information",
      content: "We use the collected information for various purposes, including:",
      list: [
        "Providing and maintaining our services",
        "Improving and optimizing our platform",
        "Generating insights and contact lists",
        "Communicating with you about our services",
        "Ensuring the security and integrity of our platform"
      ]
    },
    {
      title: "Data Storage and Security",
      content: "We take the security of your data seriously. Our data protection measures include:",
      list: [
        "Encryption of data in transit and at rest",
        "Regular security audits and vulnerability assessments",
        "Strict access controls and authentication procedures",
        "Compliance with industry-standard security practices"
      ]
    },
    {
      title: "Data Sharing and Third Parties",
      content: "We may share your information with third parties in the following circumstances:",
      list: [
        "With your explicit consent",
        "To comply with legal obligations",
        "With service providers who assist in our operations",
        "In the event of a merger, acquisition, or sale of assets"
      ]
    },
    {
      title: "Your Rights and Choices",
      content: "You have certain rights regarding your personal information, including:",
      list: [
        "Accessing and updating your personal information",
        "Requesting deletion of your data",
        "Opting out of certain data collection practices",
        "Withdrawing consent for data processing"
      ]
    },
    {
      title: "Changes to Privacy Policy",
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by:",
      list: [
        "Posting the new Privacy Policy on this page",
        "Updating the 'Last updated' date at the top of this page",
        "Sending an email notification for significant changes"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center text-foreground">
      <section className="w-full max-w-4xl mx-auto px-4 py-12 space-y-8">
        <FadeIn>
          <TypingTitle preText="Our " highlightedText="Privacy Policy" />
        </FadeIn>

        <FadeIn>
          <p className="text-base md:text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </FadeIn>

        <FadeIn>
          <p className="text-sm md:text-base text-muted-foreground">
            At Nexly, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>
        </FadeIn>

        {privacyPolicies.map((policy, index) => (
          <FadeIn key={index}>
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-default">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">{policy.title}</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-2">{policy.content}</p>
              {policy.list && (
                <ul className="list-disc pl-5 text-sm md:text-base text-muted-foreground">
                  {policy.list.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </FadeIn>
        ))}
      </section>
      <LazyLoad>
        <Footer />
      </LazyLoad>
    </div>
  );
}