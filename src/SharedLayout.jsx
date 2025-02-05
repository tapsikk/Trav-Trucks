import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader/Loader";

const SharedLayout = () => {
  const scrollContainerRef = useRef(null);
  const psInstanceRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (scrollContainerRef.current) {
      psInstanceRef.current = scrollContainerRef.current;
    }
  }, []);


  useEffect(() => {
    if (psInstanceRef.current) {
      psInstanceRef.current.scrollTop = 0;

      const ps = psInstanceRef.current._ps;
      if (ps) {
        ps.update();
      }
    }
  }, [location.pathname]);

  return (
    <div className="layout-wrapper">
      <Navbar />
      <PerfectScrollbar
        containerRef={(ref) => (scrollContainerRef.current = ref)}
        className="ps-container"
      >
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </PerfectScrollbar>
    </div>
  );
};

export default SharedLayout;