import React from "react";

const InfoIcon = () => (

        <button
        type="button"
        aria-label="Chart information"
        onClick={() => console.log("Info icon clicked")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          border: 0,
          borderRadius: "50%",
          background: "transparent",
          cursor: "pointer",
          lineHeight: 0,
          color: "#f1f5f9",    // light gray for dark header; change to "#444" on light bg
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </button>
)

export default InfoIcon;