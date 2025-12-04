import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
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
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
        <div className="animate-pulse rounded-md px-6 py-3 bg-gray-800/60">
          Loading...
        </div>
      </div>
    );

  return (
    <>
      <Header />

      <div
        className="min-h-screen bg-gray-600"
        style={{ "--header-h": "5rem", "--footer-h": "4rem" }}
      >
        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );

}

export default App;