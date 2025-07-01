import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./screens/LandingPage";
import Home from "./screens/LandingPage";
import { useAuthStore } from "./stores/authStore";
import SignupFlow from "./components/SignupFlow";
import LoginSection from "./components/LoginSection";

function App() {
	const user = useAuthStore((state) => state.user);

	return (
		<Routes>
			<Route path="/" element={user ? <Home /> : <LandingPage />} />
			<Route path="/signup" element={user ? <Navigate to="/" /> : <SignupFlow />} />
			<Route path="/login" element={user ? <Navigate to="/" /> : <LoginSection />} />
		</Routes>
	);
}

export default App;
