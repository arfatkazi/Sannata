import { useState } from "react";

import Button from "../Button";

export default function StepUsername({ next, update }) {
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");

	const handleNext = () => {
		if (!username.trim()) return setError("Username is required");
		if (!/^[a-zA-Z0-9_]{3,15}$/.test(username)) return setError("3–15 chars, letters/numbers/underscores only");
		update({ username });
		next();
	};

	return (
		<div>
			<p className="text-sm text-muted mb-2">You are unique</p>
			<h2 className="text-xl font-semibold mb-4">Choose your unique username</h2>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleNext();
				}}
			>
				<div className="flex items-center border rounded p-2 mb-2">
					<span className="text-muted">@</span>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="ml-1 w-full outline-none"
						placeholder="yourname"
					/>
				</div>

				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

				<Button type="submit" onClick={handleNext} className="text-white px-4 py-2 rounded w-full">
					Next
				</Button>
			</form>
		</div>
	);
}
