import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Layout, createContacto, loaderData } from './routes/Layout';
import { Errorpage } from './Errorpage';
import { Contact, loader as contactLoader, action as contactAction } from './routes/Contact';
import { Edit, actionEdit } from './routes/Edit';
import { action as destroyAction } from "./routes/Delete";
import { Index } from './routes';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Errorpage />,
    loader: loaderData,
    action: createContacto,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction
      },
      {
        path: "contacts/:contactId/edit",
        element: <Edit />,
        loader: contactLoader,
        action: actionEdit
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! Ha habido un error.</div>,
      },

    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
