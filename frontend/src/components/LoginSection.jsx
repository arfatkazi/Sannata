import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

export default function LoginSection({ onSwitch }) {
	const navigate = useNavigate();

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
			<Button onClick={() => navigate("/")} className="text-sm mb-4 block my-4">
				← Back
			</Button>

			<h2 className="text-5xl mb-2">Login</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}
				className="w-full mb-2 space-y-6"
			>
				<div>
					<label htmlFor="login-id" className="block text-sm/6 font-bold text-gray-900 cursor-pointer mr-2">
						username or email
					</label>
					<Input
						id="login-id"
						name="login-id"
						type="email"
						placeholder="your_username or abc@xyz.com"
						autoComplete="email"
						value={emailOrUsername}
						onChange={(e) => setEmailOrUsername(e.target.value)}
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
					<Input
						id="password"
						name="password"
						type="password"
						required
						placeholder="Password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
