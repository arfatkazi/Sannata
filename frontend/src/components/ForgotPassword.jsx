import React from "react";

function ForgotPassword() {
	return (
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
			<button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={() => setStep("otp")}>
				Get Recovery Code
			</button>
		</>
	);
}

export default ForgotPassword;
