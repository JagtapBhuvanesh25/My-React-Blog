import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import store from './store/store.js'
import App from './App.jsx'
import pages from './pages/index.js'   // <-- fixed import
import AuthLayout from './components/AuthLayout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <pages.Home /> },

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <pages.Login />
          </AuthLayout>
        ),
      },

      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <pages.Signup />
          </AuthLayout>
        ),
      },

      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <pages.AllPosts />
          </AuthLayout>
        ),
      },

      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <pages.AddPost />
          </AuthLayout>
        ),
      },

      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <pages.EditPost />
          </AuthLayout>
        ),
      },

      {
        path: "/post/:slug",
        element: <pages.Post />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)