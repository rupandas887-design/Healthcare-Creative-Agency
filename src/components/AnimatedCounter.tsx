import React, { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // duration in milliseconds
  formatter?: (val: number) => string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 805,
  formatter = (val) => Math.round(val).toString(),
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const endValue = value;

    if (startValue === endValue) return;

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Quartic out easing function for an executive, ultra-premium feel
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentVal = startValue + (endValue - startValue) * easeProgress;
      
      setDisplayValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  return <span className={className}>{formatter(displayValue)}</span>;
}
