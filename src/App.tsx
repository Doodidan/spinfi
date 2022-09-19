import React, {FC} from 'react';
import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";

import {Login} from "./Login";
import {MainInfo} from "./MainInfo";
import {Failure} from "./Failure";

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <Login/>,
  },
  {
    path: 'success',
    element:
      <MainInfo/>
  },
  {
    path: 'failure',
    element:
      <Failure/>
  }
]);

type AppProps = {};

const App: FC<AppProps> = () => {
  return <RouterProvider router={router}/>;
}

export default App;


