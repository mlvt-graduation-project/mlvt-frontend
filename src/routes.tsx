import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home";
import Error from "./pages/error";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SignupSuccess from "./pages/signup_success";
import EmailOTP from "./pages/email_otp";
import VerifyOTP from "./pages/verify_otp";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: '/signup',
        element: <Signup />,
        errorElement: <Error />,
    },
    {
        path: '/signup_success',
        element: <SignupSuccess />,
        errorElement: <Error />,
    },
    {
        path: '/email_otp',
        element: <EmailOTP />,
        errorElement: <Error />,
    },
    {
        path: '/verify_otp',
        element: <VerifyOTP />,
        errorElement: <Error />,
    }
])