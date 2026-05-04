import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate CSS image-set with WebP fallback to PNG
 * Usage: style={{ backgroundImage: imageSetWithFallback('/assets/image') }}
 */
export function imageSetWithFallback(basePath: string): string {
  // Remove extension if present
  const base = basePath.replace(/\.(png|webp|jpg|jpeg)$/i, '');
  // image-set with WebP priority, PNG fallback
  return `image-set(url('${base}.webp') type('image/webp'), url('${base}.png') type('image/png'))`;
}
