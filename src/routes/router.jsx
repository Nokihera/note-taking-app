import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>
            }
        ]
    },
    {
        path: "/sign-in",
        element: <SignIn/>
    },
    {
        path: "/sign-up",
        element: <SignUp/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
])

export default router