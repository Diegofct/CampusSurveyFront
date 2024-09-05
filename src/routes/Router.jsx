import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { getRole } from '../services/AuthService';
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminNavbar from '../components/Navbar/AdminNavbar.jsx';
import UserNavbar from '../components/Navbar/UserNavbar.jsx';

// Importar componentes diferidos
const Login = lazy(() => import('../pages/Login.jsx'));
const Register = lazy(() => import('../pages/Register.jsx'));
const Home = lazy(() => import('../pages/Home.jsx'));
const SurveyPage = lazy(() => import('../pages/Survey.jsx'));
const ChapterForm = lazy(() => import('../components/Chapter/ChapterForm.jsx'));
const QuestionForm = lazy(() => import('../components/Question/QuestionForm.jsx'));

const Layout = () => {
  const role = getRole();

  return (
    <>
      {role === 'ADMIN' ? <AdminNavbar /> : <UserNavbar />}
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'home',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN', 'USER']}>
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'survey',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN', 'USER']}>
            <Suspense fallback={<div>Loading...</div>}>
              <SurveyPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'survey/chapter/:chapterId',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Suspense fallback={<div>Loading...</div>}>
              <ChapterForm />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'survey/chapter/:chapterId/question/:questionId',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Suspense fallback={<div>Loading...</div>}>
              <QuestionForm />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ]
  },
]);

export default router;
