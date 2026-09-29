import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

const offsets: Record<Direction, string> = {
  up: 'translateY(20px)',
  down: 'translateY(-20px)',
  left: 'translateX(-30px)',
  right: 'translateX(30px)',
};

export function ScrollReveal({ children, direction = 'up', delay = 0, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : offsets[direction],
    transition: `opacity 0.8s cubic-bezier(0.44, 0, 0.56, 1) ${delay}s, transform 0.8s cubic-bezier(0.44, 0, 0.56, 1) ${delay}s`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
