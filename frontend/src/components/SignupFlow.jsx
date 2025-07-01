import { useState } from "react";

import StepName from "./onboarding_steps/StepName";
import StepEmail from "./onboarding_steps/StepEmail";
import StepVerify from "./onboarding_steps/StepVerify";
import StepPassword from "./onboarding_steps/StepPassword";
import StepUsername from "./onboarding_steps/StepUsername";
import StepProfilePic from "./onboarding_steps/StepProfilePic";
import StepWelcome from "./onboarding_steps/StepWelcome";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

export default function SignupFlow() {
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({}); // will collect all data

	const goNext = () => setStep((prev) => prev + 1);
	const goBack = () => {
		if (step <= 1) {
			navigate("/");
		} else {
			setStep((prev) => prev - 1);
		}
	};

	const updateData = (newData) => setFormData((prev) => ({ ...prev, ...newData }));

	console.log(formData);
	console.log(step);

	return (
		<div className="max-w-md mx-auto p-4">
			<h1>Signup</h1>

			{step !== 6 && (
				<Button onClick={goBack} className="text-sm mb-4 block my-4">
					← Back
				</Button>
			)}

			<ProgressBar step={step} total={5} />
			{step === 1 && <StepName next={goNext} update={updateData} />}
			{step === 2 && <StepEmail next={goNext} update={updateData} />}
			{step === 2.5 && <StepVerify next={goNext} />}
			{step === 3 && <StepPassword next={goNext} update={updateData} />}
			{step === 4 && <StepUsername next={goNext} update={updateData} />}
			{step === 5 && <StepProfilePic next={goNext} update={updateData} />}
			{step === 6 && <StepWelcome />}
		</div>
	);
}
