import { useState } from "react";

import Button from "../Button";

export default function StepProfilePic({ next, update }) {
	const [file, setFile] = useState(null);

	const handleUpload = (e) => {
		const img = e.target.files[0];
		if (img) {
			setFile(URL.createObjectURL(img));
			update({ profileImage: img }); // or just img.name for now
		}
	};

	const handleSubmit = () => {
		// 🧠 Placeholder: Send data to backend here
		console.log("Submitting full data to backend...");
		next(); // go to welcome screen
	};

	return (
		<div>
			<p className="text-sm text-muted mb-2">Show to the world</p>
			<h2 className="text-xl font-semibold mb-4">Add your profile picture</h2>

			<div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
				{file ? (
					<img src={file} alt="preview" className="w-full h-full object-cover" />
				) : (
					<span className="text-3xl">+</span>
				)}
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<input type="file" accept="image/*" onChange={handleUpload} className="mb-4" />

				<Button type="submit" className="bg-[--color-brand] text-white px-4 py-2 rounded w-full mb-2">
					OK, done
				</Button>

				<Button type="button" onClick={handleSubmit} className="text-sm underline w-full text-center text-muted">
					Later
				</Button>
			</form>
		</div>
	);
}
