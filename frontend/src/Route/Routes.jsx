import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import SignUp from "../pages/SignUp";
import Blogs from "../pages/Blogs";
import CreateBlog from "../pages/CreateBlog";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import BlogDetails from "../pages/BlogDetails";
import EditBlog from "../pages/EditBlog";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Blogs></Blogs>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/createblog",
        element: (
          <PrivateRoute>
            <CreateBlog></CreateBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/favorites",
        element: <Favorites></Favorites>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/logout",
        element: <Logout></Logout>,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "/editblog/:id",
        element: <EditBlog></EditBlog>,
      },
    ],
  },
]);
