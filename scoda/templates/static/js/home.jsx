import React from "react";
import { createRoot } from "react-dom/client"; // React 18+ API
import App from "./home"; // Import the App component from home.js

// Find the root element where React will render the app
const rootElement = document.getElementById("content-scoda");

// Use createRoot to initialize React rendering
if (rootElement) {
	const root = createRoot(rootElement);
	root.render(<App />); // Render App as JSX by wrapping it in angle brackets
}