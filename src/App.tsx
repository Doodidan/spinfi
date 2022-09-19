import React, {useEffect} from 'react';
import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";

import Login from "./Login";

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <Login/>,
  },
  {
    path: 'success',
    element:
      <div>Hooray</div>
  },
  {
    path: 'failure',
    element:
      <div>Failure</div>
  }
]);

export default () => {
  return <RouterProvider router={router}/>
}



