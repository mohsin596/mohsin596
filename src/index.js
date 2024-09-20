import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LoginForm from './pages/LoginForm';
import DashboardPage from './pages/DashboardPage';
import ClientFormPage from './pages/ClientFormPage';
import TenantsFormPage from './pages/TenantsSurvey';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/Dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/ClientSurvey/:clientId", // Dynamic route for ClientSurvey
    element: <ClientFormPage />,
  },
  {
    path: "/TenantsSurvey/:tenantId", // Dynamic route for TenantSurvey
    element: <TenantsFormPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);