import React from "react";
import Link from "next/link";
import { FaBolt } from 'react-icons/fa';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <input type="checkbox" id="menu-toggle" className="hidden peer" />
        <div className="flex justify-between items-center">
          <Link href="/" className="group flex items-center space-x-2 text-xl font-bold text-primary transition-all duration-300 ease-in-out">
            <FaBolt className="text-2xl transform group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative">
              Nexly
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* Mobile Menu Toggle Icon */}
          <div className="md:hidden">
            <label htmlFor="menu-toggle" className="cursor-pointer">
              <Menu className="text-white" />
            </label>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className="mt-2 md:hidden hidden peer-checked:block">
        </div>
      </div>
    </nav>
  );
}