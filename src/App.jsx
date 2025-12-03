import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/auth";
import { login, logout } from "./store/authSlice";
import components from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) dispatch(login(user));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading)
    return (
      <>
        <div>Loading</div>
      </>
    );

  return (
    <>
      <components.Header />
      <main>
        <Outlet />
      </main>
      <components.Footer />
    </>
  );
}

export default App;