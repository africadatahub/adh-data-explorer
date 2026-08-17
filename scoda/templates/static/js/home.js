//Imports
import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation, useNavigate, useRouteError} from "react-router-dom";
import loader from "./gif/Spinner.gif";
import Navigation from "./components/adh/Navigation";
import Footer from "./components/adh/Footer";

function RenderErrorBoundary() {
  let error = useRouteError();
  console.error("Route Error: ", error);
  return <div>Something went wrong: {error.message}</div>;
}

const IndicatorExplorer = lazy(() => import("./components/IndicatorExplorer"));

const style = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

// Wrapper Component to Pass `useLocation` to IndicatorExplorer
function HomeWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <IndicatorExplorer
        location={location}
        navigate={navigate}
      />
      <Footer />
    </>
  );
}

const homeElement = (
  <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
    <HomeWrapper />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/home",
    element: homeElement,
    errorElement: <RenderErrorBoundary />,
  },
  {
    path: "/home/",
    element: homeElement,
    errorElement: <RenderErrorBoundary />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

const rootElement = document.getElementById("content-scoda");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
