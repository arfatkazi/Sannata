import { useState } from "react";
import apiClient from "../../api/apiClient";

import Button from "../Button";
import Input from "../Input";

export default function StepEmail({ next, update }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const sendOTP = async () => {
    if (!email.trim()) return setError("Email is required");

    if (!email.includes("@")) return setError("Invalid email");

    try {
      const res = await apiClient.post("/auth/send-otp", { email });
      console.log(res.data.message);
      update({ email });
      next();
    } catch (err) {
      console.error(err);
      setError("Failed to send otp. try again.", "Error message: ", err);
    }
  };

  return (
    <div>
      <p className="text-sm text-muted mb-2">Let's get you in</p>
      <h2 className="text-xl font-semibold mb-4">What's your email?</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendOTP();
        }}
      >
        <Input
          type="email"
          required
          form="novalidatedform"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <Button type="submit" className="text-white px-4 py-2 rounded w-full">
          Next
        </Button>
      </form>
    </div>
  );
}
