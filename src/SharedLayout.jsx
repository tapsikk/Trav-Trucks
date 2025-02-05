import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader/Loader";

const SharedLayout = () => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <PerfectScrollbar className="ps-container">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </PerfectScrollbar>
    </div>
  );
};

export default SharedLayout;