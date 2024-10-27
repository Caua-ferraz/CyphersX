"use client"; // Indica que este componente é renderizado no cliente

import { Button } from "@/components/ui/button"; // Importando Button component
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Importando Card component
import { Check } from "lucide-react"; // Importando Check icon from lucide-react
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card"; // Importando MagicCard component

// Dynamically import Checkout component with no SSR
const DynamicCheckout = dynamic(() => import('./Checkout'), {
  loading: () => <Button className="w-full" disabled>Loading...</Button>,
  ssr: false
});

/**
 * Price Component
 * 
 * Este componente exibe planos de preços para o serviço de assinatura.
 * Mostra diferentes planos com seus detalhes e gerencia o processo de checkout.
 */
const Price = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'lifetime'>('monthly');

  const plans = {
    monthly: {
      name: "Pro Monthly",
      description: "Premium Discord Community Access",
      price: "$50",
      period: "month",
      priceId: "price_pro_monthly",
    },
    lifetime: {
      name: "Pro Lifetime",
      description: "Lifetime Premium Community Access",
      price: "$150",
      period: "one-time",
      priceId: "price_pro_lifetime",
    }
  };

  const features = [
    "Access to exclusive trading channels",
    "Private networking events",
    "1-on-1 mentoring sessions",
    "Real-time market alerts",
    "Premium research reports",
    "Trading signals community",
    "Weekly crypto market analysis",
    "Priority support in all channels",
    "Access to expert network members",
    "Exclusive educational content"
  ];

  const selectedPlanDetails = plans[selectedPlan];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white">Premium Crypto Community</h2>
        <p className="text-white mt-2">
          Join our exclusive network of crypto traders and professionals
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <Button 
          variant={selectedPlan === 'monthly' ? 'default' : 'outline'}
          onClick={() => setSelectedPlan('monthly')}
        >
          Monthly Access
        </Button>
        <Button 
          variant={selectedPlan === 'lifetime' ? 'default' : 'outline'}
          onClick={() => setSelectedPlan('lifetime')}
        >
          Lifetime Access
        </Button>
      </div>

      <div className="max-w-md py-20 mx-auto relative bg-transparent">
        <MagicCard
          className="flex flex-col hover:border-primary transition-colors relative bg-card backdrop-blur-sm overflow-hidden"
          gradientSize={200}
          gradientColor="#262626"
          gradientTransparency={80}
        >
          {/* Add BorderBeam component */}
          <BorderBeam size={250} duration={12} delay={9} />

          {/* Card Content */}
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-2xl text-white">{selectedPlanDetails.name}</CardTitle>
            <CardDescription className="text-white">{selectedPlanDetails.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow relative z-10">
            <div className="text-center">
              <span className="text-4xl font-bold text-white">{selectedPlanDetails.price}</span>
              <span className="text-white">
                {selectedPlan === 'monthly' ? '/month' : ' one-time'}
              </span>
            </div>
            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-5 w-5 mr-3 text-green-500" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="relative z-10">
            <DynamicCheckout priceId={selectedPlanDetails.priceId} />
          </CardFooter>
        </MagicCard>
      </div>
    </div>
  );
};

export default Price;
