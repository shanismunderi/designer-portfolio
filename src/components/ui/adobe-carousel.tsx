import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AdobeProduct {
  name: string;
  icon: string;
  gradient: string;
}

const adobeProducts: AdobeProduct[] = [
  {
    name: "Photoshop",
    icon: "Ps",
    gradient: "from-[#31A8FF] to-[#001E36]",
  },
  {
    name: "Illustrator",
    icon: "Ai",
    gradient: "from-[#FF9A00] to-[#330000]",
  },
  {
    name: "InDesign",
    icon: "Id",
    gradient: "from-[#FF3366] to-[#49021F]",
  },
  {
    name: "After Effects",
    icon: "Ae",
    gradient: "from-[#9999FF] to-[#1F0047]",
  },
  {
    name: "Premiere Pro",
    icon: "Pr",
    gradient: "from-[#9999FF] to-[#4A1F6F]",
  },
  {
    name: "XD",
    icon: "Xd",
    gradient: "from-[#FF61F6] to-[#470137]",
  },
  {
    name: "Lightroom",
    icon: "Lr",
    gradient: "from-[#31A8FF] to-[#001D3D]",
  },
  {
    name: "Dimension",
    icon: "Dn",
    gradient: "from-[#4AE8C2] to-[#152D27]",
  },
  {
    name: "Animate",
    icon: "An",
    gradient: "from-[#FF4646] to-[#3B0A0A]",
  },
  {
    name: "Audition",
    icon: "Au",
    gradient: "from-[#9999FF] to-[#00005B]",
  },
];

interface AdobeCarouselProps {
  className?: string;
}

export function AdobeCarousel({ className }: AdobeCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<number>(0);
  const animationRef = useRef<number>();

  // Double the products for seamless loop
  const allProducts = [...adobeProducts, ...adobeProducts];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (!isPaused) {
        scrollRef.current += 0.5;
        
        // Reset when we've scrolled past the first set
        if (scrollRef.current >= container.scrollWidth / 2) {
          scrollRef.current = 0;
        }
        
        container.scrollLeft = scrollRef.current;
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {allProducts.map((product, index) => (
          <div
            key={`${product.name}-${index}`}
            className="flex-shrink-0 group"
          >
            <div className={cn(
              "relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br flex items-center justify-center",
              "transform transition-all duration-500 hover:scale-110 hover:-translate-y-2",
              "shadow-lg hover:shadow-2xl cursor-pointer",
              product.gradient
            )}>
              {/* Adobe Icon Text */}
              <span className="text-2xl md:text-3xl font-bold text-white/90">
                {product.icon}
              </span>
              
              {/* Glow Effect */}
              <div className={cn(
                "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl -z-10",
                `bg-gradient-to-br ${product.gradient}`
              )} />
            </div>
            
            {/* Product Name - Shows on Hover */}
            <p className="text-center text-sm text-muted-foreground mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
              {product.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
