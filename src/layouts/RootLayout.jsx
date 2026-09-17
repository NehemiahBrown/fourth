import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";
import MobileNav from "../components/common/MobileNav.jsx";

export default function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="w-full mx-auto max-w-4xl">
      <MainHeader />
      <main className="flex flex-col min-h-dvh p-4 pb-20 md:pb-0">
        <Outlet />
      </main>
      <MobileNav />

      <MainFooter />
    </div>
  );
}
