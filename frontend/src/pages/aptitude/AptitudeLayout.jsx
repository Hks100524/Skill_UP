import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function AptitudeLayout() {
  const location = useLocation();
  const isLearningRoute = location.pathname.startsWith("/learning");
  const hideNavbar =
    ["/login", "/register", "/verify-otp", "/dashboard"].includes(
      location.pathname,
    ) ||
    isLearningRoute ||
    location.pathname.startsWith("/ai-workspace");
  const contentOffsetClass = "pt-20";

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const targetElement = document.getElementById(location.hash.slice(1));
    if (!targetElement) {
      return;
    }

    requestAnimationFrame(() => {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash, location.pathname]);

  return (
    <>
      {!hideNavbar ? <Navbar /> : null}
      {hideNavbar ? <Outlet /> : <div className={contentOffsetClass}><Outlet /></div>}
    </>
  );
}
