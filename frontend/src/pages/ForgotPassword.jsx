import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("Reset link sent (Demo) ✅");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >

        <h2 className="text-2xl mb-4">Forgot Password</h2>

        <input
          type="email"
          required
          placeholder="Enter email"
          className="w-full border p-2 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="bg-purple-600 text-white w-full py-2 rounded">
          Send Link
        </button>

      </form>
    </div>
  );
}

