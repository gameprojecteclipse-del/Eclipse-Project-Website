import { cn } from "@/lib/utils";

interface PictureBackgroundProps {
  src: string; // base path without extension, e.g., "/assets/Extraction"
  alt: string;
  className?: string;
  imgClassName?: string;
}

/**
 * Background image component with WebP/PNG fallback using <picture>
 * Replaces Tailwind bg-[url()] with proper format fallback
 */
export const PictureBackground = ({ 
  src, 
  alt, 
  className, 
  imgClassName 
}: PictureBackgroundProps) => {
  const base = src.replace(/\.(png|webp|jpg|jpeg)$/i, '');
  
  return (
    <picture className={cn("absolute inset-0", className)}>
      <source srcSet={`${base}.webp`} type="image/webp" />
      <source srcSet={`${base}.png`} type="image/png" />
      <img 
        src={`${base}.png`}
        alt={alt}
        className={cn("w-full h-full object-cover", imgClassName)}
        loading="eager"
        decoding="async"
      />
    </picture>
  );
};
