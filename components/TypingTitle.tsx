"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface TypingTitleProps {
  preText: string;
  highlightedText: string;
  speed?: 100;
}

/**
 * TypingTitle Component
 * 
 * This component creates a typing animation effect for a title,
 * with a part of the text highlighted and a blinking cursor.
 * 
 * @param preText - The first part of the text (not highlighted)
 * @param highlightedText - The second part of the text (highlighted)
 * @param speed - The typing speed in milliseconds (default: 50ms)
 */
const TypingTitle: React.FC<TypingTitleProps> = ({
  preText,
  highlightedText,
  speed = 50,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const currentIndex = useRef(0);
  const fullText = `${preText}${highlightedText}`;

  // Typing animation handler using requestAnimationFrame
  const typeText = useCallback(() => {
    const updateText = () => {
      if (currentIndex.current < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex.current + 1));
        currentIndex.current++;
        setTimeout(() => requestAnimationFrame(updateText), speed); // Delay for typing effect
      } else {
        setIsTypingComplete(true);
      }
    };
    requestAnimationFrame(updateText);

    // Cleanup in case of unmount
    return () => cancelAnimationFrame(updateText as any);
  }, [fullText, speed]);

  useEffect(() => {
    const cleanup = typeText();
    return cleanup;
  }, [typeText]);

  const preTextPart = displayedText.slice(0, preText.length);
  const highlightedTextPart = displayedText.slice(preText.length);

  return (
    <h1 className="text-4xl font-extrabold">
      <span className="text-primary">{preTextPart}</span>
      <span className="text-white">{highlightedTextPart}</span>
      {/* Blinking cursor */}
      <span className={isTypingComplete ? 'animate-fast-blink' : ''}>
        {isTypingComplete ? '|' : displayedText.length < fullText.length ? '|' : ''}
      </span>
    </h1>
  );
};

export default TypingTitle;

// Customization options:

// 1. Change the font size or style
// Modify the className of the h1 element:
// <h1 className="text-5xl font-bold italic">

// 2. Adjust the colors
// Change the text-primary and text-white classes:
// <span className="text-blue-500">{preTextPart}</span>
// <span className="text-yellow-300">{highlightedTextPart}</span>

// 3. Modify the cursor style
// Change the cursor character or style:
// {isTypingComplete ? '▌' : (displayedText.length < fullText.length ? '▌' : '')}

// 4. Add a delay before starting the animation
// Wrap the typeText() call in a setTimeout:
// useEffect(() => {
//   const timer = setTimeout(() => {
//     const cleanup = typeText();
//     return cleanup;
//   }, 1000); // 1 second delay
//   return () => clearTimeout(timer);
// }, [typeText]);

// 5. Implement a loop or restart functionality
// Add a state to control restarting and modify the useEffect:
// const [shouldRestart, setShouldRestart] = useState(false);
// useEffect(() => {
//   if (isTypingComplete) {
//     const timer = setTimeout(() => {
//       setDisplayedText("");
//       setIsTypingComplete(false);
//       setShouldRestart(true);
//     }, 2000); // Wait 2 seconds before restarting
//     return () => clearTimeout(timer);
//   }
// }, [isTypingComplete]);

// 6. Add a fade-in effect
// Wrap the return statement in a div with a fade-in animation:
// return (
//   <div className="animate-fade-in">
//     <h1 className="text-4xl font-extrabold">
//       ...
//     </h1>
//   </div>
// );

// 7. Implement responsive font sizes
// Use responsive class names for different screen sizes:
// <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">

// Remember to add any new animations or responsive classes to your Tailwind CSS configuration if they're not already included.