// Imports
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import loader from "./gif/Spinner.gif";

// Lazy-loaded route components
const SoCR = lazy(() => import('./templates/SoCR'));
const CitizenEngagements = lazy(() => import('./templates/CitizenEngagementNew'));
const ServiceDelivery = lazy(() => import('./templates/ServiceDeliveryNew'));
const HumanResources = lazy(() => import('./templates/MunicipalHumanResourcesNew'));
// const CityFinances = lazy(() => import('./templates/CityFinances'));
const PeopleAndHousehold = lazy(() => import('./templates/PeopleAndHousehold'));
const Employment = lazy(() => import('./templates/Employment'));
const Dwellings = lazy(() => import('./templates/Dwellings'));
const HouseholdIncome = lazy(() => import('./templates/HouseholdIncome'));
const LifeExpectancy = lazy(() => import('./templates/LifeExpectancyAndHealth'));
const FoodSecurity = lazy(() => import('./templates/FoodSecurityLiteracyAndInequality'));
const Education = lazy(() => import('./templates/Education'));
const Sustainability = lazy(() => import('./templates/Sustainability'));
const Infrastructure = lazy(() => import('./templates/Infrastrucutre'));
const TransportMode = lazy(() => import('./templates/TransportMode'));
const PublicTransportSpend = lazy(() => import('./templates/PublicTransport'));
const TravelTime = lazy(() => import('./templates/TravelTime'));

// Fallback loading spinner style
const style = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
};

// Route configuration using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <SoCR />
      </Suspense>
    ),
  },
  {
    path: '/citizen_engagement',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <CitizenEngagements />
      </Suspense>
    ),
  },
  {
    path: '/service_delivery',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <ServiceDelivery />
      </Suspense>
    ),
  },
  {
    path: '/human_resources',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <HumanResources />
      </Suspense>
    ),
  },
  {
    path: '/people_household',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <PeopleAndHousehold />
      </Suspense>
    ),
  },
  {
    path: '/employment',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <Employment />
      </Suspense>
    ),
  },
  {
    path: '/dwellings',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <Dwellings />
      </Suspense>
    ),
  },
  {
    path: '/household_income',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <HouseholdIncome />
      </Suspense>
    ),
  },
  {
    path: '/life_expectancy',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <LifeExpectancy />
      </Suspense>
    ),
  },
  {
    path: '/food_security',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <FoodSecurity />
      </Suspense>
    ),
  },
  {
    path: '/education',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <Education />
      </Suspense>
    ),
  },
  {
    path: '/sustainability',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <Sustainability />
      </Suspense>
    ),
  },
  {
    path: '/infrastructure',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <Infrastructure />
      </Suspense>
    ),
  },
  {
    path: '/transport_mode',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <TransportMode />
      </Suspense>
    ),
  },
  {
    path: '/public_transport_spend',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <PublicTransportSpend />
      </Suspense>
    ),
  },
  {
    path: '/travel_time',
    element: (
      <Suspense fallback={<div style={style}><img src={loader} alt="Loader" /></div>}>
        <TravelTime />
      </Suspense>
    ),
  },
]);

// Export the RouterProvider
export default function App() {
  return <RouterProvider router={router} />;
}