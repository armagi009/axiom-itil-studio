import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { DashboardPage } from '@/pages/DashboardPage';
import { PluginFactoryPage } from '@/pages/PluginFactoryPage';
import { SavingsLedgerPage } from '@/pages/SavingsLedgerPage';
import { ContributorHubPage } from '@/pages/ContributorHubPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "plugins", element: <PluginFactoryPage /> },
      { path: "savings", element: <SavingsLedgerPage /> },
      { path: "contributors", element: <ContributorHubPage /> },
      // Add routes for settings and support later
      { path: "settings", element: <div>Settings Page (Coming Soon)</div> },
      { path: "support", element: <div>Support Page (Coming Soon)</div> },
    ]
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)