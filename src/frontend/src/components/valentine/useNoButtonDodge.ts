import { useState, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseNoButtonDodgeOptions {
  enabled?: boolean;
}

export function useNoButtonDodge(options: UseNoButtonDodgeOptions = {}) {
  const { enabled = true } = options;
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize button position at center
  useEffect(() => {
    if (containerRef.current && !isInitialized) {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      setPosition({
        x: rect.width / 2 + 100, // Offset to the right of Yes button
        y: rect.height / 2
      });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!enabled || !buttonRef.current || !containerRef.current) return;

    const button = buttonRef.current;
    const container = containerRef.current;

    const handlePointerMove = (e: PointerEvent) => {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      // Get pointer position relative to container
      const pointerX = e.clientX - containerRect.left;
      const pointerY = e.clientY - containerRect.top;

      // Get button center relative to container
      const buttonCenterX = position.x;
      const buttonCenterY = position.y;

      // Calculate distance
      const dx = pointerX - buttonCenterX;
      const dy = pointerY - buttonCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Dodge threshold
      const dodgeDistance = 150;

      if (distance < dodgeDistance) {
        // Calculate repulsion direction (away from pointer)
        const angle = Math.atan2(dy, dx);
        const repulsionDistance = 120;

        let newX = buttonCenterX - Math.cos(angle) * repulsionDistance;
        let newY = buttonCenterY - Math.sin(angle) * repulsionDistance;

        // Clamp to container bounds with padding
        const padding = 60;
        newX = Math.max(padding, Math.min(containerRect.width - padding, newX));
        newY = Math.max(padding, Math.min(containerRect.height - padding, newY));

        setPosition({ x: newX, y: newY });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        const touchX = touch.clientX - containerRect.left;
        const touchY = touch.clientY - containerRect.top;

        const buttonCenterX = position.x;
        const buttonCenterY = position.y;

        const dx = touchX - buttonCenterX;
        const dy = touchY - buttonCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const dodgeDistance = 100;

        if (distance < dodgeDistance) {
          e.preventDefault();
          
          const angle = Math.atan2(dy, dx);
          const repulsionDistance = 120;

          let newX = buttonCenterX - Math.cos(angle) * repulsionDistance;
          let newY = buttonCenterY - Math.sin(angle) * repulsionDistance;

          const padding = 60;
          newX = Math.max(padding, Math.min(containerRect.width - padding, newX));
          newY = Math.max(padding, Math.min(containerRect.height - padding, newY));

          setPosition({ x: newX, y: newY });
        }
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('touchstart', handleTouchStart);
    };
  }, [position, enabled]);

  return { position, buttonRef, containerRef };
}
