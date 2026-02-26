"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";

/**
 * Tooltip Component
 * 
 * A lightweight, accessible tooltip component that appears on hover or focus.
 * 
 * @param {React.ReactNode} children - The trigger element for the tooltip.
 * @param {string} content - The text content to display in the tooltip.
 * @param {string} position - The position of the tooltip relative to the trigger (top, bottom, left, right).
 * @param {string} className - Additional CSS classes for the tooltip container.
 */
const Tooltip = ({ 
  children, 
  content, 
  position = "top", 
  delay = 200,
  className 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        let x = 0;
        let y = 0;

        switch (position) {
          case "top":
            x = rect.left + rect.width / 2;
            y = rect.top;
            break;
          case "bottom":
            x = rect.left + rect.width / 2;
            y = rect.bottom;
            break;
          case "left":
            x = rect.left;
            y = rect.top + rect.height / 2;
            break;
          case "right":
            x = rect.right;
            y = rect.top + rect.height / 2;
            break;
          default:
            x = rect.left + rect.width / 2;
            y = rect.top;
        }

        setCoords({ x, y });
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: "-translate-x-1/2 -translate-y-full mb-2",
    bottom: "-translate-x-1/2 translate-y-0 mt-2",
    left: "-translate-x-full -translate-y-1/2 mr-2",
    right: "translate-x-0 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "bottom-[-4px] left-1/2 -translate-x-1/2 border-t-slate-800 border-x-transparent border-t-4",
    bottom: "top-[-4px] left-1/2 -translate-x-1/2 border-b-slate-800 border-x-transparent border-b-4",
    left: "right-[-4px] top-1/2 -translate-y-1/2 border-l-slate-800 border-y-transparent border-l-4",
    right: "left-[-4px] top-1/2 -translate-y-1/2 border-r-slate-800 border-y-transparent border-r-4",
  };

  return (
    <div 
      className={cn("relative inline-block", className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      ref={triggerRef}
    >
      {children}
      {isVisible && (
        <div 
          className={cn(
            "fixed z-[9999] px-2 py-1 text-xs font-medium text-white bg-slate-800 rounded shadow-lg pointer-events-none whitespace-nowrap animate-in fade-in zoom-in duration-150",
            positionClasses[position]
          )}
          style={{ 
            left: `${coords.x}px`, 
            top: `${coords.y}px` 
          }}
          role="tooltip"
        >
          {content}
          <div className={cn("absolute w-0 h-0 border-4", arrowClasses[position])} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
