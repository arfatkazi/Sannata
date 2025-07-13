import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../components/ProgressBar";
import StepEmail from "../components/onboarding_steps/StepEmail";
import StepNameUsername from "../components/onboarding_steps/StepNameUsername";
import StepPassword from "../components/onboarding_steps/StepPassword";
import StepVerify from "../components/onboarding_steps/StepVerify";
import StepWelcome from "../components/onboarding_steps/StepWelcome";

import Button from "../components/Button";

export default function SignupFlow() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const goNext = () => setStep((prev) => prev + 1);
  const goBack = () => {
    if (step <= 1) {
      navigate("/");
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const updateData = (newData) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl text-center mb-4">Create New Account</h1>

      <Button onClick={() => navigate("/")}>Go to "/"</Button>

      {step < 7 && (
        <Button onClick={goBack} className="text-sm mb-4 block my-4">
          ← Back
        </Button>
      )}

      {step >= 1 && (
        <Button onClick={goNext} className="text-sm mb-4 block my-4">
          Next →
        </Button>
      )}

      <ProgressBar step={step} total={5} />
      {step === 1 && <StepEmail next={goNext} update={updateData} />}
      {step === 2 && <StepVerify next={goNext} formData={formData} />}
      {step === 3 && <StepNameUsername next={goNext} update={updateData} />}
      {step === 4 && <StepPassword next={goNext} update={updateData} />}
      {step === 5 && <StepWelcome formData={formData} />}

      <div>{JSON.stringify(formData)}</div>
    </div>
  );
}
