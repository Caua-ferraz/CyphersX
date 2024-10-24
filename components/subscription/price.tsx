"use client"; // Indicates that this component is rendered on the client side

import { CheckCircle2 } from "lucide-react"; // Importing CheckCircle2 icon from lucide-react
import React from "react";
import { Button } from "@/components/ui/button"; // Importing Button component
import { cn } from "@/lib/utils"; // Importing utility function for class names
import Checkout from "./Checkout"; // Importing Checkout component
import useUser from "@/app/hook/useUser"; // Importing custom hook for user data

/**
 * Price Component
 * 
 * This component displays pricing plans for the subscription service.
 * It shows different plans with their details and handles the checkout process.
 */
export default function Price() {
	const { data: user, isLoading } = useUser(); // Using custom hook to get user data and loading state

	// Define the pricing plans
	const prices = [
		{
			title: "Pro",
			description: "Accelerate your SaaS development with our comprehensive boilerplate",
			benefits: [
				"Next.js 14 with App Router",
				"Supabase integration for auth and database",
				"Stripe subscription management",
				"Responsive Tailwind CSS design",
				"Dark mode support",
				"SEO optimization",
				"TypeScript for type safety",
				"React Query for efficient data fetching",
				"Customizable components",
				"Continuous updates and improvements",
			],
			amount: 19.99,
			priceId: "price_1Pvnt52KovIBh20tYw2ahgon",
		},
	];

	// If user data is still loading, return nothing
	if (isLoading) {
		return <></>;
	}

	// If user already has an active subscription, show a message
	if (user?.subscription?.customer_id) {
		return (
			<div className="text-center">
				<p className="text-lg font-medium text-orange-500">You are already a subscriber</p>
				<p className="text-md">
					Subscription ends on: {user.subscription.end_at ? new Date(user.subscription.end_at).toLocaleDateString() : 'N/A'}
				</p>
			</div>
		);
	}

	return (
		<div className="flex justify-center">
			<div className="max-w-md w-full">
				{prices.map((price, index) => {
					const isPopular = index === 1; // Check if it's the "Pro" plan (second in the list)

					return (
						<div
							key={index}
							className="relative border rounded-md p-5 space-y-5"
						>
							{/* Recommended label */}
							<span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
								Recommended
							</span>

							<div className="space-y-3 text-center">
								<h1 className="text-3xl font-bold">{price.title}</h1>
								<div className="flex items-center justify-center">
									<span className="text-4xl font-bold">${price.amount}</span>
									<span className="text-xl ml-1">/month</span>
								</div>
								<p className="text-sm text-gray-400">{price.description}</p>
							</div>

							<div className="space-y-3">
								{price.benefits.map((benefit, index) => (
									<div key={index} className="flex items-center gap-2">
										<CheckCircle2 />
										<h1 className="text-sm text-gray-400">{benefit}</h1>
									</div>
								))}
							</div>
							<Checkout priceId={price.priceId} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

// Usage example:
// <Price />

// Customization options:

// 1. Modify pricing plans
// You can easily modify the `prices` array to change the plans, their details, and pricing:
// const prices = [
//   {
//     title: "Basic",
//     description: "Perfect for individuals",
//     benefits: ["Feature 1", "Feature 2", "Feature 3"],
//     amount: 9.99,
//     priceId: "your_stripe_price_id_here",
//   },
//   // ... add more plans
// ];

// 2. Custom styling
// Modify the className props to change the styling:
// <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
//   {prices.map((price, index) => (
//     <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
//       ...
//     </div>
//   ))}
// </div>

// 3. Add feature comparison
// Implement a feature comparison table for all plans:
// const features = ["Feature 1", "Feature 2", "Feature 3", ...];
// ...
// <table className="w-full mt-10">
//   <thead>
//     <tr>
//       <th>Feature</th>
//       {prices.map(price => <th key={price.title}>{price.title}</th>)}
//     </tr>
//   </thead>
//   <tbody>
//     {features.map(feature => (
//       <tr key={feature}>
//         <td>{feature}</td>
//         {prices.map(price => (
//           <td key={price.title}>
//             {price.benefits.includes(feature) ? "✓" : "✗"}
//           </td>
//         ))}
//       </tr>
//     ))}
//   </tbody>
// </table>

// 4. Add toggle for monthly/yearly pricing
// Implement a toggle to switch between monthly and yearly pricing:
// const [isYearly, setIsYearly] = useState(false);
// ...
// <div className="flex justify-center mb-8">
//   <button onClick={() => setIsYearly(false)}>Monthly</button>
//   <Switch checked={isYearly} onChange={setIsYearly} />
//   <button onClick={() => setIsYearly(true)}>Yearly</button>
// </div>
// ...
// <h1 className="text-3xl font-bold">
//   {isYearly ? price.yearlyAmount : price.monthlyAmount}$
//   {isYearly && <span className="text-sm text-gray-500">/year</span>}
//   {!isYearly && <span className="text-sm text-gray-500">/month</span>}
// </h1>

// 5. Add a custom CTA for enterprise plan
// Replace the Checkout component with a custom CTA for the enterprise plan:
// {price.title === "Enterprise" ? (
//   <Button onClick={() => openEnterpriseModal()}>Contact Sales</Button>
// ) : (
//   <Checkout priceId={price.priceId} />
// )}

// 6. Implement a trial period
// Add information about a trial period if applicable:
// <p className="text-sm text-blue-500 mt-2">
//   {price.trialDays}-day free trial
// </p>

// Remember to adjust import statements if you add new components or move this file.
