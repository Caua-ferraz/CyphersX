import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

/**
 * AccordionProps Interface
 * 
 * Defines the props for the Accordion component.
 * 
 * @property children - The content to be wrapped by the Accordion component.
 * @property type - The type of accordion behavior ('single' or 'multiple').
 * @property collapsible - Whether the accordion items can all be closed.
 * @property className - Optional additional CSS classes to be applied to the wrapper div.
 * @property defaultOpenItems - An array of item values that should be open by default.
 */
interface AccordionProps {
	children: React.ReactNode;
	type?: "single" | "multiple";
	collapsible?: boolean;
	className?: string;
	defaultOpenItems?: string[];
}

/**
 * Accordion Component
 * 
 * A reusable component that creates an accordion structure.
 * 
 * @param {AccordionProps} props - The props for the Accordion component
 */
export function Accordion({ children, type = "single", collapsible = false, className, defaultOpenItems = [] }: AccordionProps) {
	const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems);

	const toggleItem = useCallback((value: string) => {
		setOpenItems(prev => 
			type === "single" 
				? (prev.includes(value) && collapsible ? [] : [value])
				: prev.includes(value)
					? prev.filter(item => item !== value)
					: [...prev, value]
		);
	}, [type, collapsible]);

	return (
		<div className={cn("border rounded-lg", className)}>
			{React.Children.map(children, child => {
				if (React.isValidElement(child) && child.type === AccordionItem) {
					return React.cloneElement(child, { 
						isOpen: openItems.includes(child.props.value as string),
						onToggle: () => toggleItem(child.props.value as string)
					} as Partial<AccordionItemProps>);
				}
				return child;
			})}
		</div>
	);
}

/**
 * AccordionItemProps Interface
 * 
 * Defines the props for the AccordionItem component.
 * 
 * @property value - A unique identifier for the accordion item.
 * @property children - The content of the accordion item.
 * @property className - Optional additional CSS classes.
 * @property isOpen - Whether the accordion item is open.
 * @property onToggle - A callback function to toggle the accordion item.
 */
interface AccordionItemProps {
	value: string;
	children: React.ReactNode;
	className?: string;
	isOpen?: boolean;
	onToggle?: () => void;
}

/**
 * AccordionItem Component
 * 
 * Represents a single item within the Accordion.
 * 
 * @param {AccordionItemProps} props - The props for the AccordionItem component
 */
export function AccordionItem({ value, children, className, isOpen, onToggle }: AccordionItemProps) {
	return (
		<div className={cn("border-b last:border-none", className)}>
			{React.Children.map(children, child => {
				if (React.isValidElement(child)) {
					if (child.type === AccordionTrigger) {
						return React.cloneElement(child, { isOpen, onToggle } as Partial<AccordionTriggerProps>);
					}
					if (child.type === AccordionContent) {
						return React.cloneElement(child, { isOpen } as Partial<AccordionContentProps>);
					}
				}
				return child;
			})}
		</div>
	);
}

/**
 * AccordionTriggerProps Interface
 * 
 * Defines the props for the AccordionTrigger component.
 * 
 * @property children - The content of the accordion trigger (usually a title or summary).
 * @property className - Optional additional CSS classes.
 * @property isOpen - Whether the accordion trigger is open.
 * @property onToggle - A callback function to toggle the accordion trigger.
 */
interface AccordionTriggerProps {
	children: React.ReactNode;
	className?: string;
	isOpen?: boolean;
	onToggle?: () => void;
}

/**
 * AccordionTrigger Component
 * 
 * The clickable part of an accordion item that toggles its content visibility.
 * 
 * @param {AccordionTriggerProps} props - The props for the AccordionTrigger component
 */
export function AccordionTrigger({ children, className, isOpen, onToggle }: AccordionTriggerProps) {
	return (
		<button 
			className={cn("w-full text-left py-4 px-4 flex justify-between items-center", className)}
			onClick={onToggle}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onToggle?.();
				}
			}}
		>
			{children}
			<ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
		</button>
	);
}

/**
 * AccordionContentProps Interface
 * 
 * Defines the props for the AccordionContent component.
 * 
 * @property children - The content to be displayed when the accordion item is expanded.
 * @property className - Optional additional CSS classes.
 * @property isOpen - Whether the accordion content is open.
 */
interface AccordionContentProps {
	children: React.ReactNode;
	className?: string;
	isOpen?: boolean;
}

/**
 * AccordionContent Component
 * 
 * Contains the expandable content of an accordion item.
 * 
 * @param {AccordionContentProps} props - The props for the AccordionContent component
 */
export function AccordionContent({ children, className, isOpen }: AccordionContentProps) {
	return (
		<div 
			className={cn(
				"overflow-hidden transition-all duration-300 ease-in-out",
				isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
				className
			)}
		>
			<div className="px-4 pb-4">{children}</div>
		</div>
	);
}

// Customization options:

// 1. Implement accordion state management
// You can add state management to control which items are open:
// const [openItems, setOpenItems] = useState<string[]>([]);
// 
// function toggleItem(value: string) {
//   setOpenItems(prev => 
//     type === "single" 
//       ? [value]
//       : prev.includes(value)
//         ? prev.filter(item => item !== value)
//         : [...prev, value]
//   );
// }

// 2. Add transition effects
// You can add CSS transitions for smooth opening/closing:
// .accordion-content {
//   max-height: 0;
//   overflow: hidden;
//   transition: max-height 0.3s ease-out;
// }
// .accordion-content.open {
//   max-height: 1000px; // Adjust based on your content
// }

// 3. Customize the accordion trigger icon
// You can add an icon that rotates when the item is open:
// <AccordionTrigger>
//   {children}
//   <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
// </AccordionTrigger>

// 4. Add keyboard accessibility
// Implement keyboard navigation for better accessibility:
// onKeyDown={(e) => {
//   if (e.key === 'Enter' || e.key === ' ') {
//     e.preventDefault();
//     toggleItem(value);
//   }
// }}

// 5. Implement a controlled accordion
// You can make the accordion controlled by passing the open state from a parent component:
// export function Accordion({ children, openItems, onItemToggle, ...props }: AccordionProps & { openItems: string[], onItemToggle: (value: string) => void }) {
//   // ... implementation
// }

// Remember to update your component usage if you implement these customizations.
