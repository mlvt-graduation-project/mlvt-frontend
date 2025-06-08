import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import Error from "./pages/error";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SignupSuccess from "./pages/signup_success";
import EmailOTP from "./pages/email_otp";
import VerifyOTP from "./pages/verify_otp";
import Storage from "./pages/storage";
import ProtectedRoute from "./components/ProtectedRoute";
import EditAccount from "./pages/edit_account";
import HelpAndSupportPage from "./pages/help_and_support";
import AboutPage from "./pages/about_us";
import LandingPage from "./pages/landing";
import MembershipPremium from "./pages/membership_premium";
import AnimatedLayout from "./components/AnimatedLayout";

export const router = createBrowserRouter([
  {
    element: <AnimatedLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/premium_membership",
        element: (
          <ProtectedRoute>
            <MembershipPremium />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signup_success",
        element: <SignupSuccess />,
      },
      {
        path: "/email_otp",
        element: <EmailOTP />,
      },
      {
        path: "/verify_otp",
        element: <VerifyOTP />,
      },
      {
        path: "/storage",
        element: <Storage />,
      },
      {
        path: "/edit_account",
        element: <EditAccount />,
      },
      {
        path: "/help_and_support",
        element: <HelpAndSupportPage />,
      },
      {
        path: "/about_us",
        element: <AboutPage />,
      },
      {
        path: "/landing",
        element: <LandingPage />,
      },
    ],
  },
]);
