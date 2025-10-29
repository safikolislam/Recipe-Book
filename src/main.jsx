import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router/router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';

import AuthProvider from './Provider/AuthProvider';





const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="montserrat-normal">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
    <ToastContainer position="top-right" autoClose={2000} />
  </StrictMode>
);


