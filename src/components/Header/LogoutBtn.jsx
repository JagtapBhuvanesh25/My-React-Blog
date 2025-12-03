import { useDispatch } from "react-redux"
import authService from "../../Appwrite/auth"
import { logout } from "../../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()
        .then((res) => {
            if (res !== false) {
                dispatch(logout());
            }
        })
        .catch(() => {
            // do nothing on failure
        });
    };

    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn
