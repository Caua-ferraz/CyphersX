import React from "react";
import Profile from "./Profile";
import Link from "next/link";

/**
 * Navbar Component
 * 
 * This component represents the main navigation bar for the BilQuick application.
 * It displays the app logo/name and the user profile section.
 * 
 * Features:
 * - Responsive layout using Flexbox
 * - Link to home page
 * - Profile component for user account management
 * 
 * Usage:
 * <Navbar />
 */
export default function Navbar() {
	return (
		<div className="flex justify-between items-center h-20">
			{/* Logo/Home link */}
			<Link href="/">
				<h1 className="text-xl font-bold">BilQuick</h1>
			</Link>

			{/* Profile component */}
			<Profile />
		</div>
	);
}

// Customization options:

// 1. Change the logo text
// Replace 'BilQuick' with your app name:
// <h1 className="text-xl font-bold">YourAppName</h1>

// 2. Add a logo image
// Import the Image component from next/image and use it instead of the text:
// import Image from 'next/image';
// ...
// <Image src="/path/to/logo.png" alt="Logo" width={100} height={40} />

// 3. Add more navigation items
// You can add more links to the navbar:
// <div className="flex items-center space-x-4">
//   <Link href="/features">Features</Link>
//   <Link href="/pricing">Pricing</Link>
//   <Link href="/contact">Contact</Link>
// </div>

// 4. Customize the navbar height
// Adjust the 'h-20' class to change the height:
// <div className="flex justify-between items-center h-24"> {/* Taller navbar */}

// 5. Add a background color
// Add a background color class to the main div:
// <div className="flex justify-between items-center h-20 bg-gray-100">

// 6. Make the navbar sticky
// Add 'sticky top-0' classes to keep the navbar at the top when scrolling:
// <div className="flex justify-between items-center h-20 sticky top-0 bg-white z-10">
