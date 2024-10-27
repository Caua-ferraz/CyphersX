"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import useUser from "@/app/hook/useUser";
import { useRouter } from "next/navigation";
import { checkout } from "@/lib/actions/stripe";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import LazyLoad from "@/components/LazyLoad";
import { Stripe, loadStripe } from '@stripe/stripe-js';

interface CheckoutProps {
    priceId: string;
}

export default function Checkout({ priceId }: CheckoutProps) {
    const { data: user } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (user?.id) {
            setLoading(true);
            try {
                const data = JSON.parse(
                    await checkout(
                        user.email,
                        priceId,
                        location.origin + location.pathname
                    )
                );
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
                const res = await stripe?.redirectToCheckout({
                    sessionId: data.id,
                });
                if (res?.error) {
                    alert("Failed to checkout");
                }
            } catch (error) {
                console.error("Checkout error:", error);
                alert("An error occurred during checkout");
            } finally {
                setLoading(false);
            }
        } else {
            router.push("/auth?next=" + location.pathname);
        }
    };

    return (
        <LazyLoad>
            <Button
                className="w-full flex items-center gap-2"
                onClick={handleCheckout}
            >
                Getting Started{" "}
                <AiOutlineLoading3Quarters
                    className={cn("animate-spin", loading ? "block" : "hidden")}
                />
            </Button>
        </LazyLoad>
    );
}


// Usage example:
// <Checkout priceId="price_1234567890" />

// Customization options:

// 1. Custom button text
// You can modify the button text by changing the content:
// <Button ...>
//     Subscribe Now{" "}
//     <AiOutlineLoading3Quarters ... />
// </Button>

// 2. Custom styling
// Modify the Button component's className for custom styling:
// <Button
//     className="w-full flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
//     onClick={handleCheckout}
// >

// 3. Error handling
// Implement a more user-friendly error handling mechanism:
// const [error, setError] = useState<string | null>(null);
// ...
// if (res?.error) {
//     setError("Failed to initiate checkout. Please try again.");
// }
// ...
// {error && <p className="text-red-500 mt-2">{error}</p>}

// 4. Disable button when loading
// Add the disabled prop to the Button component:
// <Button
//     className="w-full flex items-center gap-2"
//     onClick={handleCheckout}
//     disabled={loading}
// >

// 5. Custom loading indicator
// Replace the AiOutlineLoading3Quarters with your own loading component:
// import LoadingSpinner from "@/components/LoadingSpinner";
// ...
// <LoadingSpinner className={cn(loading ? "block" : "hidden")} />

// 6. Add confirmation modal
// Implement a confirmation step before initiating checkout:
// const [showConfirmation, setShowConfirmation] = useState(false);
// ...
// const handleCheckoutClick = () => setShowConfirmation(true);
// ...
// {showConfirmation && (
//     <ConfirmationModal
//         onConfirm={handleCheckout}
//         onCancel={() => setShowConfirmation(false)}
//     />
// )}

// 7. Implement analytics
// Add analytics tracking to monitor checkout initiations:
// import { trackEvent } from "@/lib/analytics";
// ...
// trackEvent("checkout_initiated", { priceId });

// Remember to adjust import statements if you move this component or add new dependencies.
