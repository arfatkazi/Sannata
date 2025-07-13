import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import Button from "../Button";
import Input from "../Input";

export default function StepNameUsername({ next, update }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const [showAvailability, setShowAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (!username) {
      setError("Enter Username");
      setShowAvailability(false);
      return;
    }

    const delay = setTimeout(async () => {
      setIsChecking(true);
      try {
        const res = await apiClient.get(
          `/auth/check-username?username=${username}`
        );
        setIsAvailable(res.data.available);
        setShowAvailability(true);
        setError("");
      } catch {
        setIsAvailable(false);
        setShowAvailability(false);
        setError("Failed to check username");
      } finally {
        setIsChecking(false);
      }
    }, 1500);

    return () => clearTimeout(delay);
  }, [username]);

  const handleNext = async () => {
    if (!name.trim()) return setError("Name is required");
    if (!username.trim()) return setError("Username is required");
    if (!/^[a-zA-Z0-9_]{3,15}$/.test(username))
      return setError("3–15 chars, letters/numbers/underscores only");

    if (isAvailable === false) return setError("Username already taken");

    try {
      const res = await apiClient.get(
        `/auth/check-username?username=${username}`
      );
      if (!res.data.available) return setError("Username already taken");
      update({ name, username });
      next();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to register");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}
    >
      <div className="mb-4">
        <p className="text-sm text-muted mb-2">Tell us who you are</p>
        <h2 className="text-xl font-semibold mb-2">What's your name?</h2>
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted mb-2">You are unique</p>
        <h2 className="text-xl font-semibold mb-2">Choose your username</h2>
        <div className="flex items-center border rounded p-2">
          <span className="text-muted">@</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="ml-1 w-full outline-none"
            placeholder="yourname"
          />
        </div>
      </div>

      <div className="my-8">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {isChecking === true && (
          <p className="text-sm text-muted">Checking Availability ...</p>
        )}

        {showAvailability ? (
          isAvailable ? (
            <p className="text-green-500 text-sm">Username available</p>
          ) : (
            <p className="text-red-500 text-sm">Already taken</p>
          )
        ) : null}
      </div>

      <Button type="submit" className="w-full">
        Next
      </Button>
    </form>
  );
}
