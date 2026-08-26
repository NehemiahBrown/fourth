import { Outlet } from "react-router";

import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";

export default function RootLayout() {
  return (
    <div className="w-full mx-auto max-w-4xl">
      <MainHeader />

      <Outlet />

      <MainFooter />
    </div>
  );
}
