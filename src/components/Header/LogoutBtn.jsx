import { useDispatch } from "react-redux";
import authService from "../../Appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then((res) => {
        if (res !== false) {
          dispatch(logout());
        }
      })
      .catch(() => {
        // ignore failures silently
      });
  };

  return (
    <button
      onClick={logoutHandler}
      className="
        inline-flex items-center justify-center
        px-5 py-2.5 rounded-full
        bg-red-500 text-white font-medium
        hover:bg-red-600 active:bg-red-700
        transition-colors duration-150
        shadow-sm hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1
      "
    >
      Logout
    </button>
  );
}

export default LogoutBtn;