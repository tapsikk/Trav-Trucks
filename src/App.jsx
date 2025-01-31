import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./SharedLayout";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const Favorites = lazy(() => import("./pages/FavoritesPage/Favorites"));


function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="/catalog" element={<MainPage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;
