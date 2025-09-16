import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import About from './components/About/About.jsx';
import ReportIssue from './components/ReportIssue/ReportIssue.jsx';
import TrackMyReport from './components/TrackMyReport.jsx';
import TrendingIssue from './components/TrendingIssue.jsx';
import Contact from './components/Contact/Contact.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <App />,
  },

  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/report",
    element: <ReportIssue/>
  },
  {
    path: "/track-my-report",
    element: <TrackMyReport/>
  },
 
  {
    path: "/trending-issue",
    element: <TrendingIssue/>
  },
  {
    path: "/contact",
    element: <Contact/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  }
 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals(); 