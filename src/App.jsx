import { useState } from "react";
import Form from "./Form";
import Uplode from "./Uplode";
import Dummyarray from "./Dummyarray"
import Missingnumber from "./Missingnumber"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
           <Uplode />
        </>
      ),
    },
    {
      path: "/form",
      element: (
        <>
         <Form />
        </>
      ),
    },
    {
      path: "/dummyarray",
      element: (
        <>
          <Dummyarray />
        </>
      ),
    },
    {
      path: "/missingnumber",
      element: (
        <>
          <Missingnumber />
        </>
      ),
    },
     {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
     {
      path: "/register",
      element: (
        <>
          <Register />
        </>
      ),
    },
     {
      path: "/profile",
      element: (
        <>
          <Profile />
        </>
      ),
    },
  ]);
  return (
     
       <>
      <RouterProvider router={router} />
    </>
    

  );
}

export default App;
