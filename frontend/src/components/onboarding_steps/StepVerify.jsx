import { useState, useRef } from "react";

export default function StepVerify({ next }) {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const [error, setError] = useState("");
	const inputs = useRef([]);

	const handleChange = (index, value) => {
		if (!/^[0-9]?$/.test(value)) return;
		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		if (value && index < 5) {
			inputs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (e, i) => {
		if (e.key === "Backspace" && !code[i] && i > 0) {
			inputs.current[i - 1]?.focus();
		}
		if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
		if (e.key === "ArrowRight" && i < 5) inputs.current[i + 1]?.focus();
	};

	const handleSubmit = () => {
		if (code.some((c) => !c)) {
			setError("Please enter the full 6-digit code");
			return;
		}
		// Normally send to backend here
		next();
	};

	return (
		<div>
			<p className="text-sm text-muted mb-2">Let's get you in</p>
			<h2 className="text-xl font-semibold">Verify your email</h2>
			<p className="text-sm text-muted mb-4">We’ve sent a 6-digit code to your email</p>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<div className="flex justify-between gap-2 mb-2">
					{code.map((value, i) => (
						<input
							key={i}
							ref={(el) => (inputs.current[i] = el)}
							type="text"
							inputMode="numeric"
							maxLength={1}
							className="w-10 h-10 border text-center text-lg rounded"
							value={value}
							onChange={(e) => handleChange(i, e.target.value)}
							onKeyDown={(e) => handleKeyDown(e, i)}
						/>
					))}
				</div>

				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

				<button className="bg-[--color-brand] text-white px-4 py-2 rounded w-full">Next</button>
			</form>
		</div>
	);
}
