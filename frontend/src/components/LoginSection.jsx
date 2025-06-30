import { useState } from "react";
import Button from "./Button";

export default function LoginSection({ onSwitch }) {
	const [emailOrUsername, setEmailOrUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = () => {
		if (!emailOrUsername || !password) {
			setError("Please enter all fields");
			return;
		}

		setError("");
	};

	console.log(emailOrUsername);

	return (
		<div>
			<h2 className="text-xl mb-2">Login</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}
				className="mb-2 space-y-6"
			>
				<div>
					<label htmlFor="login-id" className="block text-sm/6 font-medium text-gray-900 cursor-pointer mr-2">
						Username / Email
					</label>
					<input
						id="login-id"
						name="login-id"
						type="email"
						placeholder="Username or Email"
						autoComplete="email"
						value={emailOrUsername}
						onChange={(e) => setEmailOrUsername(e.target.value)}
						className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
					/>
				</div>

				<div>
					<div className="flex items-center gap-2">
						<label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 cursor-pointer mr-2">
							Password
						</label>
						<div className="text-sm">
							<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
								Forgot password?
							</a>
						</div>
					</div>
					<input
						id="password"
						name="password"
						type="password"
						required
						placeholder="Password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
					/>
				</div>

				{error && <p className="text-red-500">{error}</p>}
				<Button type="submit">Log In</Button>
			</form>
			<div className="mt-2">
				<Button>Forgot Password?</Button>
			</div>

			<br />

			<span>OR</span>

			<div className="mt-4 flex flex-col gap-2">
				<Button>Continue with Google</Button>
				<Button>Continue with Meta</Button>
				<Button>Continue with Discord</Button>
			</div>
			<div className="mt-4 hidden text-xs">
				By continuing, you agree to our <a href="#">Terms of Service</a> and acknowledge our{" "}
				<a href="#">Privacy Policy</a> and
				<a href="#">Notice at Collection</a>.
			</div>
			<div className="mt-4 flex flex-col justify-center gap-2">
				Not yet on Sannata? <Button onClick={onSwitch}>Create new account</Button>
			</div>
		</div>
	);
}
