
import React, { Suspense, lazy, useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom/client";

//Routing
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./utils/Store";

//Authentication



import UserContext from "./utils/UserContext"
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Contact from "./components/Contact";
import Profile from "./components/ProfileClass";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/Shimmer";
import { useLocation } from "react-router-dom";
import Login from "./components/Login";




/* import Instamart from "./components/Instamart";  
On Demand loading
*/
const Instamart = lazy(() => import("./components/Instamart"));
const About = lazy(() => import("./components/About"));
const Help = lazy(() => import("./components/Help"))


const App = () => {
  return (
    <Provider store={store}>
        <Outlet />
    </Provider>
  )
}

const AppLayout = () => {
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.localStorage.removeItem("fav");
      return '';
    };
  }, [])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
};

// call createBrowserRouter for routing different pages
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
          {
            path: "/about",
            element: (<Suspense fallback={<div className="container"><h1>Loading...</h1></div>}> <About /></Suspense>),
            children: [{
              path: "profile",
              element: <Profile />
            }]
          },
          {
            path: "/contact",
            element: <Contact />
          },
          {
            path: "/",
            element: <Body />
          },
          {
            path: "/restaurant/:resId",
            element: <RestaurantMenu />
          },
          {
            path: "/instamart",
            element: (<Suspense fallback={<Shimmer />}> <Instamart /></Suspense>)
          },
          {
            path: "/help",
            element: (<Suspense fallback={<div className="container"><h1>Loading...</h1></div>}> <Help /></Suspense>)
          }
        ]
      },
      ,
      {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
      }]
  }
]);

export default AppLayout;