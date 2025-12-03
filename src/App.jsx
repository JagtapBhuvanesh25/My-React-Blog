import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Authservice from './Appwrite/auth'
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		Authservice.getCurrentUser()
		.then(user => {
			if(user) dispatch(login(user));
			else dispatch(logout());
		})
		.finally(() => setLoading(false));
	}, [dispatch]);

	if (loading) return (
		<>
			<div>Loading</div>
		</>
	);

	return (
		<>
		<Header />
			<main>
				TODO <Outlet />
			</main>
		<Footer />
		</>
	);
	}

export default App;
