import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home";
import Error from "./pages/error";
import Login from "./pages/login";
import Signup from "./pages/signup";

export const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <Home />,
    //     errorElement: <Error />,
    // },
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: '/signup',
        element: <Signup />,
        errorElement: <Error />,
    }
])