"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Additional class name for the input element */
  className?: string;
  /** Error message to display */
  error?: string;
  /** Label for the input */
  label?: string;
  /** Icon to display before the input */
  leftIcon?: React.ReactNode;
  /** Icon to display after the input */
  rightIcon?: React.ReactNode;
  /** Callback function when the right icon is clicked */
  onRightIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, leftIcon, rightIcon, onRightIconClick, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputId = React.useId();

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
      if (onRightIconClick) onRightIconClick();
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={inputType}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={type === 'password' ? togglePasswordVisibility : onRightIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" id={`${inputId}-error`}>
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }

// Customization and usage examples:

// 1. Basic usage
// <Input placeholder="Enter your name" />

// 2. With label
// <Input label="Email" type="email" placeholder="Enter your email" />

// 3. With error message
// <Input
//   label="Password"
//   type="password"
//   error="Password must be at least 8 characters long"
// />

// 4. With icons
// import { Mail, Eye, EyeOff } from 'lucide-react'
// 
// <Input
//   label="Email"
//   type="email"
//   leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
// />
// 
// <Input
//   label="Password"
//   type="password"
//   rightIcon={showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
// />

// 5. Custom styling
// <Input
//   className="bg-gray-100 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//   placeholder="Custom styled input"
// />

// 6. Disabled state
// <Input disabled placeholder="This input is disabled" />

// 7. With maxLength and character count
// const [text, setText] = React.useState('');
// const maxLength = 100;
// 
// <div>
//   <Input
//     value={text}
//     onChange={(e) => setText(e.target.value)}
//     maxLength={maxLength}
//   />
//   <p className="text-sm text-gray-500 mt-1">
//     {text.length}/{maxLength} characters
//   </p>
// </div>

// 8. With autocomplete
// <Input
//   label="Country"
//   list="countries"
//   placeholder="Select or type a country"
// />
// <datalist id="countries">
//   <option value="United States" />
//   <option value="Canada" />
//   <option value="United Kingdom" />
//   {/* Add more options as needed */}
// </datalist>

// Note: Remember to install and set up any icon libraries you want to use, such as lucide-react or @heroicons/react
