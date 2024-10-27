import React from 'react';
import FadeIn from "@/components/fadein";
import Footer from "@/components/Footer";
import LazyLoad from '@/components/LazyLoad';

export default function TermsOfServicePage() {
  const terms = [
    {
      title: "Acceptance of Terms",
      content: "By accessing or using Nexly, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.",
    },
    {
      title: "Use License",
      content: "Nexly grants you a limited, non-exclusive, non-transferable, and revocable license to use our services for your personal or business use, subject to these terms:",
      list: [
        "You may not distribute, sell, lease, rent, or sublicense any part of our services",
        "You may not copy, modify, merge, or incorporate our services into other software",
        "You may not use our services to create a competing product or service explicitly copying Nexly"
      ]
    },
    {
      title: "Intellectual Property",
      content: "Nexly's services, including all associated source code, designs, and documentation, are protected by copyright, trademark, and other intellectual property laws. Our intellectual property includes:",
      list: [
        "All software code and algorithms",
        "User interface designs and graphics",
        "Documentation and written content",
        "Logos, trademarks, and brand elements"
      ]
    },
    {
      title: "Data Collection and Usage",
      content: "Nexly collects and processes data from Instagram and LinkedIn to provide our services. By using Nexly, you agree to our data collection practices, which include:",
      list: [
        "Collecting publicly available data from Instagram and LinkedIn profiles",
        "Processing and analyzing this data to provide insights and contact lists",
        "Storing this data securely in accordance with our Privacy Policy",
        "Using this data to improve and optimize our services"
      ]
    },
    {
      title: "User Responsibilities",
      content: "As a user of Nexly, you are responsible for:",
      list: [
        "Maintaining the confidentiality of your account and password",
        "Restricting access to your account and accepting responsibility for all activities under your account",
        "Ensuring that your use of our services complies with all applicable laws and regulations",
        "Using the collected data in accordance with Instagram and LinkedIn's terms of service",
        "Promptly notifying us of any unauthorized use of your account or other security breaches"
      ]
    },
    {
      title: "Termination",
      content: "We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including:",
      list: [
        "Breach of these Terms of Service",
        "Violation of intellectual property rights",
        "Misuse of collected data",
        "Engaging in fraudulent or illegal activities",
        "At our sole discretion, for any other reason we deem necessary"
      ]
    },
    {
      title: "Disclaimer",
      content: "Nexly is provided 'as is' and 'as available' without any warranties, either express or implied. We do not warrant that the service will be uninterrupted, secure, or error-free.",
    },
    {
      title: "Limitation of Liability",
      content: "To the fullest extent permitted by law, Nexly shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.",
    },
    {
      title: "Changes to Terms",
      content: "We reserve the right to modify or replace these Terms of Service at any time. We will provide notice of any material changes by:",
      list: [
        "Posting the updated terms on this page",
        "Updating the 'Last updated' date at the top of this page",
        "Sending an email notification to users (for significant changes)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center text-foreground">
      <section className="w-full max-w-4xl mx-auto px-4 py-12 space-y-8">
        <FadeIn>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Our Terms of Service</h1>
        </FadeIn>

        <FadeIn>
          <p className="text-base md:text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </FadeIn>

        <FadeIn>
          <p className="text-sm md:text-base text-muted-foreground">
            Welcome to Nexly. These Terms of Service govern your use of our services. By using Nexly, you agree to these terms. Please read them carefully.
          </p>
        </FadeIn>

        {terms.map((term, index) => (
          <FadeIn key={index}>
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-default">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">{term.title}</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-2">{term.content}</p>
              {term.list && (
                <ul className="list-disc pl-5 text-sm md:text-base text-muted-foreground">
                  {term.list.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </FadeIn>
        ))}

        <FadeIn>
          <div className="text-center mt-8 space-y-4">
            <p className="text-sm md:text-base text-muted-foreground">
              By using Nexly, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
            </p>
          </div>
        </FadeIn>
      </section>
      <LazyLoad>
        <Footer />
      </LazyLoad>
    </div>
  );
}
