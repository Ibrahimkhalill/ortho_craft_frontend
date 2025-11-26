import { createBrowserRouter } from "react-router";
import SignIn from "../Pages/Authentication/SignIn";
import OtpVerification from "../Pages/Authentication/OtpVerification";
import Dashboard from "../Layouts/Dashboard";
import ResetPass from "../Pages/Authentication/ResetPass";
import ForgetPassword from "../Pages/Authentication/ForgetPassword";
import PublicRoute from "./PublicRoute";
import Landingpage from "../Pages/landing/LandingPage";

// Admin pages
import Home from "../Pages/admin/home/Home";
import SettingsPage from "../Pages/admin/Settings/SettingsPage";

import UserProfile from "../Pages/user/UserProfile";
import Signup from "../Pages/Authentication/Signup";
import UserSignIn from "../Pages/Authentication/UserSignIn";
import PricingPage from "../Pages/landing/pricing/PricingPage";
import WelcomeStep from "../Pages/landing/custom/WelcomeStep";
import UploadStep from "../Pages/landing/custom/UploadStep";
import PreviewStep from "../Pages/landing/custom/PreviewStep";
import DownloadStep from "../Pages/landing/custom/DownloadStep";
import AboutPage from "../Pages/landing/about/About";
import UserManagement from "../Pages/admin/user/UserMangement";
import PricingPlans from "../Pages/admin/subscribtions/PricingPlans";

const router = createBrowserRouter([
  // =====================================
  // ADMIN ROUTES
  // =====================================
  {
    path: "/admin",
    element: <Dashboard />, // uses the menu based on role
    children: [
      { path: "dashboard", element: <Home /> },
      { path: "users", element: <UserManagement /> },
      { path: "pricing", element: <PricingPlans /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },

  // =====================================
  // RESTAURANT ROUTES
  // =====================================

  // =====================================
  // PUBLIC ROUTES (No login required)
  // =====================================
  {
    element: <PublicRoute />,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/user-signin", element: <UserSignIn /> },
      { path: "/signup", element: <Signup /> },
      { path: "/", element: <Landingpage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/user-profile", element: <UserProfile /> },
      { path: "/custom", element: <WelcomeStep /> },
      { path: "/custom/upload", element: <UploadStep /> },
      { path: "/custom/preview", element: <PreviewStep /> },
      { path: "/custom/download", element: <DownloadStep /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/otp", element: <OtpVerification /> },
      { path: "/forgot-password", element: <ForgetPassword /> },
      { path: "/reset_password", element: <ResetPass /> },
    ],
  },
]);

export default router;
