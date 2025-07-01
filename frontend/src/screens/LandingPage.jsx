import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import LoginSection from "../components/LoginSection";
import SignupFlow from "../components/SignupFlow";
import Logo from "../components/Logo";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="p-4 font-urbanist bg-[#ffffff]">
			<header className="flex justify-between items-center">
				<div className="flex gap-2 py-2 items-center w-fit rounded-full">
					<Logo />
					<span>Sannata</span>
				</div>
				<nav className="flex gap-2">
					<Button className="bg-black text-white px-4 py-2 rounded-full">Log In</Button>
					<Button className="bg-black text-white px-4 py-2 rounded-full">Sign Up</Button>
				</nav>
			</header>

			<main className="mt-8">
				<h1 className="text-5xl text-center mb-4">Welcome to Sannata</h1>

				<Button>Continue with Google</Button>

				<p className="text-xl mt-6">
					Already on Sannata?{" "}
					<button onClick={() => navigate("/login")} className="underline text-2xl block">
						Log in
					</button>
				</p>

				<p className="text-xl mt-8">
					Not yet on Sannata?{" "}
					<button onClick={() => navigate("/signup")} className="underline text-2xl block">
						Create account
					</button>
				</p>
			</main>
		</div>
	);
}
