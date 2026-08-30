import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const NO_NAVBAR_PATHS = ["/login", "/register"];

export default function Layout() {
  const location = useLocation();
  const hideNavbar = NO_NAVBAR_PATHS.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="hs-page">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
