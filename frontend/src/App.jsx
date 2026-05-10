import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import LearningPage from "./pages/LearningPage";
import Dashboard from "./pages/Dashboard";
import DevHub from "./pages/DevHub";
import LandingPage from "./pages/LandingPage";
import LearningDetail from "./pages/LearningDetail";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProjectDetail from "./pages/ProjectDetail";
import Register from "./pages/Register";
import TermsAndConditions from "./pages/TermsAndConditions";
import VerifyOtp from "./pages/VerifyOtp";
import AIJobRecommendations from "./pages/AIJobRecommendations";
import AIWorkspace from "./pages/AIWorkspace";


import EditProject from "./pages/EditProject";

import AptitudeLayout from "./pages/aptitude/AptitudeLayout";
import Logical from "./pages/aptitude/Logical";
import MockTest from "./pages/aptitude/MockTest";
import MockTestFull from "./pages/aptitude/MockTestFull";
import Practice from "./pages/aptitude/Practice";
import Quantitative from "./pages/aptitude/Quantitative";
import Technical from "./pages/aptitude/Technical";
import TopicDetail from "./pages/aptitude/TopicDetail";
import Verbal from "./pages/aptitude/Verbal";

function App() {
  const { token } = useContext(AuthContext);
  const isAuthenticated = Boolean(token || localStorage.getItem("token"));

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const nextTheme = savedTheme === "dark" || (!savedTheme && prefersDark);
    document.documentElement.classList.toggle("dark", nextTheme);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const GuestRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Routes>
        <Route path="ai-job-recommendations" element={<AIJobRecommendations />} />

        <Route element={<AptitudeLayout />}>
          <Route index element={<LandingPage />} />

          <Route
            path="learning"
            element={
              <ProtectedRoute>
                <LearningPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="learning/:courseId"
            element={
              <ProtectedRoute>
                <LearningDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          <Route
            path="login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="verify-otp"
            element={
              <GuestRoute>
                <VerifyOtp />
              </GuestRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="terms-and-conditions" element={<TermsAndConditions />} />

          <Route
            path="aptitude"
            element={
              <ProtectedRoute>
                <Navigate to="/aptitude/quantitative" replace />
              </ProtectedRoute>
            }
          />

          <Route
            path="aptitude/quantitative"
            element={
              <ProtectedRoute>
                <Quantitative />
              </ProtectedRoute>
            }
          />

          <Route
            path="aptitude/logical"
            element={
              <ProtectedRoute>
                <Logical />
              </ProtectedRoute>
            }
          />

          <Route
            path="aptitude/verbal"
            element={
              <ProtectedRoute>
                <Verbal />
              </ProtectedRoute>
            }
          />

          <Route
            path="aptitude/technical"
            element={
              <ProtectedRoute>
                <Technical />
              </ProtectedRoute>
            }
          />

          <Route
            path="aptitude/mock"
            element={
              <ProtectedRoute>
                <MockTest />
              </ProtectedRoute>
            }
          />

          <Route
            path="aptitude/:category/:topic"
            element={
              <ProtectedRoute>
                <TopicDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="aptitude/:category/:topic/practice"
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            }
          />

          <Route
            path="aptitude/mock/full"
            element={
              <ProtectedRoute>
                <MockTestFull />
              </ProtectedRoute>
            }
          />

          <Route
            path="DevHub"
            element={
              <ProtectedRoute>
                <DevHub />
              </ProtectedRoute>
            }
          />

          <Route
            path="ai-workspace"
            element={
              <ProtectedRoute>
                <AIWorkspace />
              </ProtectedRoute>
            }
          />

          <Route
            path="ai-workspace/:chatId"
            element={
              <ProtectedRoute>
                <AIWorkspace />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="edit-project/:id"
            element={
              <ProtectedRoute>
                <EditProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="project/:id"
            element={
              <ProtectedRoute>
                <ProjectDetail />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
