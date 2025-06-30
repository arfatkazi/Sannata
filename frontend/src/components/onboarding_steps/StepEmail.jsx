import { useState } from "react";

import Button from "../Button";

export default function StepEmail({ next, update }) {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const handleNext = () => {
		if (!email.trim()) return setError("Email is required");
		if (!email.includes("@")) return setError("Invalid email");
		update({ email });
		next(); // goes to step 2.5: verification
	};

	return (
		<div>
			<p className="text-sm text-muted mb-2">Let's get you in</p>
			<h2 className="text-xl font-semibold mb-4">What's your email?</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleNext();
				}}
			>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full border p-2 rounded mb-1"
				/>
				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

				<Button type="submit" onClick={handleNext} className="bg-[--color-brand] text-white px-4 py-2 rounded w-full">
					Next
				</Button>
			</form>
		</div>
	);
}
