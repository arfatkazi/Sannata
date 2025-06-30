import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import LandingPage from "./screens/LandingPage";
import { useAuthStore } from "./stores/authStore";
import Home from "./screens/LandingPage";

function App() {
	const user = useAuthStore((state) => state.user);

	return user ? <Home /> : <LandingPage />;
}

export default App;
