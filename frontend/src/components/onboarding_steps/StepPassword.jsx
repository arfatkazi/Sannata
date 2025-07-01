import { useState } from "react";

import Button from "../Button";

export default function StepPassword({ next, update }) {
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [error, setError] = useState("");

	const validate = () => {
		if (password.length < 8) return "Min 8 characters";
		if (!/[A-Z]/.test(password)) return "Must have uppercase letter";
		if (!/[!@#$%^&*]/.test(password)) return "Must include special character";
		if (password !== confirm) return "Passwords do not match";
		return "";
	};

	const handleNext = () => {
		const err = validate();
		if (err) return setError(err);
		update({ password }); // no need to store confirm
		next();
	};

	return (
		<div>
			<p className="text-sm text-muted mb-2">Let's safeguard you</p>
			<h2 className="text-xl font-semibold mb-4">Set your password</h2>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleNext();
				}}
			>
				<label className="block text-sm mb-1">Enter password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full border p-2 rounded mb-2"
				/>

				<label className="block text-sm mb-1">Confirm password</label>
				<input
					type="password"
					value={confirm}
					onChange={(e) => setConfirm(e.target.value)}
					className="w-full border p-2 rounded mb-2"
				/>

				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

				<div className="text-xs text-muted mb-3">
					<p>Guide:</p>
					<ul className="list-disc pl-4">
						<li>Minimum 8 characters</li>
						<li>1 uppercase character</li>
						<li>1 special character</li>
					</ul>
				</div>

				<Button type="submit" className=" text-white px-4 py-2 rounded w-full">
					Next
				</Button>
			</form>
		</div>
	);
}
