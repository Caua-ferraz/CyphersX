import React from 'react';
import { SiReact, SiNextdotjs, SiSupabase, SiStripe, SiTailwindcss } from "react-icons/si";
import { TbBrandOpenSource } from "react-icons/tb";
import FadeIn from "@/components/fadein";

const technologies = [
  { Icon: SiReact, name: "React", color: "text-blue-500", url: "https://reactjs.org/" },
  { Icon: SiNextdotjs, name: "Next.js", color: "text-gray-700", url: "https://nextjs.org/" },
  { Icon: SiSupabase, name: "Supabase", color: "text-green-500", url: "https://supabase.io/" },
  { Icon: SiStripe, name: "Stripe", color: "text-purple-500", url: "https://stripe.com/" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-400", url: "https://tailwindcss.com/" },
  { Icon: TbBrandOpenSource, name: "Open Source", color: "text-orange-500", url: "https://opensource.org/" }
];

const TechnologyStack: React.FC = () => (
  <FadeIn>
    <section className="w-full py-8 sm:py-10 bg-card px-2 sm:px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 mb-4 sm:mb-6 justify-items-center">
          {technologies.map(({ Icon, name, color, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-transform hover:scale-110"
            >
              <Icon className={`w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 ${color}`} title={name} />
              <span className="text-xxs sm:text-xs mt-1 sm:mt-2">{name}</span>
            </a>
          ))}
        </div>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
          Built with cutting-edge technologies to save you time and effort.
        </p>
      </div>
    </section>
  </FadeIn>
);

export default TechnologyStack;