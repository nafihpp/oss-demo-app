import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for proper merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility for consistent focus styles
 */
export const focusRing = 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400';

/**
 * Utility for button hover states
 */
export const hoverTransition = 'transition-colors duration-200';

/**
 * Common text styles
 */
export const textStyles = {
  heading: 'text-[#333] font-semibold not-italic leading-normal tracking-normal',
  body: 'text-black/50',
  error: 'text-red-600',
  success: 'text-green-600',
} as const;