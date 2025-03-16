import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Homepage';
import './App.css'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const router = createBrowserRouter([
    {path: '/',element: <HomePage />},
    {path:"/login",element:<LoginPage/>},
    {path:"/register",element:<RegisterPage/>}

    
  
  ])

  return <RouterProvider router={router} />;
}

export default App
