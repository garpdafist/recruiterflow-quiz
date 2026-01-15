import { cn } from "@/lib/utils";

interface AnimatedRocketProps {
  isAnimating?: boolean;
  className?: string;
}

export function AnimatedRocket({ isAnimating = true, className }: AnimatedRocketProps) {
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "w-full h-full",
          isAnimating && "animate-float"
        )}
      >
        <path
          d="M32 4C32 4 20 16 20 36C20 44 24 52 32 56C40 52 44 44 44 36C44 16 32 4 32 4Z"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle
          cx="32"
          cy="28"
          r="6"
          fill="white"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
        />
        <circle
          cx="32"
          cy="28"
          r="3"
          fill="hsl(217 91% 35%)"
        />
        <path
          d="M20 36C20 36 12 38 10 44C12 44 18 42 20 40"
          fill="hsl(217 91% 40%)"
          stroke="hsl(217 91% 35%)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M44 36C44 36 52 38 54 44C52 44 46 42 44 40"
          fill="hsl(217 91% 40%)"
          stroke="hsl(217 91% 35%)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {isAnimating && (
          <g className="animate-pulse">
            <path
              d="M28 56L26 62L32 58L38 62L36 56"
              fill="#FF6B35"
              stroke="#FF4500"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <path
              d="M30 56L29 60L32 58L35 60L34 56"
              fill="#FFD700"
              stroke="#FFA500"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
