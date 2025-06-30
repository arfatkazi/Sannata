import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
	const [step, setStep] = useState("login");
	const [usernameOrEmail, setUsernameOrEmail] = useState("");
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({ password: "", confirm: "" });
	const [success, setSuccess] = useState(true);

	const handleOtpChange = (index, value) => {
		if (/^\d?$/.test(value)) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);
		}
	};

	const validatePasswords = () => {
		let err = { password: "", confirm: "" };
		if (password.length < 8) err.password = "Too short";
		if (!/[A-Z]/.test(password)) err.password = "Must contain uppercase";
		if (!/[a-z]/.test(password)) err.password = "Must contain lowercase";
		if (password !== confirmPassword) err.confirm = "Passwords don't match";
		setErrors(err);
		return !err.password && !err.confirm;
	};

	const handlePasswordSubmit = () => {
		if (validatePasswords()) {
			// Assume password set succeeds
			setSuccess(true);
			setStep("result");
		} else {
			// Show errors
		}
	};

	return (
		<main className="flex flex-col items-center justify-center h-[90vh] p-4">
			<div className="w-full max-w-sm space-y-4">
				{step === "login" && (
					<>
						<h1 className="text-2xl font-bold text-center">Login</h1>
						<div>
							<label className="block mb-1 text-sm">Username or Email</label>
							<input type="text" className="w-full border px-3 py-2 rounded" />
						</div>
						<div>
							<label className="block mb-1 text-sm">Password</label>
							<input type="password" className="w-full border px-3 py-2 rounded" />
						</div>
						<button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
						<div className="text-sm text-center">
							<button className="text-blue-600 hover:underline" onClick={() => setStep("forgot")}>
								Forgot Password?
							</button>
						</div>
						<div className="text-center text-sm">
							New here?{" "}
							<Link to="/signup" className="text-blue-600 hover:underline">
								Create new account
							</Link>
						</div>
					</>
				)}

				{step === "forgot" && (
					<>
						<button className="text-sm text-gray-500 mb-2" onClick={() => setStep("login")}>
							&larr; Back
						</button>
						<h2 className="text-xl font-semibold mb-2">Forgot Password</h2>
						<label className="block text-sm mb-1">Username or Email</label>
						<input
							type="text"
							className="w-full border px-3 py-2 rounded mb-2"
							value={usernameOrEmail}
							onChange={(e) => setUsernameOrEmail(e.target.value)}
						/>
						<button
							className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
							onClick={() => setStep("otp")}
						>
							Get Recovery Code
						</button>
					</>
				)}

				{step === "otp" && (
					<>
						<button className="text-sm text-gray-500 mb-2" onClick={() => setStep("forgot")}>
							&larr; Back
						</button>
						<h2 className="text-xl font-semibold mb-1">Enter Recovery Code</h2>
						<p className="text-sm text-gray-500 mb-3">Check your email for the recovery code</p>
						<div className="flex gap-2 justify-center">
							{otp.map((digit, i) => (
								<input
									key={i}
									type="text"
									maxLength="1"
									value={digit}
									onChange={(e) => handleOtpChange(i, e.target.value)}
									className="w-10 h-10 text-center border rounded"
								/>
							))}
						</div>
						<button
							className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
							onClick={() => setStep("newpass")}
						>
							Verify
						</button>
					</>
				)}

				{step === "newpass" && (
					<>
						<button className="text-sm text-gray-500 mb-2" onClick={() => setStep("otp")}>
							&larr; Back
						</button>
						<h2 className="text-xl font-semibold mb-2">Set New Password</h2>

						<label className="block text-sm mb-1">Enter password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full border px-3 py-2 rounded mb-1"
						/>
						{errors.password && <p className="text-xs text-red-500 mb-2">{errors.password}</p>}

						<label className="block text-sm mb-1">Confirm password</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full border px-3 py-2 rounded mb-1"
						/>
						{errors.confirm && <p className="text-xs text-red-500 mb-2">{errors.confirm}</p>}

						<div className="text-xs text-gray-500 mb-2">
							<ul className="list-disc list-inside">
								<li>Min 8 letters</li>
								<li>1 uppercase</li>
								<li>1 lowercase</li>
							</ul>
						</div>

						<button
							className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
							onClick={handlePasswordSubmit}
						>
							Confirm New Password
						</button>
					</>
				)}

				{step === "result" && (
					<div className="text-center space-y-3">
						{success ? (
							<>
								<div className="text-green-600 text-4xl">✓</div>
								<p className="text-sm">Password set successfully</p>
								<button
									className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
									onClick={() => setStep("login")}
								>
									Go back to login
								</button>
							</>
						) : (
							<>
								<div className="text-red-600 text-4xl">✕</div>
								<p className="text-sm">Couldn't set new password</p>
								<p className="text-xs text-gray-500">Try again later</p>
								<button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setStep("login")}>
									Go back to login
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</main>
	);
}

export default Login;
