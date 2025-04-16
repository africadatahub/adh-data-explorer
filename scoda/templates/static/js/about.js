// Imports
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import loader from './gif/Spinner.gif';

const About = lazy(() => import('./templates/About'));

const style = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <About />
      </Suspense>
    ),
  },
]);

// Export the Router Provider
export default function App() {
  return <RouterProvider router={router} />;
}