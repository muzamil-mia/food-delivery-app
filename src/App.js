
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Error from "./components/Error";

import Contact from "./components/Contact";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Profile from "./components/ProfileClass";
import RestaurantMenu from "./components/RestaurantMenu";

/* My Food App structure will look like this, 
            1) Header
                - Logo
                - Nav Items(right side)
                - Cart
            2) Body
                - Search bar
                - Restaurants List
                    - Restaurant card
                        - Image
                        - Name
                        - Rating
            3) Footer
                - Links
                - Copyrights
       
*/

//AppLayout component to render: Header, Body and Footer component

const AppLayout = () => {
  return (
    <>
      <Header />
      {/* <Body /> */}
      <Outlet/>
      <Footer />
    </>
  )
}

// call createBrowserRouter for routing different pages
export const appRouter = createBrowserRouter([
  {
    Path: "/", // show path for routing
    element: <AppLayout />,  // show component for particular path
    errorElement: <Error />, // show error component for path is different
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
        children : [{
          path:"profile", // parentPath/{path} => localhost:1234/about/profile
          element:<Profile />
        }]
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ]
  },
])

export default AppLayout;