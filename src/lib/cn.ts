import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Standard className utility — merges Tailwind classes without conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
