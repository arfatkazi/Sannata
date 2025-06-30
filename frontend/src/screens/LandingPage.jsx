import { useState } from "react";
import Button from "../components/Button";
import LoginSection from "../components/LoginSection";
import SignupFlow from "../components/SignupFlow";

function Home() {
	const [showSignup, setShowSignup] = useState(false);
	return (
		<div className="p-4">
			<header className="flex justify-between">
				<div className="">Sannata</div>
				<nav className="flex gap-2">
					<Button>Log In</Button>
					<Button>Sign Up</Button>
				</nav>
			</header>

			<main className="mt-8">
				<h1 className="text-2xl font-semibold mb-4">Welcome to Sannata</h1>

				{!showSignup ? <LoginSection onSwitch={() => setShowSignup(true)} /> : <SignupFlow />}
			</main>
		</div>
	);
}

export default Home;
