//Imports
import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, useLocation, useNavigate, useRouteError} from "react-router-dom";
import loader from "./gif/Spinner.gif";
import Navigation from "./components/adh/Navigation";
import Footer from "./components/adh/Footer";

function RenderErrorBoundary() {
  let error = useRouteError();
  console.error("Route Error: ", error);
  return <div>Something went wrong: {error.message}</div>;
}


const Home = lazy(() => import("./templates/Home"));
const IndicatorExplorer = lazy(() => {
  return import("./components/IndicatorExplorer")
});

const style = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

// Wrapper Component to Pass `useLocation` to IndicatorExplorer
function HomeWrapper() {
  const location = useLocation(); // React Router hook must be called here (inside a component)
  const navigate = useNavigate(); // React Router's useNavigate hook

  return (
    <>
      <Navigation />
      <IndicatorExplorer
        location={location}
        navigate={navigate} // Pass navigate function to class component
      />
      <Footer />
    </>
  );
}

// Define routes using React Router v6's `createBrowserRouter`
const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <HomeWrapper />
      </Suspense>
    ),
    errorElement: <RenderErrorBoundary />, // Custom ErrorBoundary
  },
  // Add more routes here as needed
]);

// Use the `RouterProvider` to provide the router configuration
export default function App() {
  return <RouterProvider router={router} />;
}