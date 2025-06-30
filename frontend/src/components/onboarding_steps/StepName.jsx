import { useState } from "react";
import Button from "../Button";

export default function StepName({ next, update }) {
	const [name, setName] = useState("");
	const [error, setError] = useState("");

	const handleNext = () => {
		if (!name.trim()) return setError("Name is required");
		update({ name });
		next();
	};

	return (
		<div>
			<p className="text-sm text-muted mb-2">Tell us who you are</p>
			<h2 className="text-xl font-semibold mb-4">What's your name?</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleNext();
				}}
			>
				<input
					type="text"
					placeholder="Enter your name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full border p-2 rounded mb-1"
				/>
				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

				<Button type="submit" onClick={handleNext} className=" text-white px-4 py-2 rounded w-full">
					Next
				</Button>
			</form>
		</div>
	);
}
