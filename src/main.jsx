import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import AppRouter from './routes/Router';
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={AppRouter} />
      <ToastContainer />
    </Suspense>
  </StrictMode>
)
