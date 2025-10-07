import { useEffect, useRef } from "react";

interface SwipeHandlerProps {
  onSwipe: (direction: "left" | "right" | "up" | "down") => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export function SwipeHandler({ onSwipe, children, disabled = false }: SwipeHandlerProps) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isCoolingDown = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isTrackpadScrolling = false;
    let trackpadDeltaX = 0;
    let trackpadDeltaY = 0;
    const TRACKPAD_THRESHOLD = 100;

    const handleSwipeWithCooldown = (direction: "left" | "right" | "up" | "down") => {
      if (isCoolingDown.current || disabled) return;
      onSwipe(direction);
      isCoolingDown.current = true;
      setTimeout(() => {
        isCoolingDown.current = false;
      }, 500); // 500ms cooldown
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      const minSwipeDistance = 100;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX > minSwipeDistance || absY > minSwipeDistance) {
        if (absX > absY) {
          handleSwipeWithCooldown(deltaX > 0 ? "right" : "left");
        } else {
          handleSwipeWithCooldown(deltaY > 0 ? "down" : "up");
        }
      }

      touchStartRef.current = null;
    };

    // Trackpad/wheel events for desktop
    const handleWheel = (e: WheelEvent) => {
      // Detect trackpad vs mouse wheel
      const isTrackpad = Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) < 100;
      
      if (isTrackpad) {
        // Check if we're scrolling within content or at boundaries
        const target = e.target as Element;
        const scrollContainer = target.closest('[class*="overflow-auto"], [class*="overflow-y-auto"], [class*="overflow-scroll"]');
        
        // If there's a scroll container, check scroll boundaries
        if (scrollContainer) {
          const { scrollTop, scrollHeight, clientHeight, scrollLeft } = scrollContainer;
          
          // Horizontal navigation detection
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30) {
            const atLeftEdge = scrollLeft <= 0;
            
            if (atLeftEdge) { 
              e.preventDefault();
              handleSwipeWithCooldown(e.deltaX > 0 ? "right" : "left");
              return;
            }
          }
          
          // Vertical navigation detection
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 30) {
            const atTop = scrollTop <= 0;
            const atBottom = scrollTop >= scrollHeight - clientHeight;
            
            if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
              e.preventDefault();
              handleSwipeWithCooldown(e.deltaY > 0 ? "down" : "up");
              return;
            }
          }
          
          // Allow normal scrolling within content
          return;
        }
        
        // If no scroll container, use gesture-based navigation with higher threshold
        if (Math.abs(e.deltaX) > 50 || Math.abs(e.deltaY) > 50) {
          e.preventDefault();
          
          if (!isTrackpadScrolling) {
            isTrackpadScrolling = true;
            trackpadDeltaX = 0;
            trackpadDeltaY = 0;
          }

          trackpadDeltaX += e.deltaX;
          trackpadDeltaY += e.deltaY;

          // Reset timer
          clearTimeout((window as any).trackpadTimer);
          (window as any).trackpadTimer = setTimeout(() => {
            if (Math.abs(trackpadDeltaX) > TRACKPAD_THRESHOLD || Math.abs(trackpadDeltaY) > TRACKPAD_THRESHOLD) {
              if (Math.abs(trackpadDeltaX) > Math.abs(trackpadDeltaY)) {
                handleSwipeWithCooldown(trackpadDeltaX > 0 ? "right" : "left");
              } else {
                handleSwipeWithCooldown(trackpadDeltaY > 0 ? "down" : "up");
              }
            }
            isTrackpadScrolling = false;
            trackpadDeltaX = 0;
            trackpadDeltaY = 0;
          }, 150);
        }
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handleSwipeWithCooldown("left");
          break;
        case "ArrowRight":
          e.preventDefault();
          handleSwipeWithCooldown("right");
          break;
        case "ArrowDown":
          e.preventDefault();
          handleSwipeWithCooldown("down");
          break;
        case "ArrowUp":
          e.preventDefault();
          handleSwipeWithCooldown("up");
          break;
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout((window as any).trackpadTimer);
    };
  }, [onSwipe]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {children}
    </div>
  );
}