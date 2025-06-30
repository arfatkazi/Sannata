import { useState } from "react";

function Signup() {
	const [step, setStep] = useState(1);
	const [form, setForm] = useState({
		name: "",
		email: "",
		otp: "",
		password: "",
		confirmPassword: "",
		username: "",
		profilePic: null,
	});
	const [errors, setErrors] = useState({});

	// Mock “database” of taken usernames (omit “@” prefix)
	const existingUsernames = ["john123", "alice_wonder", "bob2020"];

	const handleChange = (field, value) => {
		setForm((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: "" }));
	};

	const handleNext = () => {
		if (step === 1) {
			if (!form.name.trim()) {
				setErrors({ name: "Name is required" });
				return;
			}
		}
		if (step === 2) {
			if (!/\S+@\S+\.\S+/.test(form.email)) {
				setErrors({ email: "Enter a valid email" });
				return;
			}
			console.log("Send email to backend:", form.email);
		}
		if (step === 2.5) {
			if (!/^\d{6}$/.test(form.otp)) {
				setErrors({ otp: "Enter 6-digit OTP" });
				return;
			}
			console.log("Verify OTP with backend:", form.email, form.otp);
		}
		if (step === 3) {
			const pwd = form.password;
			const confirm = form.confirmPassword;
			const pwdErrors = [];
			if (pwd.length < 8) pwdErrors.push("Min 8 chars");
			if (!/[A-Z]/.test(pwd)) pwdErrors.push("1 uppercase");
			if (!/[0-9]/.test(pwd)) pwdErrors.push("1 number");
			if (!/[!@#$%^&*]/.test(pwd)) pwdErrors.push("1 special char");
			if (pwdErrors.length) {
				setErrors({ password: pwdErrors.join(", ") });
				return;
			}
			if (pwd !== confirm) {
				setErrors({ confirmPassword: "Passwords do not match" });
				return;
			}
			console.log("Submit password to backend");
		}
		if (step === 4) {
			const uname = form.username.trim();
			const raw = uname.startsWith("@") ? uname.slice(1) : uname;
			if (raw.length < 4) {
				setErrors({ username: "Min 4 characters" });
				return;
			}
			if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(raw)) {
				setErrors({ username: "Must start with letter; letters, numbers, _ only" });
				return;
			}
			if (existingUsernames.includes(raw.toLowerCase())) {
				setErrors({ username: "This username is already taken" });
				return;
			}
			setErrors({});
		}
		// Advance step (2 → 2.5, else +1)
		setStep((prev) => (prev === 2 ? 2.5 : prev + 1));
	};

	const renderProgress = () => (
		<div className="flex justify-center gap-2 my-3">
			{[1, 2, 3, 4, 5].map((n) => (
				<div key={n} className={`h-2 w-8 rounded ${n === step ? "bg-blue-500" : "bg-gray-300"}`}></div>
			))}
		</div>
	);

	return (
		<main className="flex flex-col items-center justify-center h-[100vh] px-4">
			<div className="w-full max-w-md text-center">
				{step === 4 && <p className="text-sm text-gray-600 mb-2">You are unique</p>}
				{renderProgress()}

				{step === 1 && (
					<>
						<h2 className="text-xl font-semibold mb-2">What's your name?</h2>
						<input
							type="text"
							value={form.name}
							onChange={(e) => handleChange("name", e.target.value)}
							className="w-full border px-3 py-2 rounded mb-1"
							placeholder="Your full name"
						/>
						{errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
						<button onClick={handleNext} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Next
						</button>
					</>
				)}

				{step === 2 && (
					<>
						<h2 className="text-xl font-semibold mb-2">What's your email?</h2>
						<input
							type="email"
							value={form.email}
							onChange={(e) => handleChange("email", e.target.value)}
							className="w-full border px-3 py-2 rounded mb-1"
							placeholder="example@mail.com"
						/>
						{errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
						<button onClick={handleNext} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Next
						</button>
					</>
				)}

				{step === 2.5 && (
					<>
						<h2 className="text-xl font-semibold mb-1">Verify your email</h2>
						<p className="text-sm text-gray-500 mb-3">We sent a code to {form.email}</p>
						<div className="flex gap-2 justify-center">
							{[...Array(6)].map((_, i) => (
								<input
									key={i}
									type="text"
									inputMode="numeric"
									maxLength="1"
									className="w-10 h-10 text-center border rounded"
									value={form.otp[i] || ""}
									onChange={(e) => {
										const val = e.target.value.replace(/\D/g, "");
										const arr = form.otp.padEnd(6, " ").split("");
										arr[i] = val;
										handleChange("otp", arr.join("").trim());
									}}
								/>
							))}
						</div>
						{errors.otp && <p className="text-sm text-red-500 mt-1">{errors.otp}</p>}
						<button onClick={handleNext} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Next
						</button>
					</>
				)}

				{step === 3 && (
					<>
						<h2 className="text-xl font-semibold mb-2">Set your password</h2>
						<label className="block text-sm mb-1">Enter password</label>
						<input
							type="password"
							value={form.password}
							onChange={(e) => handleChange("password", e.target.value)}
							className="w-full border px-3 py-2 rounded mb-1"
						/>
						{errors.password && <p className="text-sm text-red-500 mb-2">{errors.password}</p>}
						<label className="block text-sm mb-1">Confirm password</label>
						<input
							type="password"
							value={form.confirmPassword}
							onChange={(e) => handleChange("confirmPassword", e.target.value)}
							className="w-full border px-3 py-2 rounded"
						/>
						{errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
						<div className="text-xs text-gray-500 mt-3 text-left">
							<p>
								<b>Guide:</b>
							</p>
							<ul className="list-disc list-inside">
								<li>Min 8 characters</li>
								<li>At least 1 uppercase</li>
								<li>At least 1 special character (!@#$%^&*)</li>
								<li>At least 1 number</li>
							</ul>
						</div>
						<button onClick={handleNext} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Next
						</button>
					</>
				)}

				{step === 4 && (
					<>
						<p className="text-sm text-gray-600 mb-2">You are unique</p>
						{renderProgress()}
						<h2 className="text-xl font-semibold mb-2">Choose your unique username</h2>
						<div className="flex items-center border rounded mb-1">
							<span className="px-3 text-gray-500 select-none">@</span>
							<input
								type="text"
								value={form.username}
								onChange={(e) => handleChange("username", e.target.value)}
								className="flex-grow px-3 py-2 outline-none"
								placeholder="username"
							/>
						</div>
						{errors.username && <p className="text-sm text-red-500 mb-2">{errors.username}</p>}
						<div className="text-xs text-gray-500 text-left mb-3">
							<p>Guide:</p>
							<ul className="list-disc list-inside">
								<li>At least 4 letters long</li>
								<li>Cannot start with number or special character</li>
								<li>Must be unique</li>
							</ul>
						</div>
						<button onClick={handleNext} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Next
						</button>
					</>
				)}

				{step === 5 && (
					<>
						<p className="text-sm text-gray-600 mb-2">Show to the world</p>
						{renderProgress()}
						<h2 className="text-xl font-semibold mb-4">Add your profile pic</h2>
						<div className="relative w-24 h-24 mx-auto mb-3">
							<img
								src={form.profilePic ? URL.createObjectURL(form.profilePic) : "/placeholder.png"}
								alt="Avatar"
								className="w-full h-full rounded-full object-cover border"
							/>
							<button
								className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full"
								onClick={() => document.getElementById("pic-upload").click()}
							>
								+
							</button>
							<input
								id="pic-upload"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={(e) => handleChange("profilePic", e.target.files[0])}
							/>
						</div>
						<button
							onClick={() => {
								console.log("Send profilePic to backend:", form.profilePic);
								setStep(6); // Move to welcome
							}}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
						>
							Add
						</button>
						<button onClick={() => setStep(6)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
							Later
						</button>
					</>
				)}

				{step === 6 && (
					<>
						<h1 className="text-2xl font-bold mb-4">Welcome!</h1>
						<img src="/welcome-illustration.png" alt="Welcome" className="mx-auto mb-4" />
						<p className="text-sm text-gray-600 mb-4">By continuing, you agree to our Privacy Policy.</p>
						<button
							onClick={() => console.log("User agreed to privacy policy")}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>
							I Agree
						</button>
					</>
				)}
			</div>
		</main>
	);
}

export default Signup;
