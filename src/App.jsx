import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./SharedLayout";

const WelcomePage = lazy(() => import("./components/pages/WelcomePage/WelcomePage"));
const MainPage = lazy(() => import("./components/pages/MainPage/MainPage"));
// const FavPage = lazy(() => import("./pages/FavPage/FavPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="catalog" element={<MainPage />} />
        {/* <Route path="fav" element={<FavPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
