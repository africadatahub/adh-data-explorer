// Tooltip.jsx
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Tooltip = ({ title, description, trigger }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, place: "top" });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    const tooltipH = tooltipRef.current?.offsetHeight || 0;
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    const place = spaceAbove < tooltipH + 16 && spaceBelow > spaceAbove ? "bottom" : "top";

    const top =
      place === "top"
        ? scrollY + rect.top - 8 // margin
        : scrollY + rect.bottom + 8;

    const left = scrollX + rect.left + rect.width / 2;

    setPosition({ top, left, place });
  }, [isVisible]);

  const portalStyles = {
    position: "absolute",
    top: position.top,
    left: position.left,
    transform: "translateX(-50%)" + (position.place === "top" ? " translateY(-100%)" : ""),
    width: "380px",
    maxWidth: "calc(100vw - 32px)",
    zIndex: 100000, // higher than any app/menu
    pointerEvents: "none", // so hover stays on trigger
  };

  const bubbleStyles = {
    backgroundColor: "#1f2937",
    border: "1px solid #374151",
    borderRadius: 8,
    boxShadow: "0 10px 25px -5px rgba(0,0,0,.25)",
    padding: 16,
  };

  const arrowStyles = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%) rotate(45deg)",
    width: 8,
    height: 8,
    backgroundColor: "#1f2937",
    ...(position.place === "top"
      ? { bottom: -4, borderRight: "1px solid #374151", borderBottom: "1px solid #374151" }
      : { top: -4, borderLeft: "1px solid #374151", borderTop: "1px solid #374151" }),
  };

  return (
    <div
      ref={triggerRef}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "help" }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {trigger}
      {isVisible &&
        createPortal(
          <div ref={tooltipRef} style={portalStyles}>
            <div style={bubbleStyles}>
              <h4 style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#f9fafb" }}>{title}</h4>
              <p style={{ margin: 0, marginTop: 8, fontSize: 14, color: "#d1d5db", lineHeight: 1.5 }}>
                {description}
              </p>
              <div style={arrowStyles} />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
