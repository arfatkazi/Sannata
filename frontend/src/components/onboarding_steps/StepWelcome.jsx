import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useAuthStore } from "../../stores/authStore";

export default function StepWelcome({ formData }) {
  const [message, setMessage] = useState("error : ");
  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        const res = await apiClient.post("/auth/finish-signup", {
          email: formData?.email,
          name: formData?.name,
          username: formData?.username,
          password: formData?.password,
        });

        useAuthStore.getState().login({
          user: res.data.user,
          token: res.data.token,
        });

        setMessage(res.data.message);
      } catch (err) {
        setMessage(JSON.stringify(err.response.data.message));
      }
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="text-center">
      <p>{message}</p>
      <img
        src="/placeholder-welcome.png"
        alt="Welcome"
        className="w-32 h-32 mx-auto mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">Welcome to Sannata</h2>
      <p className="text-muted mb-4">You’re all set to explore.</p>
      <button
        className="bg-[--color-brand] text-white px-4 py-2 rounded"
        onClick={() => (window.location.href = "/home")} // or update route/store later
      >
        Aye aye, captain
      </button>
    </div>
  );
}
