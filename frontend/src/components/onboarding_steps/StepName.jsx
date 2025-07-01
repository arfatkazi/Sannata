import { useState } from "react";
import Button from "../Button";
import Input from "../Input";

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
				<Input
					type="text"
					placeholder="Enter your name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					
				/>
				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

				<Button type="submit">
					Next
				</Button>
			</form>
		</div>
	);
}
