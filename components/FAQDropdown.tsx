"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // For the arrow icons

const faqItems = [
  { question: "What is BilQuick?", answer: "BilQuick is a no-nonsense boilerplate that helps you launch SaaS fast, without getting bogged down by the usual headaches." },
  { question: "How much does it cost?", answer: "We offer flexible pricing plans to fit your needs, whether you're starting small or scaling fast." },
  { question: "How do I customize BilQuick?", answer: "BilQuick is fully customizable. You can modify the UI, extend the features, or integrate any third-party service with ease." }
];

const FAQDropdown = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        {faqItems.map((item, index) => (
          <div key={index} className="mb-2">
            {/* Button with fixed size */}
            <button
              className={`w-full flex justify-between items-center text-left px-4 py-3 rounded-lg text-lg font-semibold focus:outline-none transition-colors duration-300 ${openIndex === index ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}
              onClick={() => handleToggle(index)}
              style={{ minHeight: "3rem" }} // Fixed height for the button
            >
              {item.question}
              {openIndex === index ? (
                <FaChevronUp className="ml-2 transition-transform duration-300" />
              ) : (
                <FaChevronDown className="ml-2 transition-transform duration-300" />
              )}
            </button>

            {/* Dropdown content */}
            <div
              className={`overflow-hidden transition-max-height duration-300 ${openIndex === index ? 'max-h-[500px] ease-in' : 'max-h-0 ease-out'}`}
            >
              <div className="p-4 bg-popover rounded-lg shadow-lg mt-2">
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQDropdown;
