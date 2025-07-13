import { Navigate, Route, Routes } from "react-router-dom";
import LoginSection from "./components/LoginSection";
import SignupFlow from "./components/SignupFlow";
import ErrorScreen from "./screens/ErrorScreen";
import Home from "./screens/Home";
import LandingPage from "./screens/LandingPage";
import { useAuthStore } from "./stores/authStore";

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <LandingPage />} />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <SignupFlow />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginSection />}
      />
      <Route path="/error" element={<ErrorScreen />} />
    </Routes>
  );
}

export default App;
