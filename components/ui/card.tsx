import React from "react";
import { cn } from "@/lib/utils";

/**
 * CardProps Interface
 * 
 * Defines the props for the Card component.
 * 
 * @property children - The content to be wrapped by the Card component.
 * @property className - Optional additional CSS classes to be applied to the card.
 */
interface CardProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * Card Component
 * 
 * A basic card component that provides a container with a white background,
 * shadow, and rounded corners.
 * 
 * @param {CardProps} props - The props for the Card component
 */
export function Card({ children, className }: CardProps) {
	return <div className={cn("bg-transparent border-black shadow-md rounded-lg", className)}>{children}</div>;
}

/**
 * CardHeaderProps Interface
 * 
 * Defines the props for the CardHeader component.
 * 
 * @property children - The content to be placed in the card header.
 * @property className - Optional additional CSS classes for the header.
 */
interface CardHeaderProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * CardHeader Component
 * 
 * Represents the header section of a card, typically used for titles or key information.
 * 
 * @param {CardHeaderProps} props - The props for the CardHeader component
 */
export function CardHeader({ children, className }: CardHeaderProps) {
	return <div className={cn("p-4 border-b", className)}>{children}</div>;
}

/**
 * CardTitleProps Interface
 * 
 * Defines the props for the CardTitle component.
 * 
 * @property children - The content of the card title.
 * @property className - Optional additional CSS classes for the title.
 */
interface CardTitleProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * CardTitle Component
 * 
 * Represents the title of a card, typically used within a CardHeader.
 * 
 * @param {CardTitleProps} props - The props for the CardTitle component
 */
export function CardTitle({ children, className }: CardTitleProps) {
	return <h2 className={cn("text-2xl font-semibold", className)}>{children}</h2>;
}

/**
 * CardContentProps Interface
 * 
 * Defines the props for the CardContent component.
 * 
 * @property children - The main content of the card.
 * @property className - Optional additional CSS classes for the content area.
 */
interface CardContentProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * CardContent Component
 * 
 * Represents the main content area of a card.
 * 
 * @param {CardContentProps} props - The props for the CardContent component
 */
export function CardContent({ children, className }: CardContentProps) {
	return <div className={cn("p-4", className)}>{children}</div>;
}

// Add CardDescription component
interface CardDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
	return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

// Add CardFooter component
interface CardFooterProps {
	children: React.ReactNode;
	className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
	return <div className={cn("p-4 border-t", className)}>{children}</div>;
}

// Customization options:

// 1. Implement card variants
// You can create a variants object similar to the button component:
// const cardVariants = cva("rounded-lg", {
//   variants: {
//     variant: {
//       default: "bg-white shadow-md",
//       outlined: "bg-transparent border border-gray-300",
//       elevated: "bg-white shadow-lg",
//     },
//   },
//   defaultVariants: {
//     variant: "default",
//   },
// });
// 
// Then update the Card component to use these variants:
// export function Card({ children, className, variant }: CardProps & VariantProps<typeof cardVariants>) {
//   return <div className={cn(cardVariants({ variant }), className)}>{children}</div>;
// }

// 3. Add hover effects
// You can add hover effects to the Card component:
// export function Card({ children, className }: CardProps) {
//   return <div className={cn("bg-white shadow-md rounded-lg transition-shadow hover:shadow-lg", className)}>{children}</div>;
// }

// 4. Implement a loading state
// Add a loading prop and skeleton effect:
// interface CardProps {
//   // ... existing props
//   isLoading?: boolean;
// }
// 
// export function Card({ children, className, isLoading }: CardProps) {
//   if (isLoading) {
//     return <div className={cn("bg-gray-200 animate-pulse rounded-lg h-48", className)}></div>;
//   }
//   return <div className={cn("bg-white shadow-md rounded-lg", className)}>{children}</div>;
// }

// 5. Add a CardImage component
// export function CardImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
//   return <img src={src} alt={alt} className={cn("w-full h-48 object-cover rounded-t-lg", className)} />;
// }

// 6. Implement responsive sizing
// You can add responsive classes to adjust the card's size on different screen sizes:
// export function Card({ children, className }: CardProps) {
//   return <div className={cn("bg-white shadow-md rounded-lg w-full sm:w-64 md:w-80 lg:w-96", className)}>{children}</div>;
// }

// Remember to update your component usage and types if you implement these customizations.
