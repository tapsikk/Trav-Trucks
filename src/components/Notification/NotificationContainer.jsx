import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../other/ThemeButton/ThemeContext";

const NotificationContainer = () => {
    const { isDarkTheme } = useTheme();

  return (
    <ToastContainer
      position="top-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDarkTheme ? "dark" : "light"}
    />
  );
};

export default NotificationContainer;
