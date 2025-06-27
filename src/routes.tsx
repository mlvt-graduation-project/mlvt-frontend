import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeUser from "./features/home-user";
import { LoginPage, RegistrationPage } from "./features/authentication";
import EmailOTP from "./pages/email_otp";
import VerifyOTP from "./pages/verify_otp";
import Storage from "./features/my-storage";
import ProjectPipeline from "./features/project-pipeline";
import ProtectedRoute from "./components/ProtectedRoute";
import AccountSettings from "./features/account-settings";
import HelpAndSupportPage from "./features/help-and-support";
import AboutPage from "./features/about-us";
import LandingPage from "./features/home-landing";
import {
    MembershipPlansPage,
    MembershipCheckoutPage,
} from "./features/membership-subscription";
import AnimatedLayout from "./components/AnimatedLayout";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        element: <AnimatedLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/",
                element: (
                    <ProtectedRoute>
                        <HomeUser />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/project-pipeline",
                element: (
                    <ProtectedRoute>
                        <ProjectPipeline />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/premium-plan",
                element: (
                    <ProtectedRoute>
                        <MembershipPlansPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/my-storage",
                element: (
                    <ProtectedRoute>
                        <Storage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/checkout/:planId",
                element: (
                    <ProtectedRoute>
                        <MembershipCheckoutPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/signup",
                element: <RegistrationPage />,
            },
            {
                path: "/email-otp",
                element: <EmailOTP />,
            },
            {
                path: "/verify-otp",
                element: <VerifyOTP />,
            },
            {
                path: "/account-settings",
                element: <AccountSettings />,
            },
            {
                path: "/help-and-support",
                element: <HelpAndSupportPage />,
            },
            {
                path: "/about-us",
                element: <AboutPage />,
            },
            {
                path: "/landing",
                element: <LandingPage />,
            },
        ],
    },
]);
