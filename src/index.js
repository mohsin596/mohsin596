import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import DashboardPage from './pages/DashboardPage';
import ClientFormPage from './pages/ClientFormPage';
import TenantsFormPage from './pages/TenantsSurvey';
import ProtectedRoute from './components/ProtectedRoute'; 
import SubmitClientForm from './pages/SubmitClientForm';
import SubmitTenantForm from './pages/SubmitTenantForm';
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />,
  },
  {
    path: '/https://survey.mangotech-api.com/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/https://survey.mangotech-api.com/ClientSurvey/:clientId',
    element: (
      <ProtectedRoute>
        <ClientFormPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/https://survey.mangotech-api.com/TenantsSurvey/:tenantId',
    element: (
      <ProtectedRoute>
        <TenantsFormPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/https://survey.mangotech-api.com/SubmitClientForm',
    element: (
      <ProtectedRoute>
        <SubmitClientForm />
      </ProtectedRoute>
    ),
  },
  {
    path: '/https://survey.mangotech-api.com/SubmitTenantForm',
    element: (
      <ProtectedRoute>
        <SubmitTenantForm />
      </ProtectedRoute>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
