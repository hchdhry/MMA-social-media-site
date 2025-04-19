import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Homepage';
import './App.css'
import { Toaster } from 'sonner';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FighterService from './pages/FighterService';
import GymService from './pages/GymService';
import CommentsPage from './pages/CommentsPage';
import ChatRoom from './pages/ChatRoom';
import EventsPage from './pages/EventsPage';
import About from './pages/About';
import CreateFighterForm from './pages/CreateFighter';
import AdminEvents from './AdminEvents';
import NotFound from './pages/404';
import FighterDelete from './pages/FighterDelete';
import FighterCompanion from './pages/FightCompanion';
import Contact from './pages/Contact';
import ManageArticles from './pages/ManageArticles';
import EditArticle from './pages/EditArticle';
import CreateArticle from './pages/CreateArticle';
import ReadArticle from './pages/ReadArticle';
import BrowseArticles from './pages/BrowseArticles';

function App() {
  const router = createBrowserRouter([
    {path: '/',element: <HomePage />},
    {path:"/login",element:<LoginPage/>},
    {path:"/register",element:<RegisterPage/>},
    {path:"/fighters",element:<FighterService/>},
    {path:"/Gym",element:<GymService/>},
    { path:"/Comments/:fighterId",element:<CommentsPage/>},
    {path:"/events",element:<EventsPage/>},
    {path:"/chat/:eventId",element:<ChatRoom/>},
    {path:"/About",element:<About/>},
    { path: "/create-fighter" , element: <CreateFighterForm/>},
    {path:"/AdminEvents",element:<AdminEvents/>},
    {path:"/FighterDelete",element:<FighterDelete/>},
    {path:"/FightCompanion",element:<FighterCompanion/>},
    {path:"*",element:<NotFound/>},
    {path:"/Contact",element:<Contact/>},
    {path:"/ManageArticles",element:<ManageArticles/>},
    {path:"/EditArticle/:id",element:<EditArticle/>},
    {path:"/CreateArticle",element:<CreateArticle/>},
    {path:"/ReadArticle/:id",element:<ReadArticle />},
    {path:"/BrowseArticles",element:<BrowseArticles />},


    
  
  ])

  return ((
    <div>
   
      <Toaster position="top-right" theme="dark" /> 

      <RouterProvider router={router} />
    </div>
  ))
}

export default App
