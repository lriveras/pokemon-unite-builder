import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppShell } from './components/layout/AppShell';

const BuilderPage = lazy(() => import('./pages/BuilderPage'));
const ReportPage = lazy(() => import('./pages/ReportPage'));
const StatsLabPage = lazy(() => import('./pages/StatsLabPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const DatabasePage = lazy(() => import('./pages/DatabasePage'));
const ItemsPage = lazy(() => import('./pages/ItemsPage'));
const MapsPage = lazy(() => import('./pages/MapsPage'));
const LicensesPage = lazy(() => import('./pages/LicensesPage'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-slate-400 text-sm">Loading...</div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Suspense fallback={<LoadingFallback />}><BuilderPage /></Suspense> },
      { path: 'report', element: <Suspense fallback={<LoadingFallback />}><ReportPage /></Suspense> },
      { path: 'stats-lab', element: <Suspense fallback={<LoadingFallback />}><StatsLabPage /></Suspense> },
      { path: 'compare', element: <Suspense fallback={<LoadingFallback />}><ComparePage /></Suspense> },
      { path: 'database', element: <Suspense fallback={<LoadingFallback />}><DatabasePage /></Suspense> },
      { path: 'items', element: <Suspense fallback={<LoadingFallback />}><ItemsPage /></Suspense> },
      { path: 'maps', element: <Suspense fallback={<LoadingFallback />}><MapsPage /></Suspense> },
      { path: 'licenses', element: <Suspense fallback={<LoadingFallback />}><LicensesPage /></Suspense> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
